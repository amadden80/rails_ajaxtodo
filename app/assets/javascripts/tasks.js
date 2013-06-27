var sort_column = 'urgency-index';

function add_node(task) {
  task_name = task.children('.name').text();
  task_urgency = task.children('.urgency-index').text();
  var row_list = $('#tasks tbody').children();

  for (var i = 0; i < row_list.size(); i++) {
    node = $(row_list[i]);
    node_name = node.children('.name').text();
    node_urgency = node.children('.urgency-index').text();

    if (task_urgency > node_urgency) {
      task.insertBefore(node);
      return;
    } else if ((task_urgency == node_urgency) && task_name < node_name) {
      task.insertBefore(node);
      return;
    }
  }
  $('#tasks tbody').append(task);
}

//A field-agnostic single-column sorter
function sort_by_column(a, b) {
  col_a = $.trim($(a).children('.' + sort_column).text());
  col_b = $.trim($(b).children('.' + sort_column).text());

  if(sort_column === 'urgency-index'){
    col_a = parseInt(col_a);
    col_b = parseInt(col_b);
  }

  // col_a == col_b ? 0 : (col_a > col_b ? 1 : -1)
  if (col_a < col_b) {
    return sort_column === 'urgency-index' ? 1 : -1;
  } else if (col_a > col_b) {
    return sort_column === 'urgency-index' ? -1 : 1;
  } else {
    return 0;
  }
}

function sort_table(e) {
   e.preventDefault();
  //grabs everything but the '_sort' from the link's id and sets the sort_column variable to that prefix for use in sort_by_column
  var sort_id = $(this).attr('id');
  var id_prefix = sort_id.substr(0, sort_id.length - 5);
  sort_column = id_prefix;

  sorted = $('#tasks tbody tr').sort(sort_by_column);
  $('#tasks tbody').empty().append(sorted);
}

function populate_form(e){
  e.preventDefault();
  var task_row = $(this).parent().parent();
  var task_id = task_row.attr('data-task-id');
  console.log(task_id);

  var name = $.trim(task_row.find('.name').text());
  var desc = $.trim(task_row.find('.desc').text());
  var duedate = $.trim(task_row.find('.duedate').text());
  var priority_id = $.trim(task_row.find('.priority-id').text());

  //Sets each of the form's fields and selects the correct selection for priority field
  $('#task_name').val(name);
  $('#task_desc').val(desc);
  $('#task_duedate').val(duedate);
  $('#task_priority_id option[value=' + priority_id +']').prop('selected', true);

  //Hide the Create Task button and show the Update Task button
  $('#submit').addClass('hidden');
  $('#edit-submit').show('hidden');
  $('#edit-submit').attr('data-task-id', task_id);
}

//Activates the event handler binding to the delete buttons in the table.
function delete_task(e){
  e.preventDefault();
  console.log('Default Prevented');

  var task_row = $(this).parent().parent();
  var id_of_task = task_row.data('task-id');

  $.ajax({
    type: 'DELETE',
    url: id_of_task,
    success: function(data){
      console.log('Ajax transmitted.  Heres the data');
      console.log(data);

      // task_row.fadeOut(500);

      // task_row.fadeOut(500).delay(500).remove();

      // task_row.fadeOut(500, function(){
      //   $(this).remove();
      // });

      //In order to animate color, we need to also add the jQuery UI library. Normal jQuery can animate sizes and positions just fine, but
      // is weirdly missing the color animation feature. Notice that I have included the jQuery UI library in my application layout file
      task_row.animate({
        backgroundColor: 'red'
      }, 300, function(){
        $(this).fadeOut(300);
      });

    }
  });
  return $(this);
}

