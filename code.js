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
        {id:"=",function: function (a,b){return calculator.calculate(calculator.firstOp,calculator.operator,calculator.secondOp)}},
    ],
    firstOp : null,
    operator : null,
    secondOp : null,
    result:null


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
    let operatorArray = ["+","-","*","/","=","AC","Del"]
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
    let a = calculator
    calculator.firstOp = calculator.operator = calculator.secondOp = calculator.result = null 
    return a
}

let displayOperands = () => {
    if (errorSwitch == true) {errorSwitch = false
    return}
    let displayText = document.querySelector('#displayText')
    displayText.textContent = `FirstOP: ${calculator.firstOp} Operator: ${calculator.operator} SecondOp: ${calculator.secondOp} Result: ${calculator.result}` 
}

let getInput = (e) => {
    alert(e.currentTarget.id)
    return (e.currentTarget.id)
}

let getCurrentPosition = () => {
    if (calculator.firstOp == null || calculator.firstOp == "-") {return "firstOp"}
    else if (calculator.operator == null) {return "firstOp"}
    else if (calculator.operator !== null) {return "secondOp"}
    else {return "secondOp"}
}

let temporary0outcomeContainer = () => {
    if (calculator.secondOp == 0 && calculator.operator == "/") {
        displayText.textContent = "Nice try, Pal."
        errorSwitch = true
        calculator = resetValues() // not necessary cuz obj right?
    }
}

let temporaryCalculatorFunctionContainer = () => {
    calculator.result = calculator.calculate(calculator.firstOp,calculator.operator,calculator.secondOp)
}

let getContainsDot = (string) => {
    if (string == null) {return  false}
    if (string.includes(".")) {
        return true}
    else {
        return false}
}

let getIsALegalEntry = (input) => {
    if (!(input < 10)) {
        if (calculator[getCurrentPosition()] !== null) {
        if (calculator[getCurrentPosition()][0] == "-" && input !== ".")
        {return false}}
    }
    if (input == "-") {
        if (calculator[getCurrentPosition()] === null) {return true}
        else {return false}
    }
    else if (input == ".") {
        if (getContainsDot(calculator[getCurrentPosition()])) {return false}
        else {return true}
    }
    else if (input == "=") {
        if (calculator.firstOp && calculator.secondOp && calculator.operator && calculator.secondOp !== "-")
        {return true}
        else {return false}
    }
    else return true
}

let setNewInput = (input) => {
    if (input == "AC") {resetValues()}
    else if (input == "Del") {
        if (calculator.secondOp !== null) {
            calculator.secondOp = calculator.secondOp.slice(0,-1)
            if (calculator.secondOp == "") {calculator.secondOp = null}
        }

        else if (calculator.operator !== null) {
            calculator.operator = null
        }

        else if (calculator.firstOp !== null) {
            calculator.firstOp = calculator.firstOp.slice(0,-1)
            if (calculator.firstOp == "") {calculator.firstOp = null}
        }

    }
    else if (input <10 || input == "." || input == "-") { //input is a number or (./-)
        // if (input == "-" && calculator.result !== null) {
            
        // }
        if (getIsALegalEntry(input)) {
            if (input == ".") {
                if (calculator[getCurrentPosition()] == "-") {
                    calculator[getCurrentPosition()] += "0."
                }
                else if (calculator.result !== null || calculator[getCurrentPosition() == null]) {
                    calculator[getCurrentPosition()] = "0."
                    calculator.result = null
                }
                else {calculator[getCurrentPosition()] += "."}
            }
            else if (calculator[getCurrentPosition()] == null) {calculator[getCurrentPosition()] = input}
            else {calculator[getCurrentPosition()] += input}
        }  
        else if (input == "-") {
            if (calculator.result !== null) {
                calculator.firstOp = calculator.result
                calculator.operator = input
            }
            else if (calculator.secondOp !== null && calculator.secondOp !== "-") {
                calculator.result = calculator.calculate(calculator.firstOp,calculator.operator,calculator.secondOp)
                calculator.firstOp = calculator.result
                calculator.operator = input
                calculator.result = calculator.secondOp = null                
            }
            else if (calculator.firstOp !== null && calculator.firstOp !== "-") {
                calculator.operator = input

            }

        }
    }
    else { //input is an operator
        if (getIsALegalEntry) {
            if (input == "=") {
                calculator.result = calculator.calculate(calculator.firstOp,calculator.operator,calculator.secondOp)
                calculator.firstOp = calculator.secondOp = calculator.operator = null
                return
            }
            if (calculator.firstOp == null) {
                if (calculator.result !== null) {
                    calculator.firstOp = calculator.result
                    calculator.result = calculator.secondOp = null
                    calculator.operator = input
                }
            }
            else if (calculator.operator == null) {
                calculator.operator = input
            }
            else if (calculator.secondOp !== null) {
                calculator.result = calculator.calculate(calculator.firstOp,calculator.operator,calculator.secondOp)
                calculator.firstOp = calculator.result
                calculator.secondOp = calculator.operation = calculator.result = null
            }
        }

    }
}

let setNewInputDefunct = (input) => {
    currentPosition = getCurrentPosition()
    if (input == "AC") {
        return operationStorageArray = resetValues()}
    else if (input < 10 || (input == "." && !getContainsDot(calculator.firstOp)) || input == "-" && (getCurrentPosition() == "firstOp" || getCurrentPosition() == "secondOp")) {//Input is a number
        if (getCurrentPosition() == "firstOp") {
            if (calculator.firstOp == null && input !== ".") {calculator.firstOp = input}
            else if (calculator.firstOp == "-" && input !== ".") {calculator.firstOp += input}
            else if ((calculator.firstOp == null || calculator.firstOp == "-") && input == ".") {calculator.firstOp += "0."}
            else {calculator.firstOp += input}
        calculator.result = null}
        else if (getCurrentPosition() == "secondOp") {
            if (calculator.secondOp == null && input !== ".") {calculator.secondOp = input}
            else if (calculator.firstOp == "-" && input !== ".") {calculator.firstOp += input}
            else if ((calculator.secondOp == null || calculator.secondOp == "-") && input == ".") {calculator.secondOp += "0."}
            else {calculator.secondOp += input}
        }
        else {alert("try again")}
    } 
    else {//input is not a number
        if (calculator.firstOp !== null && input !== "=" && calculator.secondOp == null && input !== ".") {calculator.operator = input} 
        else if (calculator.secondOp !== null) {
            if (input == "=") {
                calculator.result = calculator.calculate(calculator.firstOp,calculator.operator,calculator.secondOp)
                calculator.firstOp = calculator.operator = calculator.secondOp = null
            }
            else {
            calculator.result = calculator.calculate(calculator.firstOp,calculator.operator,calculator.secondOp)
            calculator.firstOp = calculator.result
            calculator.secondOp = calculator.result = null
            calculator.operator = input
            }
        }
        else if (calculator.result !== null) {
            calculator.firstOp = calculator.result
            calculator.operator = input
            calculator.secondOp, calculator.result = null
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
