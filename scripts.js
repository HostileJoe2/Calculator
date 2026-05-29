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

function resetAll() {
    num1 = null;
    num2 = null;
    operator = null;
    result = null;
    display.textContent = "0"
}

function updateDisplay() {
  if (result != null) {
    display.textContent = result;
  } else if (num2 != null) {
    display.textContent = `${num1}${operator}${num2}`;
  } else if (operator != null) {
    display.textContent = `${num1}${operator}`;
  } else if (num1 != null) {
    display.textContent = num1;
  } else {
    display.textContent = "0";
  }
}

buttons.forEach(button => {

    button.addEventListener("click", (e) => {

        const value = e.target.textContent

        switch(value) {
            case "+":
            case "-":
            case "×":
            case "÷":
                if (num1 != null && num2 == null) {
                    operator = value;
                } else if (num1 != null && num2 != null && result == null) {
                    result = operations[operator](num1, num2);
                    num1 = result;
                    num2 = null;
                    result = null;
                    operator = value;
                } else if (num1 != null && num2 != null && result != null) {
                    num1 = result;
                    num2 = null;
                    operator = value;
                    result = null;
                }
                updateDisplay();
                break;

            case "%":
                if (num1 != null && num2 == null) {
                    num1 = String(Number(num1) / 100);
                } else if (num1 != null && num2 != null) {
                    num2 = String(Number(num2) / 100);
                }
                updateDisplay();
                break;

            case "=":
                if (result != null) {
                    num1 = result;
                    result = operations[operator](num1, num2);
                } else {
                    result = operations[operator](num1, num2);
                }
                updateDisplay();
                break;

            case "AC":
                resetAll()
                break;

            case "⌫":
                if (result != null) {
                    result = String(result).slice(0, -1);
                } else if (num2 != null) {
                    num2 = num2.slice(0, -1);
                } else if (operator != null) {
                    operator = null;
                } else if (num1 != null) {
                    num1 = num1.slice(0, -1);
                }
                updateDisplay();
                break;

            case "±":
                if (num2 != null) {
                    num2 = String(Number(num2) * -1);
                } else if (num1 != null) {
                    num1 = String(Number(num1) * -1);
                }
                updateDisplay();
                break;
            
            default:
                if (result != null) {
                    num1 = value;
                    num2 = null;
                    operator = null;
                    result = null;
                }else if (num1 == null) {
                    num1 = value === "." ? "0." : value;
                }else if (operator == null) {
                    if (value === "." && num1.includes(".")) break;
                    num1 += value
                }else if (num2 == null) {
                    num2 = value
                }else {
                    if (value === "." && num2.includes(".")) break;
                    num2 += value
                }
                updateDisplay();
        }
        console.table(num1, num2, operator, result);
        console.log(e.target.textContent)
    })
})

document.addEventListener("keydown", (e) => {
    const keyMap = {
        "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
        "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
        "+": "+", "-": "-", "*": "×", "/": "÷", ".": ".",
        "Enter": "=", "Backspace": "⌫", "Escape": "AC", "%": "%"
    }

    const mappedValue = keyMap[e.key];
    if (mappedValue) {
        const button = Array.from(buttons).find(btn => btn.textContent === mappedValue);
        if (button) {
            button.click();
        }
    }   
    
})