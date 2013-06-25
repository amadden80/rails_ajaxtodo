$(function(){

  function add_node(task) {
    var row_list = $('#tasks tbody').children();
    for(var i=0; i< row_list.size(); i++){
      node = $(row_list[i]);
      node_desc = node.children('.desc').text();
      task_desc = task.children('.desc').text();
      if (task_desc < node_desc) {
        task.insertBefore(node);
        return;
      }
    }
    $('#tasks tbody').append(task);
  }

  $('th a').on('click', function(e){
    e.preventDefault();
    sorted = $('#tasks tbody tr').sort(sort_by_name);
    $('#tasks tbody').empty().append(sorted);
  });

  function sort_by_name(a, b){
    name_a = $(a).children('.name').text();
    name_b = $(b).children('.name').text();
    if(name_a > name_b){
      return 1;
    } else if (name_a < name_b){
      return -1;
    } else {
      return 0;
    }
  }

  $('#submit').on('click', function(e){
    //prevents the default behavior of the form, i.e. submitting the form
    //Notice that if this file fails to load or your syntax errors, you will not prevent the default and
    // clicking submit will render a new page with your data on it
    e.preventDefault();

    var settings =
      {
        task: {
          name: $('#task_name').val(),
          desc: $('#task_desc').val(),
          duedate: $('#task_duedate').val(),
          priority_id: $('#task_priority_id').val()
        }
      };

    $.post('/tasks', settings, function(data){
      //Construct an additional row to add to the table, representing one task and its attributes
      var task = $('<tr>');
      $('<td>').addClass('name').text(data.name).appendTo(task);
      $('<td>').addClass('desc').text(data.desc).appendTo(task);
      $('<td>').text(data.duedate).appendTo(task);
      // $('#tasks tbody').append(task);
      add_node(task);

      //Clear form inputs
      $('#new_task input[type=text]').val('');
    });
  });
});