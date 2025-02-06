const toggleAnswer = (element) => {
  // Find the closest parent <li> of the question and get its next sibling (the answer)
  const answer = element.closest("li").nextElementSibling;

  // Toggle the display between block and none
  if (answer.style.display === "block") {
    answer.style.display = "none";
  } else {
    answer.style.display = "block";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Select all topic elements
  const topics = document.querySelectorAll(".Topics");

  // Add a click event listener to each topic
  topics.forEach((topic) => {
    topic.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement.style.display === "none") {
        targetElement.style.display = "block";
      } else {
        targetElement.style.display = "none";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".Artists-btn");

  btn.addEventListener("click", function () {
    const targetElement = document.getElementById("Artists-form");

    if (targetElement.style.display === "none") {
      targetElement.style.display = "block";
    } else {
      targetElement.style.display = "none";
    }
  });
});
