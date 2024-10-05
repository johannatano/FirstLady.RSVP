const form = event.target;
const formData = new FormData(form);
const plusOne = formData.get('plus_one');
console.log('plusOne:', plusOne);
formData.set('attendees', plusOne == 'yes' ? '2' : '1');
formData.delete('plus_one');
// Send the form data to Google Apps Script Web App

// Send data to Google Apps Script
try {
  const WEBAPP_ID = 'AKfycbz8EoyPl_UMAhH40baZDnfYr70tZrjHMxNOmC_dBOQ81BF2RfkcIjHFgtEmu8jrFb3A';
  const proxy = 'http://localhost:8000/api';
  //const URL = 'https://script.google.com/macros/s/' + WEBAPP_ID + '/exec';
  const URL = proxy + '/macros/s/' + WEBAPP_ID + '/exec';
  const response = await fetch(URL, {
    method: 'POST',
    body: formData,
  });
  const parsedData = await response.json();
  console.log('Parsed Data:', parsedData);
} catch (error) {
  console.error('Error:', error);
}
console.log('Form Submitted');
