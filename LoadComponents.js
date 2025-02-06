function LoadComponent(url, element) {
	if (!element) {
		console.error("Target element not found");
		return;
	}
	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.text();
		})
		.then((html) => {
			element.innerHTML = html;
		})
		.catch((error) => {
			console.error(`Error loading ${url}:`, error);
		});
}

document.addEventListener("DOMContentLoaded", function () {
	const footerElement = document.querySelector(".footer-bottom");
	if (footerElement) {
		LoadComponent("Components/FooterBottom.html", footerElement);
	} else {
		console.error("Footer element not found");
	}
});
