let ticker = 0; // if even, we assign to current number, if odd we assign to next number
let previousResult = 0;

let currentNumber = {
    num: '',
}

let op = '';

let nextNumber = {
    num: '',
}

const buttonContainer = document.querySelector('.buttonContainer');
const displayOutput = document.querySelector('.displayContainer');
const equalButton = document.querySelector('.equalButton');
const zeroButton = document.querySelector('.zeroButton');
const nodeListOfNumberButtons = document.querySelectorAll('.numberButton'); //this is a nodelist
const numberButtons = Array.from(nodeListOfNumberButtons); //makes nodelist into an array
const nodelistOfOperatorButtons = document.querySelectorAll('.operatorButton');
const operatorButtons = Array.from(nodelistOfOperatorButtons);
const powerBtn = document.querySelector('.powerBtn');
const clearBtn = document.querySelector('.clearBtn');

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
            return 'Syntax Error';
    }

}


zeroButton.addEventListener('click', () => { 
    console.log('zero button clicked');
    switch (ticker%2){
        case 0: //not yet pressed/ holding a value, so allocate 0 to 'a'
            currentNumber['num'] += '0';
            let a = currentNumber['num'];
            displayOutput.innerHTML += '0';
            break;
        case 1: //currently holding a value, so we have to allocate 0 to 'b' (b should be false if we programmed right), and set 'b' status to true after we allocated 0. and set currentNumber back to false to take next value
            nextNumber['num'] += '0';
            let b = currentNumber['num'];
            displayOutput.innerHTML += '0';
            break;
    };
});

numberButtons.map(button => {
    button.addEventListener('click', () => { 
        clearScreenAfterError()
        let text = button.textContent;

        switch (ticker%2) {
            case 0: //not yet pressed/ holding a value, so allocate 0 to 'a'
                if (displayOutput.textContent == previousResult) {
                    displayOutput.innerText = '';
                }
                currentNumber['num'] += text; //eg pressing 3, text = '3'
                let a = currentNumber['num'];
                let numberOfCharactersOnDisplay = displayOutput.textContent;
                sliceValueToFitDisplay(numberOfCharactersOnDisplay);
                displayOutput.innerText += text;
                console.log(`we are on a: ${a}`);
                //console.log(typeof +a);
                break;
            case 1: //currently holding a value, so we have to allocate 0 to 'b' (b should be false if we programmed right), and set 'b' status to true after we allocated 0. and set currentNumber back to false to take next value
                if (displayOutput.textContent == previousResult) {
                    displayOutput.innerText = '';
                }
                nextNumber['num'] += text;
                let b = nextNumber['num'];
                displayOutput.innerHTML += text;
                console.log(`we are on b: ${b}`);
                break;
        
        }
        //console.log(displayOutput.textContent);
    });
});

operatorButtons.map(button => {
    button.addEventListener('click', () => {
        if (op !== '' && op !== '-') {
            return false;
        }
        op = button.textContent;
        ticker += 1;
        displayOutput.innerText += op;
    });
});

powerBtn.addEventListener('click', () => {
    op = '^'
    ticker += 1;
    displayOutput.innerText += op;
})

clearBtn.addEventListener('click', () => {
    displayOutput.innerText = '';
    currentNumber['num'] = '';
    nextNumber['num'] = '';
    ticker = 0;
})

equalButton.addEventListener('click', onEquals);

function onEquals() {
    let numbersOnDisplay = displayOutput.textContent;
    //console.log(typeof numbersOnDisplay);
    //console.log(`numbers On Display is: ${numbersOnDisplay}`);
    numbersOnDisplay = numbersOnDisplay.trim();
    numbersOnDisplay = numbersOnDisplay.split(op);
    let a = +numbersOnDisplay[0];
    let b = +numbersOnDisplay[1];

    if (op == '-') {
        a = +numbersOnDisplay[0]
        b = +numbersOnDisplay[numbersOnDisplay.length - 1] //gives us last item in array
        if (numbersOnDisplay.length % 2 == 1) { //amount of '' gaps is 1 less number of '-' signs used. eg a - - b --> [a, '', b], therefore, if array.length is odd, means we a double negative happened and we wanna add
            let result = operate(a, '+', b);
            displayOutput.innerText = result;
            previousResult = result;
            console.log(`previous result is ${previousResult}`);
            op = '';
            currentNumber['num'] = '';
            nextNumber['num'] = '';
        } else {
            let result = operate(a, '-', b);
            displayOutput.innerText = result;
            previousResult = result;
            console.log(`previous result is ${previousResult}`);
            op = '';
            currentNumber['num'] = '';
            nextNumber['num'] = '';
        }
    } else {
        //console.log(typeof numbersOnDisplay);
        console.log(numbersOnDisplay);
        console.log(`a after split is: ${a}`);
        console.log(`b after split is: ${b}`);
        console.log(`op is: ${op}`);
        let result = operate(a, op, b);
        result = sliceValueToFitDisplay(result);
        displayOutput.innerText = result;
        previousResult = result;
        console.log(`previous result is ${previousResult}`);
        op = '';
        currentNumber['num'] = '';
        nextNumber['num'] = '';
    }
}

function clearScreenAfterError() {
    if (displayOutput.textContent == NaN || displayOutput.textContent == 'Syntax Error' || displayOutput.textContent == Infinity) {
        displayOutput.innerText = '';
    } else {
        return;
    }
}

function sliceValueToFitDisplay(value) {
    value = value.toString();
    if (value.length > 11) {
        value = value.slice(0,12);
        displayOutput.innerText = value;
        return value;
    } else {
        return value;
    }
} 

function computeCurrentTwoValues() {
    let screenItems = displayOutput.textContent;
    screenItems = screenItems.split(''); //make it into an array of [a, op, b]
    if (screenItems.length >= 2) {
        return true;
    } else {
        return false;
    }
}   