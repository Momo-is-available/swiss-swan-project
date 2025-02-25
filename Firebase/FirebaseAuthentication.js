import { db, auth } from "./Firebase_Config.js";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithRedirect,
	getRedirectResult,
	FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
	setDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const register = document.getElementById("registerForm");
const login = document.getElementById("login-form");
const RedirectPhoneNumber = document.getElementById("social-form");
const PhoneBlock = document.getElementById("social-container");
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const googleSignIn = document.getElementById("google-login");
const facebookSignIn = document.getElementById("facebook-login");

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

getRedirectResult(auth)
	.then((result) => {
		console.log("Redirect result", result);
		if (result) {
			const user = result.user;
			console.log("userData", user);
			if (user) {
				sessionStorage.setItem(
					"User",
					JSON.stringify({
						uid: user.uid,
						Name: user.displayName || "No Name",
						Email: user.email,
					})
				);
				if (PhoneBlock.style.display === "none") {
					PhoneBlock.style.display = "block";
				}
				console.log("session storage:", sessionStorage.getItem("User"));
			} else {
				console.log("No redirects available");
			}
		}
	})
	.catch((error) => {
		const socialError = document.getElementById("social-error");
		if (error.code === "auth/account-exists-with-different-credential") {
			socialError.textContent =
				"Account already exists with a different provider.";
		} else if (error.code === "auth/network-request-failed") {
			socialError.textContent =
				"Network error, check your internet connection.";
		} else {
			socialError.textContent = `Error: ${error.message}`;
		}
		console.error(error);
	});

if (RedirectPhoneNumber) {
	RedirectPhoneNumber.addEventListener("submit", async (e) => {
		e.preventDefault();
		const EnteredPhoneNumber = document.getElementById(
			"redirect-PhoneNumber"
		).value;
		const redirectMessage = document.getElementById("redirectMessage");
		const linkMessage = document.getElementById("linkMessage");
		const User = JSON.parse(sessionStorage.getItem("User"));

		if (!User) {
			redirectMessage.textContent = "No User found, please sign in again";
			linkMessage.textContent = "Sign in here";
			return;
		}

		const { uid, Name, Email } = User;

		try {
			await setDoc(
				doc(db, "users", uid),
				{
					Name,
					Email,
					EnteredPhoneNumber,
					subscriptionStatus: false,
					browsingHistory: [],
					purchases: [],
					rentals: [],
				},
				{ merge: true }
			);
			redirectMessage.textContent = "Sign in Successful";
			window.location.href = "./index.html";
		} catch (error) {
			redirectMessage.textContent =
				"Could not save details, please sign in again";
			linkMessage.textContent = "Sign in here";
			console.error(error.message);
		}
	});
}
if (register) {
	register.addEventListener("submit", async (e) => {
		e.preventDefault();
		const Name = document.getElementById("fullName").value;
		const Email = document.getElementById("txt_email").value;
		const PhoneNumber = document.getElementById("txt_PhoneNumber").value;
		const Password = document.getElementById("password").value;
		const RegisterError = document.getElementById("Register-Error_message");
		try {
			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				Email,
				Password
			);
			const user = userCredentials.user;
			await setDoc(doc(db, "users", user.uid), {
				Name,
				Email,
				PhoneNumber,
				subscriptionStatus: false,
				browsingHistory: [],
				purchases: [],
				rentals: [],
			});
			window.location.href = "./index.html";
			console.log("User registered successfully");
		} catch (error) {
			if (error.code === "auth/weak-password") {
				RegisterError.textContent =
					"!! Weak password, password must be at least 6 characters";
			}
			if (error.code === "auth/email-already-in-use") {
				RegisterError.textContent =
					"!! Email is already in use, use another";
			}
			if (error.code === "auth/invalid-email") {
				RegisterError.textContent =
					"!! Invalid email format, please enter a valid email";
			}
			if (error.code === "auth/network-request-failed") {
				RegisterError.textContent =
					"!! Network error, check your internet connection";
			}
			console.error("Error registering user:", error);
		}
	});
}
if (login) {
	login.addEventListener("submit", async (e) => {
		e.preventDefault();
		const Email = document.getElementById("login_email").value;
		const Password = document.getElementById("login_password").value;
		const displayError = document.getElementById("Error-message");
		try {
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				Email,
				Password
			);
			window.location.href = "./index.html";
			const user = userCredentials.user;
			console.log("User signed in successfully:", user);
		} catch (error) {
			if (error.code === "auth/user-not-found") {
				displayError.textContent = "!! User not found";
			}
			if (error.code === "auth/invalid-credential") {
				displayError.textContent = "!! Invalid credentials";
			}
			if (error.code === "auth/invalid-email") {
				displayError.textContent = "!! Incorrect email or password";
			}
			if (error.code === "auth/wrong-password") {
				displayError.textContent = "!! Incorrect email or password";
			}
			if (error.code === "auth/network-request-failed") {
				displayError.textContent =
					"!! Network error, check your internet connection";
			}
			console.error("Error signing in user:", error);
		}
	});
}
/**document.getElementById("logout").addEventListener("cliick", (e) => {
  e.preventDefault();
  const displayError = document.getElementById("Error-message");
  try {
    signOut(auth);
    console.log("User signed out successfully");
    displayError.textContent = "signed out successfully";
    window.location.href = "./index.html";
  } catch (error) {
    displayError.textContent = "Error in signing out, signed out unsuccessful";
    console.log(error);
  }
});**/
