let previousOperand = {
    name: 'prev',
    num: '',
    status: true,
}
let currentOperand = {
    name: 'current',
    num: '',
    status: false,
}

const id = [previousOperand, currentOperand];

let op = '';
let isOperatorPressed = false;
let previousResult = '';

const isOperatorPressedDisplay = document.querySelector('.isOperatorPressed');
const displayOutput = document.querySelector('.displayContainer');

const nodeListOfNumberButtons = document.querySelectorAll('.numberButton'); //this is a nodelist
const numberButtons = Array.from(nodeListOfNumberButtons); //makes nodelist into an array
const zeroButton = document.querySelector('.zeroButton');

const nodelistOfOperatorButtons = document.querySelectorAll('.operatorButton');
const operatorButtons = Array.from(nodelistOfOperatorButtons);
const powerBtn = document.querySelector('.powerBtn');

const clearBtn = document.querySelector('.clearBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const equalButton = document.querySelector('.equalButton');

numberButtons.map(button => {
    button.addEventListener('click', () => {
        let number = button.textContent;
          
        if (displayOutput.textContent == previousResult || previousResult == NaN) { // this if statement ensures that if a number is pressed after a final result, the screen changes to that number instead of appending to the back of finalResult 
            displayOutput.innerText = '';
            previousOperand['num'] = '';
            previousOperand['status'] = true,
            currentOperand['status'] = false;
        } 

        if (!isOperatorPressed) {
            if (currentOperand['status'] == true) {
                currentOperand['num'] += number;
                displayOutput.innerText += number;
            } else {
                previousOperand['num'] += number;
                displayOutput.innerText += number;
            }
        }
        
        if (isOperatorPressed) {
            displayOutput.innerText = '';
            currentOperand['num'] += number;
            currentOperand['status'] = true;
            displayOutput.innerText += number;
            isOperatorPressed = false;
            isOperatorPressedDisplay.innerText = isOperatorPressed;
        } 
        checkStatus(id)
    })
})

zeroButton.addEventListener('click', () => {
        let number = zeroButton.textContent;
        if (displayOutput.textContent == previousResult || previousResult == NaN) { // this if statement ensures that if a number is pressed after a final result, the screen changes to that number instead of appending to the back of finalResult 
            displayOutput.innerText = '';
            previousOperand['num'] = previousResult;
            previousOperand['status'] = false,
            currentOperand['status'] = true;
        } 

        if (!isOperatorPressed) {
            if (currentOperand['status'] == true) {
                currentOperand['num'] += number;
                displayOutput.innerText += number;
            } else {
                previousOperand['num'] += number;
                displayOutput.innerText += number;
            }
        }
        
        if (isOperatorPressed) {
            displayOutput.innerText = '';
            currentOperand['num'] += number;
            currentOperand['status'] = true;
            displayOutput.innerText += number;
            isOperatorPressed = false;
            isOperatorPressedDisplay.innerText = isOperatorPressed;
        } 
        checkStatus(id)
})

const decimalButton = document.querySelector('.decimalButton');

decimalButton.addEventListener('click', () => {
    let decimal = decimalButton.textContent;

    if (decimalLimit(id)) {
       return;
    }

    if (displayOutput.textContent == previousResult || previousResult == NaN) {
        displayOutput.innerText = '';
        previousOperand['num'] = previousResult;
        previousOperand['status'] = false;
        currentOperand['status'] = true;
    }

    if (!isOperatorPressed) {
        if (currentOperand['status'] == true) {
            if (!currentOperand['num'].includes('.')) { // Check if the current operand already has a decimal
                currentOperand['num'] += decimal;
                displayOutput.innerText += decimal;
            }
        } else {
            if (!previousOperand['num'].includes('.')) { // Check if the previous operand already has a decimal
                previousOperand['num'] += decimal;
                displayOutput.innerText += decimal;
            }
        }
    }

    if (isOperatorPressed) {
        displayOutput.innerText = '';
        if (!currentOperand['num'].includes('.')) {
            currentOperand['num'] += decimal;
            currentOperand['status'] = true;
            displayOutput.innerText += decimal;
        }
        isOperatorPressed = false;
        isOperatorPressedDisplay.innerText = isOperatorPressed;
    }
    checkStatus(id);
});


operatorButtons.map(button => {
    button.addEventListener('click', () => {
        previousOperand['status'] = false;
        let operator = button.textContent;
        console.log(`op is ${operator}`);
        if (op == '') {
            op = operator;
            displayOutput.innerText += op;
            isOperatorPressed = true;
            isOperatorPressedDisplay.innerText = isOperatorPressed;
        } else {
            return;
        }
    })
})

clearBtn.addEventListener('click', () => {
    displayOutput.innerText = '';
    previousOperand['num'] = '';
    currentOperand['num'] = '';
    isOperatorPressed = false;
    isOperatorPressedDisplay.innerText = isOperatorPressed;
})

deleteBtn.addEventListener('click', () => {
    let currentItemsOnDisplay = displayOutput.innerText;
    let poppedItem = currentItemsOnDisplay.slice(-1);
    console.log(poppedItem);
    currentItemsOnDisplay = currentItemsOnDisplay.slice(0,-1);
    displayOutput.innerText = currentItemsOnDisplay;
    isOperatorPressed = false;
    isOperatorPressedDisplay.innerText = isOperatorPressed;
    if (poppedItem == op) {
        op = '';
    }
    if (previousOperand['status'] == true) {
        let a = previousOperand['num']
        a = a.toString();
        a = a.slice(0,-1);
        previousOperand['num'] = a;
    }
    if (currentOperand['status'] == true) {
        let b = currentOperand['num'];
        b = b.toString();
        b  = b.slice(0,-1);
        currentOperand['num'] = b;
    }
    checkStatus(id)
})

equalButton.addEventListener('click', onEquals);

function operate(a, op, b) {
    a = +a;
    b = +b;

    switch(op) {
        case '+':
            return a + b;
            break;
        case '-':
            return a - b;
            break;
        case '*':
            return a * b;
            break;
        case '/':
            return parseFloat((a/b).toFixed(5));
            break;
        case '^':
            return a ** b;
            break;
        default:
            return displayOutput.textContent;
    }
}

function onEquals() {
    let result = operate(previousOperand['num'], op, currentOperand['num']);
    console.log('');
    console.log(`previousOperand is ${previousOperand['num']}`);
    console.log(`currentOperand is ${currentOperand['num']}`);

    previousResult = result;
    console.log(`previousResult is ${previousResult}`);
    displayOutput.innerText = previousResult;

    previousOperand['num'] = previousResult;
    previousOperand['status'] = true;
    currentOperand['num'] = '';
    currentOperand['status'] = false;
    op = '';

    isOperatorPressed = false;
    isOperatorPressedDisplay.innerText = isOperatorPressed;
}

function checkIfOperatorIsPressed() {
    if (isOperatorPressed) {
        isOperatorPressed = false;
        isOperatorPressedDisplay.innerText = isOperatorPressed;
    } else {
        isOperatorPressed = true;
        isOperatorPressedDisplay.innerText = isOperatorPressed;
    }
}

function checkStatus(array) {
    array.filter(operand => {
        if (operand.status == true) {
            console.log(`operand that is true is ${operand.name}`);
            console.log(operand);
            return operand;
        }
    })
}

function decimalLimit(array) {
    let previousOperand = array.find(operand => operand.name === 'prev');
    let currentOperand = array.find(operand => operand.name === 'current');

    let previousHasDecimal = previousOperand['num'].includes('.');
    let currentHasDecimal = currentOperand['num'].includes('.');

    return previousHasDecimal && currentHasDecimal;
}

