const buttons = document.querySelectorAll("button")
const display = document.querySelector(".displayText")
let num1
let num2
let operator
let input
let result

buttons.forEach(button => {

    button.addEventListener("click", (e) => {

        const value = e.target.textContent

        switch(value) {
            case "+":
            case "-":
            case "×":
            case "÷":
                operator = value;
                num1 = display.textContent;
                display.textContent = "";
                break;

            case "%":
                display.textContent = Number(display.textContent) / 100
                break;

            case "=":
                num2 = display.textContent;
                display.textContent = operations[operator](num1, num2);
                break;

            case "AC":
                num1 = null;
                num2 = null;
                operator = null;
                display.textContent = ""
                break;

            case "⌫":
                let newNumber = display.textContent.slice(0,-1)
                display.textContent = newNumber
                break;

            case "±":
                display.textContent = Number(display.textContent) * Number(-1)
                break;
            
            default:
                display.textContent += value;
        }
        console.log(num1, num2, operator)
        
    })
})     

const operations = {
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => Number(a) - Number(b),
    "×": (a, b) => Number(a) * Number(b),
    "÷": (a, b) => Number(a) / Number(b),
}