document.addEventListener("DOMContentLoaded", (event) => {
	const element = document.getElementById("yourElementId");
	if (element) {
		element.addEventListener("click", function () {
			// ...existing code...
		});
	} else {
		console.error('Element with id "yourElementId" not found.');
	}
});
