console.log("script.js connected!");

// Stores the user's picks, e.g. { q1: { answer: "b", points: 2 } }
const userAnswers = {};

// ---------------------------------------------------------------
// Track the selected answers
// ---------------------------------------------------------------
const questionBlocks = document.querySelectorAll(".question-block");

questionBlocks.forEach(function (block) {
  const buttons = block.querySelectorAll(".answer-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Remove "selected" from every button in this question
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
      }

      // Highlight the button that was clicked
      button.classList.add("selected");

      // Save the answer for this question
      const questionId = block.dataset.question;
      userAnswers[questionId] = {
        answer: button.dataset.answer,
        points: Number(button.dataset.points),
      };

      console.log("Answers so far:", userAnswers);
    });
  });
});

// ---------------------------------------------------------------
// Calculate and display the result
// ---------------------------------------------------------------
function displayResult() {
  const resultContainer = document.getElementById("result-container");
  const answeredCount = Object.keys(userAnswers).length;

  // Make sure every question has been answered first
  if (answeredCount < questionBlocks.length) {
    resultContainer.textContent =
      "Please answer all " + questionBlocks.length + " questions before seeing your result!";
    return;
  }

  // Add up the points from every answer
  let totalScore = 0;
  for (const questionId in userAnswers) {
    totalScore += userAnswers[questionId].points;
  }
  console.log("Total score:", totalScore);

  // Map the score range to a coffee drink
  let drink = "";
  let description = "";

  if (totalScore <= 6) {
    drink = "Hot Chocolate Mocha";
    description = "You're warm, cozy, and sweet. People feel at home around you.";
  } else if (totalScore <= 9) {
    drink = "Caramel Frappuccino";
    description = "You're fun, social, and never afraid to add extra whipped cream.";
  } else if (totalScore <= 12) {
    drink = "Cappuccino";
    description = "You're classic and thoughtful, and you appreciate the finer things.";
  } else {
    drink = "Double Espresso";
    description = "You're bold, driven, and always on the move. No time to waste!";
  }

  resultContainer.innerHTML =
    "<h2 class='result-title'>You are a " + drink + "!</h2>" +
    "<p class='mb-1'>" + description + "</p>" +
    "<small class='text-muted'>Your score: " + totalScore + " / 16</small>";
}

const showResultButton = document.getElementById("show-result");
showResultButton.addEventListener("click", displayResult);