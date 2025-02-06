import { db, auth } from "./Firebase_Config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  collection,
  doc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const productContainer = document.getElementById("testing-featuredProducts");

const renderProducts = async (products, isLoggedIn) => {
  let productBox = "";
  products.forEach((product) => {
    const productUI = `
      
				<div class="col-md-3 col-sm-6 col-xs-6 main-product">
					<div class="category-box product-box">
						<span class="sale">sales</span>
						<div class="inner-product">
							<img src="${product.Image}" alt="${product.Name}" />
							<div class="product-box-inner">
								<ul>
									<li><a title="Eye" href="${product.Image}"><i class="fa fa-eye"></i></a></li>
									<li><a title="Heart" href="#"><i class="fa fa-heart"></i></a></li>
								</ul>
								<a title="Add to cart" href="#" class="btn">add to cart</a>
							</div>
						</div>
					</div>
					<a href="#" class="product-title">${product.Name}</a>
					
					<span class="amount"><del>&dollar;24.99</del> &dollar;${product.Price}</span>
				</div>
    `;
    productBox += productUI;
  });
  if (!isLoggedIn) {
    const loginMessage = document.getElementById("halfProductsLogin");
    if (loginMessage.style.display === "none") {
      loginMessage.style.display = "block";
    }
  }
  productContainer.innerHTML = productBox;
};

let allProducts = [];
const FetchProducts = async (isLoggedIn) => {
  try {
    const categoriesDoc = await getDocs(collection(db, "Products"));
    for (const category of categoriesDoc.docs) {
      const categoryID = category.id;
      console.log("category ID:", categoryID);
      const productsRef = collection(db, "Products", categoryID, "Products");
      const productDoc = await getDocs(productsRef);
      const products = productDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      allProducts.push(...products);
    }
    const allProductsNested = await Promise.all(allProducts);
    const allProductsFlat = allProductsNested.flat();
    const productsForRendering = isLoggedIn
      ? allProductsFlat
      : allProductsFlat.slice(0, 10);
    renderProducts(productsForRendering, isLoggedIn);
    console.log("All Products:", allProductsFlat);
    allProducts = allProductsFlat;
  } catch (error) {
    console.error("Error fetching products", error);
  }
};

onAuthStateChanged(auth, (user) => {
  try {
    if (user) {
      console.log("user email", user.Email);
      FetchProducts(true);
    } else {
      FetchProducts(false);
    }
  } catch (error) {
    console.error(error);
  }
});

const Search = (input) => {
  const searchResults = allProducts.filter((product) =>
    product.Name.toLowerCase().includes(input.toLowerCase())
  );
  console.log("SearchResult:", searchResults);
  renderSearchResults(searchResults);
};

const renderSearchResults = (products) => {
  const resultBox = document.getElementById("searchResult");
  products.forEach((product) => {
    const list = document.createElement("li");
    list.textContent = product.Name;
    resultBox.appendChild(li);
    console.log("ResultLists", resultBox);
  });
};
const searchClick = document.getElementById("searchClick");
searchClick.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value;
  Search(searchInput);
});
const trackProductView = async (userID, productID) => {
  const userRef = doc(db, "users", userID);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const browserHistory = userData.browsingHistory;
    if (!browserHistory.includes(productID)) {
      await updateDoc(userRef, {
        browsingHistory: arrayUnion(productID),
      });
    } else {
      console.log("user not found!!!");
    }
  }
};
const getRecommendation = async (userID) => {
  try {
    const userRef = doc(db, "users", userID);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const browserHistory = userData.browsingHistory;

      const allProducts = FetchProducts();
      const unviewed = allProducts.filter(
        (product) => !browserHistory.includes(product.id)
      );
      console.log(unviewed);
      return unviewed;
    }
  } catch (error) {
    console.error("Error, getting recommendation", error);
  }
};
