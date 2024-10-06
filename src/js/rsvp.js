document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');
  const main = document.querySelector('main');
  const confirmation = document.querySelector('.content .confirmation');
  const emailField = document.querySelector('form #email');
  // Function to update label class based on input value
  const updateLabelClass = (input) => {
    const label = form.querySelector(`label[for="${input.id}"]`);
    if (input.value.trim()) {
      if (label) {
        label.classList.add('set'); // Add set class to the label if input is set
      }
    } else {
      if (label) {
        label.classList.remove('set'); // Remove set class from the label if input is not set
      }
    }
  };

  const showThankYou = () => {
    console.log('Thank you for your RSVP!');
    main.classList.add('confirmed');
    setTimeout(() => {
      confirmation.style.opacity = '1'; // Trigger the opacity transition
    }, 10);
  };

  const showErrorMessage = () => {
    form.classList.remove('submitted');
    emailField.classList.add('error'); // Add error class to the input
  };

  // Add event listeners to each required input
  form.querySelectorAll('input').forEach((input) => {
    input.addEventListener('focus', () => {
      const label = form.querySelector(`label[for="${input.id}"]`);
      if (label) {
        label.classList.add('set'); // Add set class to the label on focus
      }
    });
    input.addEventListener('blur', () => updateLabelClass(input)); // Check value on blur
    input.addEventListener('input', () => updateLabelClass(input)); // Check value on input
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    //showThankYou();
    //return;
    let isValid = true;
    // Remove existing error classes
    form.classList.remove('error');
    // Check each required field
    form.querySelectorAll('[req]').forEach((input) => {
      if (!input.value.trim() || (input.type === 'email' && !input.value.includes('@'))) {
        isValid = false;
        input.classList.add('error'); // Add error class to the input
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (label) {
          label.classList.add('error'); // Add set class to the label on focus
        }
      } else {
        input.classList.remove('error'); // Remove error class if input is valid
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (label) {
          label.classList.remove('error'); // Add set class to the label on focus
        }
      }
      updateLabelClass(input); // Update label class based on input value
    });

    if (!isValid) {
      return; // Stop form submission if validation fails
    }

    form.classList.add('submitted');

    //const form = event.target;
    const formData = new FormData(event.target);
    const plusOne = formData.get('plus_one');
    console.log('plusOne:', plusOne);
    formData.set('attendees', plusOne == 'yes' ? '2' : '1');
    formData.delete('plus_one');
    // Send the form data to Google Apps Script Web App
    // Send data to Google Apps Script
    try {
      const WEBAPP_ID = 'AKfycbzbyO7UKQQbnszzT8dvT3eTx9fDqpuyo2pMZwK2Rq-kf7q-tucSy3QwdDfHJttOGkl5';
      const proxy = 'http://46.101.86.155:8000/api';
      //const proxy = 'http://localhost:8000/api';
      //const URL = 'https://script.google.com/macros/s/' + WEBAPP_ID + '/exec';
      const URL = proxy + '/macros/s/' + WEBAPP_ID + '/exec';
      const response = await fetch(URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });
      const parsedData = await response.json();
      console.log('Parsed Data:', parsedData);
      if (parsedData.status === 'success') {
        showThankYou();
      } else {
        showErrorMessage();
      }
    } catch (error) {
      console.error('Error:', error);
    }
    console.log('Form Submitted');
  });
});
