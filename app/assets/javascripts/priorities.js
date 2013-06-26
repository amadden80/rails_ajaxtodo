$(function() {
  //Initializes the minicolors color picke on page load
  $('#priority_color').minicolors();

  $('#submit').on('click', function(e) {
    //prevents the default behavior of the form, i.e. submitting the form
    //Notice that if this file fails to load or your syntax errors, you will not prevent the default and
    // clicking submit will render a new page with your data on it
    e.preventDefault();

    var settings = {
      priority: {
        name: $('#priority_name').val(),
        urgency_index: $('#priority_urgency_index').val(),
        color: $('#priority_color').val()
      }
    };

    //After putting together the parameters we want to use, we post to /priorities (routes to priorities#create)
    //with those parameters. The priorities#create method will come back with some rendered JSON that will
    //become available as the data local variable
    $.post('/priorities', settings, function(data) {
      //Set up a row with 4 divs in it to hold the Priority's attribute values and its color
      var priority = $('<tr>');
      $('<td>').text(data.name).appendTo(priority);
      $('<td>').text(data.urgency_index).appendTo(priority);
      $('<td>').text(data.color).appendTo(priority);
      $('<td>').css('background-color', data.color).appendTo(priority);
      $('#priorities').append(priority);

      //Clear out the inputs of the form
      $('#new_priority input[type=text], #new_priority input[type=number]').val('');
    });
  });

});














