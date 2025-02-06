async function LoadComponent(elementId, filePath, callback) {
	try {
		const response = await fetch(filePath);
		const content = await response.text();
		document.getElementById(elementId).innerHTML = content;

		if (typeof callback === "function") {
			callback();
		}
	} catch (error) {
		console.error(`Error loading ${filePath}:`, error);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	LoadComponent("FooterBottom", "Components/FooterBottom.html", () => {
		if (typeof attachToggleMoreListener === "function") {
			attachToggleMoreListener();
		}
	});
});
