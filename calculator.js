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
    // contorary: "subtract",
  },
  subtract: {
    function: subtract,
    symbol: "-",
    // contorary: "add",
  },
  multiply: {
    function: multiply,
    symbol: "×",
    // contorary: "divide",
  },
  divide: {
    function: divide,
    symbol: "÷",
    // contorary: "multiply",
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
const btnBackspace = document.getElementById("btnBackspace");
const btnEuro = document.getElementById("btnEuro");
const btnPlusMinus = document.getElementById("btnPlusMinus");
const currentDisplay = document.querySelector("#currentDisplay");
const answerDisplay = document.querySelector("#currentAnswer");
const allButtons = document.querySelectorAll("button");

let num = "";
let a = "";
let b = "";
// let c = ""; // for back space purpose
let operator = "";
let symbol = "";
let currentDisplayValue = "";
let isEqualClicked = false;

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

  // not allowing to divide by 0
  if (
    (Number(num) === 0 && value === "divide") ||
    (Number(num) === 0 && operator === "divide")
  ) {
    answerDisplay.textContent = "you cannot divide by 0…";
    disableMostButtons();
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
    // You should round answers with long decimals so that they don’t overflow the screen.
    a = operate(operator, a, b);
    checkDecimal(a);
  } else if (a !== "" && value !== "equal") {
    b = num;
    symbol = operatorObj[value].symbol; // value?
    inputSymbol(symbol);
    a = operate(operator, a, b);
    checkDecimal(a);
    b = "";
    num = "";
    operator = value;
  } else if (a === "" && value === "equal") {
  }
}

// if the answer doesn't have decimal, no need to show ".00"
const checkDecimal = function (a) {
  if (Number.isInteger(a)) {
    answerDisplay.textContent = a;
  } else {
    answerDisplay.textContent = a.toFixed(2);
  }
};

const disableMostButtons = function () {
  allButtons.forEach(function (button) {
    if (button !== btnClear) {
      button.disabled = true;
    }
  });
};

const reset = function () {
  num = "";
  a = "";
  b = "";
  operator = "";
  symbol = "";
  currentDisplayValue = "";
  currentDisplay.textContent = "";
  answerDisplay.textContent = 0;
  btnDot.disabled = false;
  isEqualClicked = false;
  allButtons.forEach(function (button) {
    button.disabled = false;
  });
};

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

btnClear.addEventListener("click", reset);

btnEqual.addEventListener("click", function () {
  // isEqualClicked = true;
  inputOperator("equal");

  // after "=", you can only click "clear"
  disableMostButtons();
});

// Add a “backspace” button, so the user can undo if they click the wrong number.
// you can delete ONLY the number, not undo the operation

btnBackspace.addEventListener("click", function () {
  let str = currentDisplay.textContent;
  // if deleting the dot
  if (str[str.length - 1] === ".") {
    btnDot.disabled = false;
  }
  // if it's empty, just reset
  if (str.length === 0) {
    reset();
  } 
  // if the last thing is the operator Symbol, you cannot delete more
  if (str[str.length - 1] === " "){
    return;
  } else {
      num = num.slice(0, -1);
      currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    }
  });

// Negative numbers: Add support for negative numbers by allowing the user to input a negative sign (-) before the number.

btnPlusMinus.addEventListener("click", function () {
  console.log("under construction");
});

// euro to jpy

btnEuro.addEventListener("click", function () {
  console.log("under construction");
  //ask for rate input (with default)
});

// Keyboard support: Allow users to use the keyboard to input numbers and operators instead of clicking the buttons.
//You can achieve this by listening for keydown events and mapping the pressed key to its corresponding button.
// Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble.
//Read the MDN documentation for event.preventDefault to help solve this problem.
// Error handling: Add error handling to the code to handle edge cases such as division by zero or inputting invalid characters.

// add sound
