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
        return num1 / num2;
    } else {
        return "Error";
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

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector("#display");

let num1 = 0;
let operatorValue;
let num2;
let result;

digits.forEach(digit => {
    digit.addEventListener("click", (e) => {

        // Code works only when result is not calculated
        if (result === undefined) {

            // Code for choosing first number
            if (operatorValue === undefined) {
                if (num1 === 0) {
                    num1 = e.target.value;
                } else {
                    num1 += e.target.value;
                }
                display.textContent = num1;

                //Code for choosing second number
            } else {
                if (num2 === undefined) {
                    num2 = e.target.value;
                } else {
                    num2 += e.target.value;
                }
                display.textContent += " " + num2;
            }
        }
    })
})

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {

        // Code for selecting operator, work if num2 is not been chosen and operator is not "="
        if (e.target.value !== "=" && num2 === undefined) {

            // Code for replacing operator in case of wrong operator chosen
            if (operatorValue !== undefined) {
                display.textContent = display.textContent.substring(0, display.textContent.length - 1);
            }
            console.log(operatorValue);
            operatorValue = e.target.value;
            display.textContent += " " + operatorValue;

            // Code for calculating result.
        } else if (e.target.value === "=" && num2 !== undefined && operatorValue !== undefined) {
            result = operate(+num1, +num2, operatorValue);
            display.textContent += ` ${e.target.value} ${result}`;
        }
    })
})