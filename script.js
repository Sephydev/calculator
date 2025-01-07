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
    digit.addEventListener("click", (e) => {

        // Stop user to write number after result (ex: 1 + 1 = 15'553')
        if (result === "") {

            // User can enter first number before choosing operator
            if (operatorValue === "") {
                if (e.target.value === ".") {
                    if (!(num1.includes("."))) {
                        num1 += e.target.value;
                    }
                } else {
                    if (num1 === "" || num1 === "0") num1 = e.target.value;
                    else num1 += e.target.value
                }

                display.textContent = num1;

                // User can enter second number after choosing operator
            } else {
                if (e.target.value === ".") {
                    if (!(num2.includes("."))) {
                        num2 += e.target.value;
                        display.textContent += e.target.value;
                    }
                } else {
                    if (num2 === "" || num2 === "0") {
                        num2 = e.target.value;
                    } else {
                        num2 += e.target.value;
                    }

                    if (display.textContent.charAt(display.textContent.length - 1) === "0") {
                        display.textContent = display.textContent.substring(0, display.textContent.length - 1);
                    }

                    display.textContent += e.target.value;
                }


            }
        }
    })
})

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {

        // User can choose operator (but not "=") if num1 contains a value and num2 doesn't contain a value
        if (e.target.value !== "=" && num2 === "" && num1 !== "") {

            // User can modify the operator if he didn't enter a digit for num2
            if (operatorValue !== "") {
                display.textContent = display.textContent.substring(0, display.textContent.length - 2);
            }
            operatorValue = e.target.value;
            display.textContent += " " + operatorValue + " ";

            // Stop the "divide by zero" error.
        } else if (operatorValue === "/" && num2 === "0") {
            display.textContent = "Cannot divide by zero!";
            operatorValue = "";
            num1 = "";
            num2 = "";

            // User can chain operations with result being num1
        } else if ((result !== "" && e.target.value !== "=")) {
            num1 = `${result}`;
            num2 = "";
            result = "";
            operatorValue = e.target.value;

            display.textContent = `${num1} ${operatorValue} `;

            // The operation is calculated
        } else if (e.target.value === "=" && num2 !== "" && operatorValue !== "") {
            result = operate(+num1, +num2, operatorValue);
            display.textContent += ` ${e.target.value} ${result}`;
        }
    })
})

clear.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    operatorValue = "";
    result = "";

    display.textContent = "0";
})

backspace.addEventListener("click", () => {
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
})