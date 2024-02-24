const calculatorButtons = [
  {
    type: "operator",
    id: "add",
    keyboard: "+",
    display: "+",
    function: (a, b) => {
      return a + b;
    }
  },
  {
    type: "operator",
    id: "subtract",
    keyboard: "-",
    display: "-",
    function: (a, b) => {
      return a - b;
    }
  },
  {
    type: "operator",
    id: "multiply",
    keyboard: "*",
    display: "×",
    function: (a, b) => {
      return a * b;
    }
  },
  {
    type: "operator",
    id: "divide",
    keyboard: "/",
    display: "÷",
    function: (a, b) => {
      return a / b;
    }
  },
  {
    type: "equal",
    id: "equal",
    keyboard: "Enter",
    display: "=",
    function: () => {}
  },
  {
    type: "number",
    id: "one",
    keyboard: "1",
    display: "1",
    value: 1
  },
  {
    type: "number",
    id: "two",
    keyboard: "2",
    display: "2",
    value: 2
  },
  {
    type: "number",
    id: "three",
    keyboard: "3",
    display: "3",
    value: 3
  },
  {
    type: "number",
    id: "four",
    keyboard: "4",
    display: "4",
    value: 4
  },
  {
    type: "number",
    id: "five",
    keyboard: "5",
    display: "5",
    value: 5
  },
  {
    type: "number",
    id: "six",
    keyboard: "6",
    display: "6",
    value: 6
  },
  {
    type: "number",
    id: "seven",
    keyboard: "7",
    display: "7",
    value: 7
  },
  {
    type: "number",
    id: "eight",
    keyboard: "8",
    display: "8",
    value: 8
  },
  {
    type: "number",
    id: "nine",
    keyboard: "9",
    display: "9",
    value: 9
  },
  {
    type: "number",
    id: "zero",
    keyboard: "0",
    display: "0",
    value: 0
  },
  {
    type: "dot",
    id: "dot",
    keyboard: ".",
    display: ".",
    value: "."
  },
  {
    type: "plusMinus",
    id: "plusMinus",
    keyboard: "!",
    function: (target) => {
      plusMinus(target);
    }
  },
  {
    type: "other",
    id: "clear",
    keyboard: "Backspace",
    function: () => {
      clear();
    }
  },
  {
    type: "other",
    id: "all-clear",
    keyboard: "Delete",
    function: () => {
      reset("all");
    }
  },
  {
    type: "other",
    id: "euro",
    keyboard: "e",
    function: () => {
      reset("all");
      dialog.className = "show";
    }
  }
];

const formulaDisplay = document.getElementById("formulaDisplay");
const answerDisplay = document.getElementById("answer");
const dialog = document.getElementById("dialog");
const firstDisplayTitle = document.getElementById("firstDisplayTitle");
const secondDisplayTitle = document.getElementById("secondDisplayTitle");
const euroBtn = document.getElementById("euro");
const btnDisableAfterEqual = document.querySelectorAll(".disable-after-equal");
const btnDisableAfterEuro = document.querySelectorAll(".disable-after-euro");

const createInitialState = () => ({
  num: "",
  a: "",
  b: "",
  operator: "",
  symbol: "",
  formulaDisplayText: [],
  answerDisplayText: 0
});

let state = createInitialState();

// addEventListener
calculatorButtons.forEach((btn) => {
  const k = document.getElementById(btn.id);
  k.addEventListener("click", () => {
    handleInput(btn);
  });
});

document.addEventListener("keydown", (e) => {
  const k = calculatorButtons.find((btn) => btn.keyboard === e.key);
  k && handleInput(k);
});

const handleInput = function (btn) {
  //not allow second dot
  if (btn.type === "dot" && state.num.includes(".")) {
    return;
  }
  //if the "=" is at the end of the display, not allow to input anything after that except "other" and +/-
  // TODO: this part is not necessary if button is disabled?
  if (
    formulaDisplay.textContent.endsWith("=") &&
    btn.type !== "other" &&
    btn.type !== "plusMinus"
  ) {
    return;
  }

  if (btn.type === "number") {
    state.num = state.num + btn.display;
    updateFormulaDisplay(btn);
  } else if (btn.type === "plusMinus") {
    if (formulaDisplay.textContent.endsWith("=")) {
      btn.function("answer");
    } else {
      btn.function("formula");
    }
  } else if (btn.type === "dot") {
    //if numbers are not input yet, start with 0.
    if (state.num === "") {
      state.num = "0.";
      updateFormulaDisplay({ display: "0." });
      return;
    }
    state.num = state.num + btn.display;
    updateFormulaDisplay(btn);
  } else if (btn.type === "operator") {
    //do nothing if numbers are not input yet
    if (state.num === "") {
      return;
    }
    // not allowing to divide by 0
    if (Number(state.num) === 0 && btn.id === "divide") {
      answerDisplay.textContent = "you cannot divide by 0…";
      return;
    }
    // if a is not set yet, what you have in num is the number for a
    if (state.a === "") {
      state.a = state.num;
      state.num = ""; // clear num and get ready for b
      state.operator = btn;
      updateFormulaDisplay(btn);
      // if a is set already, what you have in num is the number for b
    } else if (state.a !== "") {
      state.b = state.num;
      state.num = "";
      // since it was not the equal key, calculate what you have and go on
      const answer = state.operator.function(Number(state.a), Number(state.b));
      state.a = answer.toString();
      updateAnswerDisplay(checkDecimal(answer));
      state.b = "";
      state.num = "";
      state.operator = btn;
      updateFormulaDisplay(btn);
    }
  } else if (btn.type === "equal") {
    if (state.num === "" || state.a === "") {
      return;
    }
    state.b = state.num;
    state.num = "";
    const answer = state.operator.function(Number(state.a), Number(state.b));
    updateFormulaDisplay(btn);
    updateAnswerDisplay(checkDecimal(answer));
    btnDisableAfterEqual.forEach((btn) => {
      btn.classList.add("disable");
      btn.disabled = true;
    });
  } else if (btn.type === "other") {
    btn.function();
    if (isEuroMode && btn.id === "clear") {
      const answer = Number(state.formulaDisplayText.join("")) * exchangeRate;
      updateAnswerDisplay(answer);
    }
  } else return;
};

