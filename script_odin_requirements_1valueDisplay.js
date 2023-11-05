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
let previousResult = 'default'; //starting of we dont use '' as with how its prgrammed, we always check if previousResult is '' for when we press clear and the operand status keys are handled accordingly to a clear or delete till empty. But the very first input needs to be handled diferently

const isOperatorPressedDisplay = document.querySelector('.isOperatorPressed');
const displayOutput = document.querySelector('.displayContainer');
displayOutput.innerText = '';

const nodeListOfNumberButtons = document.querySelectorAll('.numberButton'); //this is a nodelist
const numberButtons = Array.from(nodeListOfNumberButtons); //makes nodelist into an array
const zeroButton = document.querySelector('.zeroButton');
const decimalButton = document.querySelector('.decimalButton');

const nodelistOfOperatorButtons = document.querySelectorAll('.operatorButton');
const operatorButtons = Array.from(nodelistOfOperatorButtons);
//const powerBtn = document.querySelector('.operatorButton');

const clearBtn = document.querySelector('.clearBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const equalButton = document.querySelector('.equalButton');

numberButtons.map(button => {
    button.addEventListener('click', () => {
        let number = button.textContent;
        
        if (isNaN(previousResult)) {
            displayOutput.innerText = '';
            previousResult = '';
            currentOperand['num'] = '';
        }

        if (displayOutput.textContent == previousResult) { // this if statement ensures that if a number is pressed after a final result, the screen changes to that number instead of appending to the back of finalResult 
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
            
        if (isNaN(previousResult)) {
            displayOutput.innerText = '';
            previousResult = '';
            currentOperand['num'] = '';
        }

        if (displayOutput.textContent == previousResult) { // this if statement ensures that if a number is pressed after a final result, the screen changes to that number instead of appending to the back of finalResult 
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


decimalButton.addEventListener('click', () => {
    let decimal = decimalButton.textContent;

    if (displayOutput.textContent == previousResult) {
        displayOutput.innerText = '';
        previousOperand['num'] = '';
        previousOperand['status'] = true;
        currentOperand['status'] = false;
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
        console.log('');
        console.log(`op is ${operator}`);
        checkStatus(id);

        if ((displayOutput.textContent == '' || displayOutput.textContent == previousResult) && operator == '-') {
            previousOperand['status'] = true;
            displayOutput.innerText += operator;
            isOperatorPressed = false; //only false for this case as we want the number to be input to remain as previousOperand, but how our code works is that it will automatically change to current after an operator is pressed, but as you can see, this wont work if the screen was not empty
            isOperatorPressedDisplay.innerText = isOperatorPressed;
        }

        else if (op == '') {
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
    console.log('');
    console.log(`poppedItem is ${poppedItem}`);
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


//functions 

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
            return parseFloat((a/b).toFixed(7));
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
    console.log(`previousOperand: ${previousOperand['num']}`);
    console.log(op);
    console.log(`currentOperand: ${currentOperand['num']}`);

    previousResult = result;
    if (previousOperand['num'] === '') {
        // Handle the case where no numbers have been entered yet.
        // You can display an error message or take any other appropriate action.
        return;
    }
    
    else if (isNaN(previousResult)) {
        previousOperand['num'] = ''
        previousOperand['status'] = true;
        currentOperand['status'] = false;
        console.log(`previousResult is ${previousResult}`);
        displayOutput.innerText = previousResult;
        //previousResult = '';
        isOperatorPressed = false;
        op = '';
    } else {
        console.log(`previousResult is ${previousResult}`);
        displayOutput.innerText = previousResult;

        previousOperand['num'] = previousResult;
        previousOperand['status'] = true;
        currentOperand['num'] = '';
        currentOperand['status'] = false;
        op = '';

        isOperatorPressed = false;
        isOperatorPressedDisplay.innerText = isOperatorPressed;

        console.log('');
    }
}

function checkStatus(array) {
    array.filter(operand => {
        if (operand.status == true) {
            console.log('');
            console.log(`operand:  ${operand.name}`);
            console.log(operand);
            return operand;
        }
    })
}

function decimalLimit(array) {
    let previousOperand = array.find(operand => operand.name === 'prev');
    let currentOperand = array.find(operand => operand.name === 'current');

    let previousHasDecimal = String(previousOperand['num']).includes('.');
    let currentHasDecimal = String(currentOperand['num']).includes('.');

    return previousHasDecimal || currentHasDecimal;
}




//current issues identified with code, cant do .5 + .2 //solved
//initial 6 + 5 del 7 gives 7 instead of 13. //solved
//