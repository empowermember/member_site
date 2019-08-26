
$(document).ready(function () {
    $('section.newsletterTease').formValidation({
		// I am validating Bootstrap form
		framework: 'bootstrap',

		// Feedback icons
		icon: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},

		// List of fields and their validation rules
		fields: {
			_nbEmail: {
				icon: 'false',
				trigger: 'blur',
				validators: {
					notEmpty: {
						message: 'Email address is required'
					}
				}
			},
			_nbZipCode: {
				icon: 'false',
				trigger: 'blur',
				validators: {
					notEmpty: {
						message: 'Zip code is required'
					}
				}
			}
		}
	})
	.on('success.form.fv', function (e) {
		// Prevent form submission
		e.preventDefault();
	});

	// On submit click, set the value
	$('#newsletterButton').click(function (e) {
		sbmButton = $(this);
		var messageDiv = $('div.form-group.message'); var messageDiv = $('div.form-group.message');
		messageDiv.html('');

        var $form = $('section.newsletterTease');

		// and the FormValidation instance
		var fv = $form.data('formValidation');

		if (fv === null) {
			return;
		}

		// Validate the Newsletter Bar
		fv.validate();

		// Verify the form is valid
		if (fv.isValid()) {
			messageDiv.css('color', '#4a0d66');
			messageDiv.css('display', 'block');
			messageDiv.html('Newsletter Sign Up in process, please wait...');
			// Make Api call to sign up for the Newsletter
			callNewsletterApi(sbmButton, fv)
		}
	});
});

function callNewsletterApi(sbmButton, fv) {
	// Setup for api call
	var convioUrl = '/api/convio/signup';
	var email = $("[name='_nbEmail']");
	var zipCode = $("[name='_nbZipCode']");
	var messageDiv = $('div.form-group.message');

	if (email.val() === '' || zipCode.val() === '') {
		// Should not get this far without these values.  Exit if it does.
		return;
	}

	// Data for Convio api
	var postData = { cons_email: email.val(), cons_zip_code: zipCode.val(), cons_email_opt_in: true };
	// Use Ajax to submit form data
	$.ajax({
		url: convioUrl,
		method: 'POST',
		data: JSON.stringify(postData),
		contentType: 'application/json;charset=utf-8',
		dataType: 'json',
        success: function (data, status, jqXHR) {
            var isSuccess = data.Data.SubmitSurveyResponse === undefined ? data.Data.submitSurveyResponse.success === 'true' : data.Data.SubmitSurveyResponse.Success === 'true';
            if (data.Success === true && isSuccess) {
				email.val('');
				zipCode.val('');
				fv.resetForm();
				if (sbmButton !== null) {
					sbmButton.removeClass('disabled');
                }

				messageDiv.css('color', '#4a0d66');
				messageDiv.css('display', 'block');
                messageDiv.html('Newsletter Sign Up succeeded - thank you!');

                // gtm
                dataLayer.push({ 'event': 'alz-event', 'eventCategory': 'newsletter', 'eventAction': 'signup', 'eventLabel': 'enews', 'eventValue': 0 });
			}
			else {
				logError("NewsletterBar", "callNewsletterApi", status);
				messageDiv.css('color', 'red');
				messageDiv.css('display', 'block');
				messageDiv.html('Newsletter Sign Up failed!');
			}
		},
		error: function (jqXHR, status, error) {
			logError("NewsletterBar", "callNewsletterApi", status);
			messageDiv.css('color', 'red');
			messageDiv.css('display', 'block');
			messageDiv.html('Newsletter Sign Up failed!');
		}
	});
}

function logInfo(source, eventCode, info) {
	var postData = { source: source, eventCode: eventCode, info: info };
	var url = "/api/log/loginfo";
	$.ajax({
		url: url,
		method: 'POST',
		data: JSON.stringify(postData),
		contentType: 'application/json;charset=utf-8',
		dataType: 'json',
		error: function (jqXHR, status, error) {
			logError("NewsletterBar", "logInfo", status);
		}
	});
}


function logError(source, eventCode, error) {
	var postData = { source: source, eventCode: eventCode, error: error };
	var url = "/api/log/logerror";
	$.ajax({
		url: url,
		method: 'POST',
		data: JSON.stringify(postData),
		contentType: 'application/json;charset=utf-8',
		dataType: 'json',
	});
}
