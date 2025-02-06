import { db, auth } from "./Firebase_Config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  updateDoc,
  getDoc,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
const membership = document.getElementById("membership");

membership.addEventListener("click", async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userID = user.uid;
      const userRef = doc(db, "users", userID);
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          await updateDoc(userRef, {
            subscriptionStatus: true,
          });
          document.getElementById("error").textContent =
            "subscription successful";
        } else {
          await setDoc(
            userRef,
            {
              subscriptionStatus: true,
            },
            { merge: true }
          );
          document.getElementById("error").textContent =
            "document field created and subscription successful";
        }
      } catch (error) {
        console.error(error);
        document.getElementById("error").textContent =
          "Failed to activate subscription, please try again";
      }
    } else {
      document.getElementById("error").textContent =
        "Please log in to subscribe";
    }
  });
});
