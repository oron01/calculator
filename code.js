let firstOperand = null
let operator = null
let secondOperand = null
let result = null

let numButtonContainer = document.querySelector("#numButtonContainer") 
let operatorButtonContainer = document.querySelector("#operatorButtonContainer")

let calculator = {
    calculate(a,operator,b) {
        let operation = this.operations.find((element) => element.id == operator)
        console.log(operation)
        let result = operation.function(a,b)
        return result
        
    },
    operations: [
        {id:"+",function: function (a,b){return +a + +b}},
        {id:"-",function: function (a,b){return +a - +b}},
        {id:"/",function: function (a,b){return +a / +b }},
        {id:"*",function: function (a,b){return +a * +b}},
        
    ],

}

let addNumButton = () => {
    for (i = 9; i > -2; i--) 
    {
    if (i == -1) {i = "."}
    let b = document.createElement("div")
    numButtonContainer.appendChild(b)
    let c = document.createElement("h1")
    c.textContent = i
    b.id = c.textContent
    b.appendChild(c)
    b.className += "button operand"
}
}

let addOperatorButton = () => {
    let operatorArray = ["+","-","*","/"]
    let operatorNameArray = ["add","subtract","multiply","divide"]
    for (i = 0; i < operatorArray.length; i++) 
    {let b = document.createElement("div")
    operatorButtonContainer.appendChild(b)
    let c = document.createElement("h1")
    c.textContent = operatorArray[i]
    b.id = c.textContent
    // b.id = operatorNameArray[i]
    b.appendChild(c)
    b.className += "button operator"
}
}

let displayOperands = () => {
    let displayText = document.querySelector('#displayText')
    displayText.textContent = `FirstOP: ${firstOperand} SecondOp: ${secondOperand}` 
}

getClickedValue = (e) => {
    alert(e.currentTarget.id)
}

setNewInput = (input) => {
    if (firstOperand == null && firstOperand < 10) {firstOperand = input}
    else if (firstOperand !== null && operator == null) {
        if (!(input < 10)) {operator = input}
    }
    else if (secondOperand == null || secondOperand < 10) { 
        secondOperand = input
        result = calculator.calculate(firstOperand,operator,secondOperand)
        firstOperand, operator, secondOperand = null
    }
    
    else {alert("Try again")}
}

setButtonEventListeners = () => {
    let allButtons = document.querySelectorAll('.button')
    allButtons.forEach((button) => {button.addEventListener("click",getClickedValue)})
}


displayOperands()
addNumButton()
addOperatorButton()
setButtonEventListeners()
