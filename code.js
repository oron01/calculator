// let firstOperand = null
// let operator = null
// let secondOperand = null
// let result = null
let operationStorageArray = [null,null,null,null,null] //the above condensed
let decimalMode = false
let currentPosition

let numButtonContainer = document.querySelector("#numButtonContainer") 
let operatorButtonContainer = document.querySelector("#operatorButtonContainer")

let errorSwitch = false

let calculator = {
    calculate(a,operator,b) {
        let operation = this.operations.find((element) => element.id == operator)
        let result = operation.function(a,b)
        return result
        
    },
    operations: [
        {id:"+",function: function (a,b){return +a + +b}},
        {id:"-",function: function (a,b){return +a - +b}},
        {id:"/",function: function (a,b){return +a / +b }},
        {id:"*",function: function (a,b){return +a * +b}},
        {id:"=",function: function (a,b){return calculator.calculate(operationStorageArray[0],operationStorageArray[1],operationStorageArray[2])}},
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
    let operatorArray = ["+","-","*","/","=","AC"]
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

let resetValues = () => {
    let a = operationStorageArray.map(() => null) 
    return a
}

let displayOperands = () => {
    if (errorSwitch == true) {errorSwitch = false
    return}
    let displayText = document.querySelector('#displayText')
    displayText.textContent = `FirstOP: ${operationStorageArray[0]} Operator: ${operationStorageArray[1]} SecondOp: ${operationStorageArray[2]} Result: ${operationStorageArray[3]}` 
}

let getInput = (e) => {
    alert(e.currentTarget.id)
    return (e.currentTarget.id)
}

let getCurrentPosition = () => {
    if (operationStorageArray[0] == null) {return "firstOp"}
    else if (operationStorageArray[1] == null) {return "firstOp"}
    else if (operationStorageArray[1] !== null) {return "secondOp"}
else {return "secondOp"}
}

let temporary0outcomeContainer = () => {
    if (operationStorageArray[2] == 0 && operationStorageArray[1] == "/") {
        displayText.textContent = "Nice try, Pal."
        errorSwitch = true
        operationStorageArray = resetValues()
    }
}

let temporaryCalculatorFunctionContainer = () => {
    operationStorageArray[3] = calculator.calculate(operationStorageArray[0],operationStorageArray[1],operationStorageArray[2])
}

let setNewInput = (input) => {
    currentPosition = getCurrentPosition()
    if (input == "AC") {
        return operationStorageArray = resetValues()}
    else if (input < 10 || input == ".") {//Input is a number
        if (getCurrentPosition() == "firstOp") {
            if (operationStorageArray[0] == null) {operationStorageArray[0] = input}
            else {operationStorageArray[0] += input}
        operationStorageArray[3] = null}
        else if (getCurrentPosition() == "secondOp") {
            if (operationStorageArray[2] == null) {operationStorageArray[2] = input}
            else {operationStorageArray[2] += input}
        }
        else {alert("try again")}
    } 
    else {//input is not a number
        if (operationStorageArray[0] !== null && input !== "=") {operationStorageArray[1] = input} 
        else if (operationStorageArray[2] !== null) {
            if (input == "=") {
                operationStorageArray[3] = calculator.calculate(operationStorageArray[0],operationStorageArray[1],operationStorageArray[2])
                operationStorageArray[0] = operationStorageArray[1] = operationStorageArray[2] = null
            }
            else {
            operationStorageArray[3] = calculator.calculate(operationStorageArray[0],operationStorageArray[1],operationStorageArray[2])
            operationStorageArray[0] = operationStorageArray[3]
            operationStorageArray[2],operationStorageArray[3] = null
            operationStorageArray[1] = input
            }
        }
        else if (operationStorageArray[3] !== null) {
            operationStorageArray[0] = operationStorageArray[3]
            operationStorageArray[1] = input
            operationStorageArray[2], operationStorageArray[3] = null
        }

    }

    // if (firstOperand == null && firstOperand < 10) {firstOperand = input}
    // else if (firstOperand !== null && operator == null) {
    //     if (!(input < 10)) {operator = input}
    // }
    // else if (secondOperand == null || secondOperand < 10) { 
    //     secondOperand = input
    //     result = calculator.calculate(firstOperand,operator,secondOperand)
    //     firstOperand, operator, secondOperand = null
    // }
    
    // else {alert("Try again")}
}

let operateCalculator = (e) => {
    setNewInput(getInput(e))
    displayOperands()
}

setButtonEventListeners = () => {
    let allButtons = document.querySelectorAll('.button')
    allButtons.forEach((button) => {button.addEventListener("click",operateCalculator)})
}


displayOperands()
addNumButton()
addOperatorButton()
setButtonEventListeners()
