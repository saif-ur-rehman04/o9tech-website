/**
* PHP Email Form Validation - v3.11
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if( response.ok ) {
        // Try to parse as JSON first, fallback to text
        return response.text().then(text => {
          try {
            return JSON.parse(text);
          } catch {
            return text;
          }
        });
      } else {
        return response.text().then(text => {
          try {
            const err = JSON.parse(text);
            throw new Error(err.error || err.message || `${response.status} ${response.statusText}`);
          } catch {
            throw new Error(`${response.status} ${response.statusText} ${response.url}`);
          }
        });
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      // Handle Formspree response (JSON with ok:true or next property) or legacy PHP response (text "OK")
      const isSuccess = (
        (typeof data === 'object' && data !== null && (data.ok === true || data.success === true || data.next)) ||
        (typeof data === 'string' && data.trim() === 'OK')
      );
      
      if (isSuccess) {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        const errorMsg = (typeof data === 'object' && data.error) ? data.error : 
                        (typeof data === 'object' && data.message) ? data.message :
                        'Form submission failed and no error message returned from: ' + action;
        throw new Error(errorMsg); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
