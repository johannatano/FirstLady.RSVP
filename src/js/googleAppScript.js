function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (e != undefined) {
      var params = e.parameter;
      var firstName = params.first_name;
      var lastName = params.last_name;
      var email = params.email;
      var attendees = params.attendees;
      var timestamp = new Date();
      sheet.appendRow([firstName, lastName, email, attendees, timestamp]);
      var subject = 'First Lady Halloween Bash';
      var message =
        'Hi ' +
        firstName +
        ',\n\nYou are now on the list! We look forward to seeing you.\n\nBest regards,\nFirst Lady Team';
      MailApp.sendEmail(email, subject, message);
    }
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    Logger.log(error);
    var errorResponse = { status: 'error', message: error.message };
    return ContentService.createTextOutput(JSON.stringify(errorResponse)).setMimeType(ContentService.MimeType.JSON);
  }
}

function testAuthorization() {
  MailApp.sendEmail(
    Session.getActiveUser().getEmail(),
    'Authorization Test',
    'This is a test email to trigger authorization.'
  );
}

/*
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Get form data
    var params = e.parameter;
    var name = params.name;
    var email = params.email;
    var timestamp = new Date();

    // Append the data to the sheet
    sheet.appendRow([name, email, timestamp]);

    // Send autoresponse email
    //var subject = 'Thank You for Your RSVP';
    //var message = 'Hi ' + name + ',\n\nThank you for RSVPing to our event! We look forward to seeing you.\n\nBest regards,\nEvent Team';
    //MailApp.sendEmail(email, subject, message);

    // Prepare the success response
    var jsonResponse = JSON.stringify({ 'status': 'success' });
    var output = ContentService.createTextOutput(jsonResponse).setMimeType(ContentService.MimeType.JSON);

    return ContentService.createTextOutput(
    JSON.stringify({
      result: Object.keys(e.parameters).map(function (f) {
        return f + "," + e.parameters[f];
      }),
      method: method,
      createdFile: id ? id + " was created by " + user : "Not created.",
    })
  ).setMimeType(ContentService.MimeType.JSON);

  
    return output;

  } catch (error) {
    Logger.log(error);

    var jsonResponse = JSON.stringify({ 'status': 'error', 'message': error.message });
    var output = ContentService.createTextOutput(jsonResponse).setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}*/
