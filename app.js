class Calculator {
  constructor(previousOperandDisplay, currentOperandDisplay) {
    this.previousOperandDisplay = previousOperandDisplay;
    this.currentOperandDisplay = currentOperandDisplay;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (this.currentOperand.length > 12 || (number === "." && this.currentOperand.includes(".")))
      return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  makeMinus() {
    this.currentOperand = this.currentOperand * -1;
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    if (this.previousOperand == "") return;

    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    switch (this.operation) {
      case "÷":
      case "/":
        if (current === 0) {
          alert("You can't divide by 0!");
          this.clear();
          break;
        }
        result = prev / current;
        break;
      case "x":
      case "*":
        result = prev * current;
        break;
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
    }
    this.currentOperand = this.roundResult(result);
    this.operation = undefined;
    this.previousOperand = "";
  }

  roundResult(number) {
    if (number === "") return "";
    return Math.round(number * 1000) / 1000;

    return number;
  }

  getDisplayNumber(number) {
    const integerDigits = parseFloat(number.toString().split(".")[0]);
    const decimalDigits = number.toString().split(".")[1];
    let integerDisplay = isNaN(integerDigits)
      ? ""
      : integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });

    return decimalDigits != null ? `${integerDisplay}.${decimalDigits}` : integerDisplay;
  }

  updateDisplay() {
    this.currentOperandDisplay.innerText = this.getDisplayNumber(this.currentOperand);

    this.previousOperandDisplay.innerText =
      this.operation != null
        ? `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        : "";
  }
}

function main() {
  const numberButtons = document.querySelectorAll("[data-number]");
  const operationButtons = document.querySelectorAll("[data-operation]");
  const allClearButton = document.querySelector("[data-all-clear]");
  const deleteButton = document.querySelector("[data-delete]");
  const equalsButton = document.querySelector("[data-equals]");
  const minusButton = document.querySelector("[data-minus]");
  const previousOperandDisplay = document.querySelector("[data-previous-operand]");
  const currentOperandDisplay = document.querySelector("[data-current-operand]");

  const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay);

  numberButtons.forEach(button => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });

  operationButtons.forEach(button => {
    button.addEventListener("click", () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });

  allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
  });

  deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
  });

  equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
    calculator.clear();
  });

  minusButton.addEventListener("click", () => {
    calculator.makeMinus();
    calculator.updateDisplay();
  });

  window.addEventListener("keydown", e => {
    if ((e.key >= 0 && e.key <= 9) || e.key === ".") calculator.appendNumber(e.key);
    if (e.key === "Backspace") calculator.delete();
    if (e.key === "Escape") calculator.clear();
    if (e.key === "=" || e.key === "Enter") calculator.compute();
    if (e.key === "/" || e.key === "*" || e.key === "+" || e.key === "-")
      calculator.chooseOperation(e.key);

    calculator.updateDisplay();
  });
}

main();
