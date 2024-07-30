let num1 = 0;
let num2 = 0;
let operator = "";
let result = 0;

const display = document.getElementById("display");
const history = document.getElementById("history");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const allclear = document.getElementById("allclear");
const decimal = document.getElementById("decimal");
const negative = document.getElementById("negative");

function appendDigit(digit) {
    if (display.textContent === "0") {
        display.textContent = digit;
    } else {
        display.textContent += digit;
    }
}

function updateNumbers() {
    if (operator === "") {
        num1 = parseFloat(display.textContent);
        history.textContent = display.textContent;
    } else {
        num2 = parseFloat(display.textContent);
        history.textContent = `${num1} ${operator} ${display.textContent}`;
    }
}

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        appendDigit(digit.textContent);
        updateNumbers();
    });
});

operators.forEach((operatorElement) => {
    operatorElement.addEventListener("click", () => {
        if (num1 !== 0 && operator !== "" && display.textContent !== "") {
            operateDisplay();
        }
        operator = operatorElement.textContent;
        history.textContent += ` ${operator} `;
        toggleOperatorButtons(true);

        if (display.textContent !== "") {
            num1 = parseFloat(display.textContent);
            display.textContent = "";
        }
    });
});

function toggleOperatorButtons(disabled) {
    operators.forEach((operatorElement) => {
        operatorElement.disabled = disabled;
    });
}

function operate(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (operator === "+") result = num1 + num2;
    else if (operator === "-") result = num1 - num2;
    else if (operator === "*") result = num1 * num2;
    else if (operator === "/") result = num1 / num2;
    else if (operator === "%") result = num1 % num2;

    if (result.toString().includes(".")) return result.toFixed(2);

    if (result === Infinity) return "Error";

    if (result === 0) return "0";

    return result;
}

function operateDisplay() {
    if (operator !== "") {
        result = operate(num1, num2, operator);
        display.textContent = result;
        clearOperators();
        toggleOperatorButtons(false);
    }
}

equals.addEventListener("click", () => {
    operateDisplay();
    history.textContent = "";
});

function clearOperators() {
    num1 = 0;
    num2 = 0;
    operator = "";
}

clear.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1);
    history.textContent = history.textContent.slice(0, -1);

    // If there isn't any more operators after pressing backspace, re-enable the operator buttons
    if (history.textContent.replace(/[^%*/+-]/g, "").length === 1) {
        toggleOperatorButtons(false);
    }
});

allclear.addEventListener("click", () => {
    display.textContent = "0";
    history.textContent = "0";
    num1 = 0;
    num2 = 0;
    operator = "";
    result = 0;
    toggleOperatorButtons(false);
});

decimal.addEventListener("click", () => {
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
});

negative.addEventListener("click", () => {
    const newValue = parseFloat(display.textContent) * -1;
    display.textContent = newValue.toString();

    if (operator === "") {
        num1 = newValue;
    } else {
        num2 = newValue;
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
        appendDigit(e.key);
        updateNumbers();
    }
});