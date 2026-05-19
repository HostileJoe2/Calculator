const buttons = document.querySelectorAll("button")
const display = document.querySelector(".displayText")
let num1
let num2
let operator
let result

const operations = {
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => Number(a) - Number(b),
    "×": (a, b) => Number(a) * Number(b),
    "÷": (a, b) => Number(a) / Number(b),
}

buttons.forEach(button => {

    button.addEventListener("click", (e) => {

        const value = e.target.textContent

        switch(value) {
            case "+":
            case "-":
            case "×":
            case "÷":
                if (num2 != undefined && result == undefined) {
                    display.textContent = operations[operator](num1, num2);
                }
                if (num1 != undefined && num2 == undefined) {
                    operator = value;
                    let newNumber = display.textContent.slice(0,-1);
                    display.textContent = newNumber;
                }
                operator = value;
                num1 = Number(display.textContent);
                display.textContent += value;
                break;

            case "%":
                display.textContent = Number(display.textContent) / 100;
                break;

            case "=":
                if (result != undefined && result != NaN) {
                    num2 = result
                    result = operations[operator](num1, num2);
                    display.textContent = result; 
                } else {
                const parts = display.textContent.split(operator);
                num1 = Number(parts[0]);
                num2 = Number(parts[1]);
                result = operations[operator](num1, num2);
                display.textContent = result;
                }
                break;

            case "AC":
                num1 = null;
                num2 = null;
                operator = null;
                result = null;
                display.textContent = "0"
                break;

            case "⌫":
                let newNumber = display.textContent.slice(0,-1);
                display.textContent = newNumber;
                break;

            case "±":
                display.textContent = Number(display.textContent) * Number(-1);
                break;
            
            default:
                if (num1 != undefined) {
                    num2 = Number(e.target.textContent)
                };
                if (display.textContent === "0" || display.textContent == result) {
                    display.textContent = value  // replace the lone zero
                } else {
                    display.textContent += value // otherwise append
                };
        }

        console.table(num1, num2, operator, result);
        console.log(e.target.textContent)
    })
})