//START VARIABLE DEFINITIONS
var sort_column;
//END VARIABLE DEFINITIONS

//START FUNCTION DEFINITIONS
function add_node(task) {
  task_name = task.children('.name').text();
  task_urgency = task.children('.urgency-index').text();
  var row_list = $('#tasks tbody').children();

  for(var i=0; i< row_list.size(); i++){
    node = $(row_list[i]);
    node_name = node.children('.name').text();
    node_urgency = node.children('.urgency-index').text();

    if (task_urgency > node_urgency) {
      task.insertBefore(node);
      return;
    } else if ((task_urgency == node_urgency) && task_name < node_name){
      task.insertBefore(node);
      return;
    }
  }
  $('#tasks tbody').append(task);
}

//A field-agnostic single-column sorter
function sort_by_column(a, b){
  col_a = $(a).children('.'+sort_column).text();
  col_b = $(b).children('.'+sort_column).text();

  // col_a == col_b ? 0 : (col_a > col_b ? 1 : -1)
  if(col_a > col_b){
    return 1;
  } else if (col_a < col_b){
    return -1;
  } else {
    return 0;
  }
}
//END FUNCTION DEFINITIONS

//START DOM-READY CODE AND EVENT HANDLERS
$(function(){

  //When any of the th links is clicked, sorts by the relevant field. I have refactored this to only be a single event handler
  //by grabbing the field title out of the link's id. A little dangerous because if I change my HTML much it breaks my JS
  $('th a').on('click', function(e){
    e.preventDefault();
    //grabs everything but the '_sort' from the link's id and sets the sort_column variable to that prefix for use in sort_by_column
    var sort_id = $(this).attr('id');
    var id_prefix = sort_id.substr(0, sort_id.length - 5);
    sort_column = id_prefix;

    sorted = $('#tasks tbody tr').sort(sort_by_column);
    $('#tasks tbody').empty().append(sorted);
  });

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
      var task = $('<tr>').css('background-color', data.priority.color);
      $('<td>').addClass('name').text(data.task.name).appendTo(task);
      $('<td>').addClass('desc').text(data.task.desc).appendTo(task);
      $('<td>').addClass('duedate').text(data.task.duedate).appendTo(task);
      $('<td>').addClass('urgency-index').text(data.priority.urgency_index).hide().appendTo(task);
      // $('#tasks tbody').append(task);
      add_node(task);

      //Clear form inputs
      $('#new_task input[type=text]').val('');
    });
  });
});