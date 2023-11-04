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

let addKeyboardEventListeners = () => {
    let accepted = ["Del","-","+","/","*","Backspace",".","=","Enter"]
    document.body.addEventListener("keydown",(e) => {
        let keyPressed = e.key
        if (e.key == "Enter") {keyPressed = "="}
        else if (e.key == "Backspace") {keyPressed = "Del"}
        if (accepted.includes(keyPressed) || (keyPressed > -1 && keyPressed < 10)) {keyboardOperateCalculator(keyPressed)
        }    
    })
}

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
    let roundedResult = calculator.result
    if (calculator.result !== null) {roundedResult = Number(calculator.result)
    roundedResult = roundedResult.toFixed(4)}
    let content = () => roundedResult !== null ? roundedResult : calculator.secondOp !== null ? calculator.secondOp : calculator.operator !== null ? calculator.operator : calculator.firstOp !== null ? calculator.firstOp : "Go ahead..." 
    displayText.textContent = content() 
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
    if (string == null) {return false}
    if (string.includes(".")) {
        return true}
    else {
        return false}
}

let getIsALegalEntry = (input) => {
    if (input == "Del" || input == "AC") {return true}
    if (!(input < 10)) {
        if (calculator[getCurrentPosition()] !== null) {
        if (calculator[getCurrentPosition()][0] == "-" && getCurrentPosition()[1] == null && input !== ".")
        {return false}}
    }
    if (input == ".") {
        if (getContainsDot(calculator[getCurrentPosition()])) {return false}
        else {return true}
    }
    else if (input == "-") {
        if (calculator[getCurrentPosition[0]] == "-") {return false}
        else {return true}
    }
    else if (input == "=") {
        if (calculator.secondOp !== "-")
        {return true}
        else {return false}
    }
    return true
}

let setNewInput = (input) => {
    if (getIsALegalEntry(input)) {

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

    else if (input <10) { //input is a number
            if (calculator[getCurrentPosition()] == null) {calculator[getCurrentPosition()] = input}
            else if (calculator[getCurrentPosition()] !== "0" && calculator[getCurrentPosition()] !== "-0") {calculator[getCurrentPosition()] += input}
            calculator.result = null

    }

    else if (input == "-" || input == ".") {
        if (input == ".") {
            if (calculator[getCurrentPosition()] == "-") {
                calculator[getCurrentPosition()] += "0."
            }
            else if (calculator[getCurrentPosition()] == null) {
                calculator[getCurrentPosition()] = "0."
                if (calculator.result !== null) {calculator.result = null}
            }
            else {calculator[getCurrentPosition()] += "."}
        }

        else if (input == "-") {
            if (calculator.result !== null) {
                calculator.firstOp = calculator.result
                calculator.operator = input
                calculator.result = null
            } 

            else if (calculator.secondOp !== null) {
                calculator.result = calculator.calculate(calculator.firstOp,calculator.operator,calculator.secondOp)
                calculator.firstOp = calculator.result
                calculator.operator = input
                calculator.result = calculator.secondOp = null                
            }

            else if (calculator.firstOp !== null && calculator.firstOp !== "-" && calculator.operator == null) {
                calculator.operator = input
            }
            else if (calculator[getCurrentPosition()] == null) {calculator[getCurrentPosition()] = "-"}

        }

    }
    else { //input is an operator
            if (input == "=") {
                if (calculator.operator == "/" && calculator.secondOp == "0" ) {
                displayText.textContent = "Nice Try Pal"
                errorSwitch = true
                resetValues() 
                }
                else{
                calculator.result = calculator.calculate(calculator.firstOp,calculator.operator,calculator.secondOp)
                calculator.firstOp = calculator.secondOp = calculator.operator = null}
            }
            else if (calculator.firstOp == null && calculator.result !== null) {
                    calculator.firstOp = calculator.result
                    calculator.result = calculator.secondOp = null
                    calculator.operator = input
            }
            else if (calculator.operator == null) {
                calculator.operator = input
            }
            else if (calculator.secondOp !== null) {
                if (calculator.operator == "/" && calculator.secondOp == "0" ) {
                    displayText.textContent = "Nice Try Pal"
                    errorSwitch = true
                    resetValues() 
                    }
                    else{
                calculator.result = calculator.calculate(calculator.firstOp,calculator.operator,calculator.secondOp)
                calculator.firstOp = calculator.result
                calculator.secondOp = calculator.operation = calculator.result = null
                    }
            }
        }
}
}

let operateCalculator = (e) => {
    setNewInput(getInput(e))
    displayOperands()
}

let keyboardOperateCalculator = (input) => {
    setNewInput(input)
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
addKeyboardEventListeners()

