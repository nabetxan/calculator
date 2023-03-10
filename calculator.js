//functions for all of the basic math operators

// add
const add = function (a, b) {
  return a + b;
};

// subtract
const subtract = function (a, b) {
  return a - b;
};

// multiply
const multiply = function (a, b) {
  return a * b;
};

// divide
const divide = function (a, b) {
  return a / b;
};

const operatorObj = {
  add: {
    function: add,
    symbol: "+",
  },
  subtract: {
    function: subtract,
    symbol: "-",
  },
  multiply: {
    function: multiply,
    symbol: "×",
  },
  divide: {
    function: divide,
    symbol: "÷",
  },
  equal: {
    symbol: "=",
  },
};

// Create a new function operate that takes an operator and 2 numbers
// and then calls one of the above functions on the numbers.
const operate = function (operator, a, b) {
  return operatorObj[operator].function(Number(a), Number(b));
};

// get the HTML elements

//chat-kun
// const buttons = document.querySelectorAll(".button");
// const handleClick = function (event) {
//   return event.target.id;
// };
// buttons.forEach(function (button) {
//   button.addEventListener("click", handleClick);
// });
const btnOne = document.getElementById("btnOne");
const btnTwo = document.getElementById("btnTwo");
const btnThree = document.getElementById("btnThree");
const btnFour = document.getElementById("btnFour");
const btnFive = document.getElementById("btnFive");
const btnSix = document.getElementById("btnSix");
const btnSeven = document.getElementById("btnSeven");
const btnEight = document.getElementById("btnEight");
const btnNine = document.getElementById("btnNine");
const btnZero = document.getElementById("btnZero");
const btnDot = document.getElementById("btnDot");
const btnClear = document.getElementById("btnClear");
const btnDivide = document.getElementById("btnDivide");
const btnMultiply = document.getElementById("btnMultiply");
const btnSubtract = document.getElementById("btnSubtract");
const btnAdd = document.getElementById("btnAdd");
const btnEqual = document.getElementById("btnEqual");
const currentDisplay = document.querySelector("#currentDisplay");
const answerDisplay = document.querySelector("#currentAnswer");

let num = "";
let a = "";
let b = "";
let isOperatorClicked = false;
let operator = "";
let symbol = "";
let currentDisplayValue = "";

//button
// chat-kun
// btnOne.addEventListener("click", handleClick("1"))
// btnTwo.addEventListener("click", handleClick("2"))
// When you are adding an event listener to the button elements, you need to pass
// the function reference as an argument to the addEventListener method. However,
// in your code, you are calling the handleClick function with an argument immediately
// while adding the event listener. So, the handleClick function is actually getting called
// before the event occurs and its result (undefined) is being passed as the event listener function.
// To fix this, you can wrap the function reference in an anonymous function, like this:

btnOne.addEventListener("click", function () {
  inputNumWithClick("1");
});
btnTwo.addEventListener("click", function () {
  inputNumWithClick("2");
});
btnThree.addEventListener("click", function () {
  inputNumWithClick("3");
});
btnFour.addEventListener("click", function () {
  inputNumWithClick("4");
});
btnFive.addEventListener("click", function () {
  inputNumWithClick("5");
});
btnSix.addEventListener("click", function () {
  inputNumWithClick("6");
});
btnSeven.addEventListener("click", function () {
  inputNumWithClick("7");
});
btnEight.addEventListener("click", function () {
  inputNumWithClick("8");
});
btnNine.addEventListener("click", function () {
  inputNumWithClick("9");
});
btnZero.addEventListener("click", function () {
  inputNumWithClick("0");
});
btnDot.addEventListener("click", function () {
  inputNumWithClick(".");
});

//input numbers and "." . Display control//
function inputNumWithClick(value) {
  //can click Dot only once
  //check if value is "." && it's first time
  if (value === "." && !num.includes(".")) {
    num = num + value;
    currentDisplayValue = num;
    btnDot.disabled = true;
    return;
  }

  num = num + value;
  if (a === "") {
    // do nothing
  } else if (operator !== "") {
    b = num;
    answerDisplay.textContent = operate(operator, a, b);
  }
  currentDisplayValue = currentDisplay.textContent + value;
  currentDisplay.textContent = currentDisplayValue;
}

