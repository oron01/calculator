let firstOperand
let secondOperand

let numButtonContainer = document.querySelector("#numButtonContainer") 
let operatorButtonContainer = document.querySelector("#operatorButtonContainer")

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
    b.className += "button number"
}
}

let addOperatorButton = () => {
    let operatorArray = ["+","-","*","/"]
    for (i = 0; i < operatorArray.length; i++) 
    {let b = document.createElement("div")
    operatorButtonContainer.appendChild(b)
    let c = document.createElement("h1")
    c.textContent = operatorArray[i]
    b.id = c.textContent
    b.appendChild(c)
    b.className = "button operator"
}
}

let displayOperands = () => {
    let displayText = document.querySelector('#displayText')
    displayText.textContent = `FirstOP: ${firstOperand} SecondOp: ${secondOperand}` 
}

getClickedValue = (e) => {
    alert(e.target.id)
}

setButtonEventListeners = () => {
    let allButtons = document.querySelectorAll('.button')
    allButtons.forEach((button) => {button.addEventListener("click",getClickedValue)})
}


displayOperands()
addNumButton()
setButtonEventListeners()
addOperatorButton()