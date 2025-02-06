import { db, auth } from "./Firebase_Config.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const shippingInformation = document.getElementById("Shipping-address");

shippingInformation.addEventListener("submit", async (e) => {
  e.preventDefault();
  const Address1 = document.getElementById("address1").value;
  const Address2 = document.getElementById("address2").value;
  const City = document.getElementById("city").value;
  const Zip_Code = document.getElementById("zip").value;
  const Country = document.getElementById("country").value;
  const shippingMessage = document.getElementById("shipping-message");

  const user = auth.currentUser;

  if (user) {
    try {
      const userDoc = doc(db, "users", user.uid);
      await setDoc(
        userDoc,
        {
          ShippingDetails: {
            Address1,
            Address2,
            City,
            Zip_Code,
            Country,
          },
        },
        { merge: true }
      );
      shippingMessage.textContent =
        "Shipping details added successfully, you can now proceed. Press continue below";
      console.log("shipping details added successfully");
    } catch (error) {
      shippingMessage.textContent =
        "!!Failed to add shipping details, please check network connection and try again";
      console.log(error);
    }
  } else {
    shippingMessage =
      "It seems you are not logged in, Please log in to continue";
  }
});