function create_task(e){
  //prevents the default behavior of the form, i.e. submitting the form
  //Notice that if this file fails to load or your syntax errors, you will not prevent the default and
  // clicking submit will render a new page with your data on it
  e.preventDefault();

  var settings = {
    task: {
      name: $('#task_name').val(),
      desc: $('#task_desc').val(),
      duedate: $('#task_duedate').val(),
      priority_id: $('#task_priority_id').val()
    }
  };

  $.post('/tasks', settings, function(data) {
    //Construct an additional row to add to the table, representing one task and its attributes
    var task = $('<tr>').css('background-color', data.priority.color).attr('task-id', data.task.id);

    //Add the arrow buttons
    var arrows = $('<td>');
    var up_arrow_link = $('<a>').attr('href', '#').appendTo(arrows);
    var up_arrow = $('<i>').addClass('general foundicon-up-arrow').appendTo(up_arrow_link);
    var down_arrow_link = $('<a>').attr('href', '#').appendTo(arrows);
    var down_arrow = $('<i>').addClass('general foundicon-down-arrow').appendTo(down_arrow_link);
    arrows.appendTo(task);

    //Build the attribute data divs
    $('<td>').addClass('name').text(data.task.name).appendTo(task);
    $('<td>').addClass('desc').text(data.task.desc).appendTo(task);
    $('<td>').addClass('duedate').text(data.task.duedate).appendTo(task);
    $('<td>').addClass('urgency-index').text(data.priority.urgency_index).hide().appendTo(task);

    //make a new td for the delete and edit options
    var options = $('<td>').addClass('options');
    var delete_button = $('<a>').text('Delete').attr('href', '#').addClass('button delete-button small alert').appendTo(options);
    var edit_button = $('<a>').text('Edit').attr('href', '#').addClass('button edit-button small').appendTo(options);
    options.appendTo(task);

    // $('#tasks tbody').append(task);
    add_node(task);

    //Clear form inputs
    $('#new_task input[type=text]').val('');
  });
}

function update_task(e){
  e.preventDefault();
  var task_id = $(this).data('task-id');

  var settings = {
    task: {
      name: $('#task_name').val(),
      desc: $('#task_desc').val(),
      duedate: $('#task_duedate').val(),
      priority_id: $('#task_priority_id').val()
    }
  };

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + task_id,
    data: settings
  }).success(function(data){
    //Finds the row that we were editing and updates its fields and priority color
    var task_row = $('#tasks tr[data-task-id=' + task_id + ']');
    task_row.children('.name').text(data.task.name);
    task_row.children('.desc').text(data.task.desc);
    task_row.children('.duedate').text(data.task.duedate);
    task_row.children('.priority-id').text(data.priority.id);
    task_row.children('.urgency-index').text(data.priority.urgency_index);
    task_row.animate({backgroundColor: data.priority.color});

    //sort the table again
    sorted = $('#tasks tbody tr').sort(sort_by_column);
    $('#tasks tbody').empty().append(sorted);

    //Clear form inputs
    $('#new_task input[type=text]').val('');
  });
}

function increase_row_priority(e){
  e.preventDefault();
  var task_row = $(this).parent().parent();
  var task_id = task_row.data('task-id');

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + task_id + '/increase_urgency'
  }).success(function(data){
    var task_row = $('#tasks tr[data-task-id=' + task_id + ']');
    task_row.animate({backgroundColor: data.color});
  });
}

function decrease_row_priority(e){
  e.preventDefault();
  var task_row = $(this).parent().parent();
  var task_id = task_row.data('task-id');

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + task_id + '/decrease_urgency'
  }).success(function(data){
    var task_row = $('#tasks tr[data-task-id=' + task_id + ']');
    task_row.animate({backgroundColor: data.color});
  });
}

//Notice that we have refactored our code so that our event handlers are extremely concise. They now call descriptively-named functions defined
//prior to document load, and can be read more easily.
$(function(){

  //When any of the th links is clicked, sorts by the relevant field. I have refactored this to only be a single event handler
  //by grabbing the field title out of the link's id. A little dangerous because if I change my HTML much it breaks my JS
  $('th a').on('click', sort_table);

  //When the Create button is clicked, a task with the given attributes is created on the server and the page using AJAX
  $('#submit').on('click', create_task);

  //When the Update button is clicked, the task updates on the server and the page using AJAX
  $('#edit-submit').on('click', update_task);

  //Call our bind function and bind onclick action to edit buttons
  $('tbody').on('click', '.edit-button', populate_form);

  //Call our bind function and bind onclick action to delete buttons
  $('tbody').on('click', '.delete-button', delete_task);

  //When the user clicks an up arrow, that row's task is increased
  $('tbody').on('click', '.up-arrow-link', increase_row_priority);

  //When the user clicks a down arrow, that row's task is increased
  $('tbody').on('click', '.down-arrow-link', decrease_row_priority);
});