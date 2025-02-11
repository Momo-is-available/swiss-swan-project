import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from "firebase/auth";

const auth = getAuth();

// document.getElementById("google-login").addEventListener("click", () => {
// 	const provider = new GoogleAuthProvider();
// 	signInWithPopup(auth, provider)
// 		.then((result) => {
// 			// Handle successful login
// 			console.log("Google login successful:", result.user);
// 		})
// 		.catch((error) => {
// 			// Handle Errors here.
// 			console.error("Google login error:", error);
// 		});
// });

// document.getElementById("facebook-login").addEventListener("click", () => {
// 	const provider = new FacebookAuthProvider();
// 	signInWithPopup(auth, provider)
// 		.then((result) => {
// 			// Handle successful login
// 			console.log("Facebook login successful:", result.user);
// 		})
// 		.catch((error) => {
// 			// Handle Errors here.
// 			console.error("Facebook login error:", error);
// 		});
// });
// Handle Google Authentication
googleSignIn.addEventListener("click", async (e) => {
	e.preventDefault();
	try {
		await signInWithRedirect(auth, googleProvider);
	} catch (error) {
		console.error("Google Sign-In Error:", error);
		document.getElementById("social-error").textContent =
			"Google Sign-In failed. Please try again.";
	}
});

// Handle Facebook Authentication
facebookSignIn.addEventListener("click", async (e) => {
	e.preventDefault();
	try {
		await signInWithRedirect(auth, facebookProvider);
	} catch (error) {
		console.error("Facebook Sign-In Error:", error);
		document.getElementById("social-error").textContent =
			"Facebook Sign-In failed. Please try again.";
	}
});

// Handle Redirect Result
async function handleRedirectResult() {
	try {
		const result = await getRedirectResult(auth);
		if (result && result.user) {
			const user = result.user;
			console.log("User signed in:", user);

			sessionStorage.setItem(
				"User",
				JSON.stringify({
					uid: user.uid,
					Name: user.displayName || "No Name",
					Email: user.email,
				})
			);

			// Show phone block if it was hidden
			if (PhoneBlock.style.display === "none") {
				PhoneBlock.style.display = "block";
			}

			console.log("Session Storage:", sessionStorage.getItem("User"));
		}
	} catch (error) {
		console.error("Redirect Authentication Error:", error);
		document.getElementById("social-error").textContent =
			"Authentication failed. Please try again.";
	}
}

// Run function on page load
document.addEventListener("DOMContentLoaded", handleRedirectResult);
