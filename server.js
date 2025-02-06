import express from "express";
import { urlencoded } from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(urlencoded({ extended: true }));

app.post("/your-action-url", async (req, res) => {
	const secretKey = "6LcC-8YqAAAAALZ4JuupbxfDXr9vgFsg1X-vaKJG";
	const token = req.body["g-recaptcha-response"];

	const response = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
		{
			method: "POST",
		}
	);
	const data = await response.json();

	if (data.success) {
		// reCAPTCHA verified successfully
		res.send("Verification successful");
	} else {
		// reCAPTCHA verification failed
		res.send("Verification failed");
	}
});

app.listen(5500, () => {
	console.log("Server is running on port 5500");
});
