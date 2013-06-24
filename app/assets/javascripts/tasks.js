$(function(){
  $('#submit').on('click', function(e){
    //prevents the default behavior of the form, i.e. submitting the form
    e.preventDefault();

        var settings = {
                                task: {
                                  name: $('#task_name').val(),
                                  desc: $('#task_desc').val(),
                                  duedate: $('#task_duedate').val()
                                }
                              }

    $.post('/tasks', settings, function(data){
      var task = $('<li>').text(data)
                $('#list').append(task)
      $('#task_desc').val('')
    });
  });
})