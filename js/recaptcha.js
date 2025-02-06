window.onloadCallback = function () {
	console.log("✅ reCAPTCHA script loaded successfully!"); // Debugging log

	document.querySelectorAll("form[data-recaptcha]").forEach((form) => {
		const recaptchaDiv = document.createElement("div");
		recaptchaDiv.className = "g-recaptcha";
		recaptchaDiv.setAttribute("id", `recaptcha-${form.id}`);

		const siteKey =
			form.getAttribute("data-sitekey") || "YOUR_DEFAULT_SITE_KEY";

		const submitButton = form.querySelector("button[type='submit']");
		if (submitButton) {
			form.insertBefore(recaptchaDiv, submitButton);
		}

		grecaptcha.render(recaptchaDiv.id, {
			sitekey: siteKey,
			callback: function () {
				console.log(`✅ reCAPTCHA active on form: ${form.id}`);
			},
		});
	});
};
