import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Welcome to Swiss Swan Project! 🚀");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

// reCAPTCHA Verification Endpoint
app.post("/verify-recaptcha", async (req, res) => {
	try {
		const token = req.body["g-recaptcha-response"];

		const response = await fetch(
			`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`,
			{ method: "POST" }
		);

		const data = await response.json();
		if (data.success) {
			res.json({
				success: true,
				message: "reCAPTCHA verified successfully",
			});
		} else {
			res.status(400).json({
				success: false,
				message: "reCAPTCHA verification failed",
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Server error" });
	}
});

// Gemini AI Chatbot Endpoint
app.post("/chat", async (req, res) => {
	try {
		const { message } = req.body;

		const response = await fetch(
			"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${GEMINI_API_KEY}`,
				},
				body: JSON.stringify({
					prompt: { text: message },
					maxTokens: 1024,
					temperature: 0.7,
				}),
			}
		);

		const data = await response.json();
		res.json({
			response: data.candidates?.[0]?.output || "No response from Gemini",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to generate response" });
	}
});

// Start Server
app.listen(port, () => {
	console.log(`✅ Server running on http://localhost:${port}`);
});
