var sort_column;

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
  col_a = $(a).children('.' + sort_column).text();
  col_b = $(b).children('.' + sort_column).text();

  // col_a == col_b ? 0 : (col_a > col_b ? 1 : -1)
  if (col_a > col_b) {
    return 1;
  } else if (col_a < col_b) {
    return -1;
  } else {
    return 0;
  }
}

function bind_column_sort_action_to(link_element) {
  link_element.on('click', function(e){
     e.preventDefault();
    //grabs everything but the '_sort' from the link's id and sets the sort_column variable to that prefix for use in sort_by_column
    var sort_id = $(this).attr('id');
    var id_prefix = sort_id.substr(0, sort_id.length - 5);
    sort_column = id_prefix;

    sorted = $('#tasks tbody tr').sort(sort_by_column);
    $('#tasks tbody').empty().append(sorted);
  });
}

function bind_edit_button_to(edit_button) {
  edit_button.on('click', function(e) {
    e.preventDefault();
    var task_id = $(this).attr('data-id');
    var task_row = $(this).parent().parent();
    var name = $.trim(task_row.find('.name').text());
  });
}

//Activates the event handler binding to the delete buttons in the table.
function bind_delete_button_action_to(link_element) {
  //takes a jQuery element name 'link_element' and then applies an .on() etc. on it
  // console.log('Works!')
  link_element.on('click', function(e){
    e.preventDefault();
    console.log('Default Prevented');

    var id_of_task = $(this).data('id');
    console.log(id_of_task);

    var task_row = $(this).parent().parent();

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
    return link_element;
  });
}

function bind_task_create_to(submit_element){
  submit_element.on('click', function(e) {
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
      var task = $('<tr>').css('background-color', data.priority.color);
      $('<td>').addClass('name').text(data.task.name).appendTo(task);
      $('<td>').addClass('desc').text(data.task.desc).appendTo(task);
      $('<td>').addClass('duedate').text(data.task.duedate).appendTo(task);
      $('<td>').addClass('urgency-index').text(data.priority.urgency_index).hide().appendTo(task);


      //make a new td for the delete and view options
      var options = $('<td>').addClass('options');
      // var view_button = $('<a>').text('View').attr('href', '#').addClass('button view-button small').data('id', data.task.id).appendTo(options);
      var delete_button = $('<a>').text('Delete').attr('data-id', data.task.id).attr('href', '#').addClass('button delete-button small alert').appendTo(options);
      var edit_button = $('<a>').text('Edit').attr('data-id', data.task.id).attr('href', '#').addClass('button edit-button small').appendTo(options);
      options.appendTo(task);

      // $('#tasks tbody').append(task);
      add_node(task);
      bind_delete_button_action_to($('.delete-button'));

      //Clear form inputs
      $('#new_task input[type=text]').val('');
    });
  });
}

//Notice that we have refactored our code so that our event handlers are extremely concise. They now call descriptively-named functions defined
//prior to document load, and can be read more easily.
$(function(){

  //When any of the th links is clicked, sorts by the relevant field. I have refactored this to only be a single event handler
  //by grabbing the field title out of the link's id. A little dangerous because if I change my HTML much it breaks my JS
  var table_headers = $('th a');
  bind_column_sort_action_to(table_headers);

  //When the user clicks on the form's submit button, creates a new task and displays it in the table of tasks, sorted by priority.urgency_index
  var task_form_submit = $('#submit');
  bind_task_create_to(task_form_submit);

  //Call our bind function and bind onclick action to edit buttons
  var edit_button_elements = $('.edit-button');
  bind_edit_button_to(edit_button_elements);

  //Call our bind function and bind onclick action to delete buttons
  var delete_button_elements = $('.delete-button');
  bind_delete_button_action_to(delete_button_elements);
});