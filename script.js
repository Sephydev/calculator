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
const num2 = 5;

digits.forEach(digit => {
    digit.addEventListener("click", (e) => {
        if (num1 === 0) {
            num1 = e.target.value;
        } else {
            num1 += e.target.value;
        }
        display.textContent = num1;
    })
})

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        if (e.target.value !== "=") {
            if (operatorValue !== undefined) {
                console.log("test")
                display.textContent = display.textContent.substring(0, display.textContent.length - 1);
            }
            console.log(operatorValue);
            operatorValue = e.target.value;
            display.textContent += " " + operatorValue;
        }
    })
})