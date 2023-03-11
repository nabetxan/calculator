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
  inputNum("1");
});
btnTwo.addEventListener("click", function () {
  inputNum("2");
});
btnThree.addEventListener("click", function () {
  inputNum("3");
});
btnFour.addEventListener("click", function () {
  inputNum("4");
});
btnFive.addEventListener("click", function () {
  inputNum("5");
});
btnSix.addEventListener("click", function () {
  inputNum("6");
});
btnSeven.addEventListener("click", function () {
  inputNum("7");
});
btnEight.addEventListener("click", function () {
  inputNum("8");
});
btnNine.addEventListener("click", function () {
  inputNum("9");
});
btnZero.addEventListener("click", function () {
  inputNum("0");
});
btnDot.addEventListener("click", function () {
  inputNum(".");
});

//input numbers and "." . Display control//
function inputNum(value) {
  num = num + value;
  currentDisplay.textContent = currentDisplay.textContent + value;
  //can click Dot only once
  //check if value is "." && it's first time
  if (value === ".") {
    btnDot.disabled = true;
  }
}

//input symbol. Display control//
function inputSymbol(symbol) {
  currentDisplay.textContent = currentDisplay.textContent + " " + symbol + " ";
  btnDot.disabled = false;
}

//operator
function inputOperator(value) {
  //do nothing if no numbers are input yet
  if (num === "") {
    return;
  }

  if (a === "") {
    a = num;
    num = "";
    operator = value;
    symbol = operatorObj[operator].symbol;
    inputSymbol(symbol);
  } else if (a !== "" && value === "equal") {
    b = num;
    num = "";
    symbol = operatorObj[value].symbol;
    inputSymbol(symbol);
    a = operate(operator, a, b);
    // You should round answers with long decimals so that they don’t overflow the screen.
    answerDisplay.textContent = a.toFixed(2);
  } else if (a !== "" && value !== "equal") {
    b = num;
    symbol = operatorObj[operator].symbol;
    inputSymbol(symbol);
    a = operate(operator, a, b);
    answerDisplay.textContent = a.toFixed(2);
    b = "";
    num = "";
    operator = value;
  } else if (a === "" && value === "equal") {
  }
}

btnDivide.addEventListener("click", function () {
  inputOperator("divide");
});

btnMultiply.addEventListener("click", function () {
  inputOperator("multiply");
});

btnSubtract.addEventListener("click", function () {
  inputOperator("subtract");
});

btnAdd.addEventListener("click", function () {
  inputOperator("add");
});

btnClear.addEventListener("click", function () {
  // reset with alert
  num = "";
  a = "";
  b = "";
  operator = "";
  symbol = "";
  currentDisplayValue = "";
  currentDisplay.textContent = "";
  answerDisplay.textContent = 0;
  btnDot.disabled = false;
});

btnEqual.addEventListener("click", function () {
  inputOperator("equal");
});






// after "=", you can only click "clear"
// Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

// Add a “backspace” button, so the user can undo if they click the wrong number.
// Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble.
//Read the MDN documentation for event.preventDefault to help solve this problem.

// Keyboard support: Allow users to use the keyboard to input numbers and operators instead of clicking the buttons. You can achieve this by listening for keydown events and mapping the pressed key to its corresponding button.

// Negative numbers: Add support for negative numbers by allowing the user to input a negative sign (-) before the number.

// Decimal precision: Limit the decimal precision of the result to a certain number of decimal places (e.g., 2) to avoid long decimals.

// Error handling: Add error handling to the code to handle edge cases such as division by zero or inputting invalid characters.