const updateFormulaDisplay = function (btn) {
  state.formulaDisplayText.push(btn.display);
  formulaDisplay.textContent = state.formulaDisplayText.join("");
  if (isEuroMode) {
    const answer = Number(state.formulaDisplayText.join("")) * exchangeRate;
    updateAnswerDisplay(answer);
  }
};

const updateAnswerDisplay = function (answer) {
  state.answerDisplayText = answer;
  answerDisplay.textContent = state.answerDisplayText;
};

const reset = (target) => {
  state = createInitialState();
  formulaDisplay.textContent = "";
  answerDisplay.textContent = 0;

  if (target === "all") {
    firstDisplayTitle.textContent = "Formula:";
    secondDisplayTitle.textContent = "Answer:";
    euroBtn.textContent = "€→¥";
    isEuroMode = false;
    btnDisableAfterEqual.forEach((btn) => {
      btn.classList.remove("disable");
      btn.disabled = false;
    });
    btnDisableAfterEuro.forEach((btn) => {
      btn.classList.remove("disable");
      btn.disabled = false;
    });
  } else {
    return;
  }
};

const clear = () => {
  // if the last letter is "=" or formula is empty, clear all
  if (
    formulaDisplay.textContent.endsWith("=") ||
    state.formulaDisplayText.length === 0
  ) {
    reset(isEuroMode ? "euro" : "all");
    return;
  }

  //if num is NOT "", delete one letter
  if (state.num !== "") {
    let newNum = state.num.slice(0, -1);
    state.num = newNum;
    // when num is "", delete operator if it's not ""
    // also move a value to num value so that operator will work
  } else if (state.operator !== "") {
    state.operator = "";
    state.num = state.a;
    state.a = "";
    // when both num and operator is "" reset
  } else {
    reset(isEuroMode ? "euro" : "all");
    return;
  }

  // common
  state.formulaDisplayText.pop();
  const newStr = formulaDisplay.textContent.slice(0, -1);
  formulaDisplay.textContent = newStr;
};

// round answers with long decimals so that they don’t overflow the screen.
const checkDecimal = function (number) {
  if (Number.isInteger(Number(number))) {
    return number;
  } else {
    // toFixed will always return 10digits, so slice last 0
    let formattedNumber = Number.parseFloat(Number(number)).toFixed(6);
    while (formattedNumber.endsWith("0")) {
      formattedNumber = formattedNumber.slice(0, -1);
    }
    return formattedNumber;
  }
};

const plusMinus = function (target) {
  if (target === "formula") {
    if (!state.num) {
      state.formulaDisplayText.push("-");
      formulaDisplay.textContent = state.formulaDisplayText.join("");
      state.num = state.num + "-";
    } else if (state.num === "-") {
      //remove "-"
      state.formulaDisplayText.pop();
      const newStr = formulaDisplay.textContent.slice(0, -1);
      formulaDisplay.textContent = newStr;
      state.num = "";
    } else if (!state.num.startsWith("-")) {
      //when there is a number in num that is not negative, num x(-1)
      const numLength = state.num.length * -1;
      state.formulaDisplayText.splice(numLength, 0, "-");
      formulaDisplay.textContent = state.formulaDisplayText.join("");
      state.num = "-" + state.num;
    } else if (state.num.startsWith("-")) {
      const numLength = state.num.length * -1;
      state.formulaDisplayText.splice(numLength, 1);
      formulaDisplay.textContent = state.formulaDisplayText.join("");
      state.num = state.num.substring(1);
    } else {
      return;
    }
  } else if (target === "answer") {
    const answer = state.answerDisplayText * -1;
    updateAnswerDisplay(answer);
  }
};

let exchangeRate = 160;
let isEuroMode = false;
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  exchangeRate = document.getElementById("exchangeRate").value;
  if (!exchangeRate) {
    exchangeRate = 160;
  }
  firstDisplayTitle.textContent = "EUR";
  secondDisplayTitle.textContent = "JPY";
  euroBtn.textContent = "€1=¥" + exchangeRate;
  dialog.className = "hidden";
  isEuroMode = true;
  btnDisableAfterEuro.forEach((btn) => {
    btn.classList.add("disable");
    btn.disabled = true;
  });
  state = createInitialState();
  formulaDisplay.textContent = "";
  answerDisplay.textContent = 0;
});
