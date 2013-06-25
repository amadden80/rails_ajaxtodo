$(function(){
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
      $('<td>').text(data.name).appendTo(task);
      $('<td>').text(data.desc).appendTo(task);
      $('<td>').text(data.duedate).appendTo(task);
      $('#tasks').append(task);

      //Clear form inputs
      $('#new_task input[type=text]').val('');
    });
  });
});