//input symbol. Display control//
function inputSymbol(value) {
  //can click only once
  if (currentDisplay.textContent.slice(-3) === " " + value + " ") {
    return;
  }
  currentDisplayValue = currentDisplay.textContent + " " + value + " ";
  a = num;
  b = "";
  currentDisplay.textContent = currentDisplayValue;
  btnDot.disabled = false;
}

//operator
function inputOperator(value) {
  //do nothing if no numbers are input
  if (a === "" && b === "") {
    return;
  }

  if (a === num) {
    operator = value;
    symbol = operatorObj[operator].symbol;
    inputSymbol(symbol);
  } else if (a !== "" && b === "" && value !== "equal") {
    operator = value;
    num = "";
    symbol = operatorObj[operator].symbol;
    inputSymbol(symbol);
  } else if (a !== "" && b !== "" && value !== "equal") {
    operator = value;
    num = "";
    symbol = operatorObj[operator].symbol;
    inputSymbol(symbol);
    a = b;
    b = "";
    // answerDisplay.textContent = operate(operator, a, b);
    // a = answerDisplay.textContent;
    // b = "";
  } else if (value === "equal") {
    b = num;
    num = "";
    symbol = operatorObj[value].symbol;
    inputSymbol(symbol);
    answerDisplay.textContent = operate(operator, a, b);
    a = b;
    b = "";
  }
}

btnDivide.addEventListener("click", function () {
  inputOperator("divide");
  isOperatorClicked = false;
});

btnMultiply.addEventListener("click", function () {
  inputOperator("multiply");
  isOperatorClicked = false;
});

btnSubtract.addEventListener("click", function () {
  inputOperator("subtract");
  isOperatorClicked = false;
});

btnAdd.addEventListener("click", function () {
  inputOperator("add");
  isOperatorClicked = false;
});

btnClear.addEventListener("click", function () {
  // reset with alert
  num = "";
  a = "";
  b = "";
  isOperatorClicked = false;
  operator = "";
  symbol = "";
  currentDisplayValue = "";
  currentDisplay.textContent = "";
  answerDisplay.textContent = 0;
});

btnEqual.addEventListener("click", function () {
  inputOperator("equal");
});

// Gotchas: watch out for and fix these bugs if they show up in your code:
// Users should be able to string together several operations and get the right answer,
//with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42.
//An example of the behavior we’re looking for would be this student solution.

// You should round answers with long decimals so that they don’t overflow the screen.
// Pressing = before entering all of the numbers or an operator could cause problems!
// Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
// Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

// Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet.
//Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5.
//It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)
// Add a “backspace” button, so the user can undo if they click the wrong number.
// Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble.
//Read the MDN documentation for event.preventDefault to help solve this problem.

// Keyboard support: Allow users to use the keyboard to input numbers and operators instead of clicking the buttons. You can achieve this by listening for keydown events and mapping the pressed key to its corresponding button.

// Negative numbers: Add support for negative numbers by allowing the user to input a negative sign (-) before the number.

// Decimal precision: Limit the decimal precision of the result to a certain number of decimal places (e.g., 2) to avoid long decimals.

// Error handling: Add error handling to the code to handle edge cases such as division by zero or inputting invalid characters.

// function inputNumWithClick(value) {
//   //can click Dot only once
//   //check if value is "." && it's first time
//   if (value === "." && isDotClicked === false) {
//     isDotClicked = true;
//     num = num + value;
//     currentDisplayValue = num;
//   } else if (value === "." && isDotClicked === true) {
//     // do nothing;
//     return;
//   }

//   if (value !== "." && isOperatorClicked === true) {
//     // num = value; // as "b"
//     currentDisplayValue = currentDisplay.textContent + " " + value;
//     isOperatorClicked = false;
//   } else if (value !== "." && isOperatorClicked === false) {
//     num = num + value;
//     currentDisplayValue = value;
//   }

//   currentDisplay.textContent = currentDisplayValue;
// }
