function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 !== 0) {
        return Math.round((num1 / num2) * 100) / 100;
    }
}

function operate(num1, num2, operator) {
    let result = 0;

    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
        default:
            result = "Error";
    }

    return result;
}

function calculate(operator) {
    if (operator === "=" && num2 !== "" && operatorValue !== "") {
        result = operate(+num1, +num2, operatorValue);
        display.textContent += ` ${operator} ${result}`;
    }
}

function backSpace() {
    if (result === "") {
        if (num2 !== "") {
            num2 = num2.substring(0, num2.length - 1);
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
        } else if (display.textContent.charAt(display.textContent.length - 1) == " ") {
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
        } else if (operatorValue !== "") {
            operatorValue = "";
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
        } else if (num1 !== "" && !display.textContent.charAt(display.textContent.length - 1) == " ") {
            num1 = num1.substring(0, num1.length - 1);
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);

            if (num1 === "") {
                num1 = "0";
                display.textContent = num1;
            }
        }
    }
}

function inputDigits(digit) {
    if (result === "") {
        if (operatorValue === "") {
            if (digit === ".") {
                if (!(num1.includes("."))) {
                    num1 += digit;
                }
            } else {
                if (num1 === "" || num1 === "0") num1 = digit;
                else num1 += digit
            }
            display.textContent = num1;
        } else {
            if (digit === ".") {
                if (!(num2.includes("."))) {
                    num2 += digit;
                    display.textContent += digit;
                }
            } else {
                if (num2 === "" || num2 === "0") {
                    num2 = digit;
                } else {
                    num2 += digit;
                }

                if (display.textContent.charAt(display.textContent.length - 1) === "0") {
                    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
                }

                display.textContent += digit;
            }
        }
    }
}

function inputOperator(operator) {
    if (operator !== "=" && num2 === "" && num1 !== "") {

        if (operatorValue !== "") {
            display.textContent = display.textContent.substring(0, display.textContent.length - 2);
        }
        operatorValue = operator;
        display.textContent += " " + operatorValue + " ";

    } else if (operatorValue === "/" && num2 === "0") {
        display.textContent = "Cannot divide by zero!";
        operatorValue = "";
        num1 = "";
        num2 = "";

    } else if ((result !== "" && operator !== "=")) {
        num1 = `${result}`;
        num2 = "";
        result = "";
        operatorValue = operator;

        display.textContent = `${num1} ${operatorValue} `;
    }
}

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");

let num1 = "";
let operatorValue = "";
let num2 = "";
let result = "";

digits.forEach(digit => {
    digit.addEventListener("click", (e) => inputDigits(e.target.value))
})

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        inputOperator(e.target.value);
        calculate(e.target.value);
    })
})

clear.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    operatorValue = "";
    result = "";

    display.textContent = "0";
})

backspace.addEventListener("click", () => backSpace());

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "Backspace":
            backSpace();
            break;
        case "Enter":
        case "=":
            calculate("=");
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
            inputDigits(e.key);
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            inputOperator(e.key);
            break;
    }
});