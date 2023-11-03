let ticker = 0; // if even, we assign to current number, if odd we assign to next number
let previousResult = 0;

let currentNumber = {
    num: '',
    status: false, //true means it is activated;
}

let op = '+';

let nextNumber = {
    num: '',
    status: true,
}


const displayOutput = document.querySelector('.displayContainer');
const equalButton = document.querySelector('.equalButton');
const zeroButton = document.querySelector('.zeroButton');
const nodeListOfNumberButtons = document.querySelectorAll('.numberButton'); //this is a nodelist
const numberButtons = Array.from(nodeListOfNumberButtons); //makes nodelist into an array
const nodelistOfOperatorButtons = document.querySelectorAll('.operatorButton');
const operatorButtons = Array.from(nodelistOfOperatorButtons);
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
            return a / b;
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
    onEquals();
});

numberButtons.map(button => {
    button.addEventListener('click', () => { 
        let text = button.textContent;
        //console.log(`text is: ${text}`);
        switch (ticker%2) {
            case 0: //not yet pressed/ holding a value, so allocate 0 to 'a'
                currentNumber['num'] += text;
                let a = currentNumber['num'];
                displayOutput.innerHTML += text;
                console.log(`we are on a: ${a}`);
                //console.log(typeof +a);
                break;
            case 1: //currently holding a value, so we have to allocate 0 to 'b' (b should be false if we programmed right), and set 'b' status to true after we allocated 0. and set currentNumber back to false to take next value
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
        op = button.textContent;
        ticker += 1;
        displayOutput.innerText += op;
    });
});


clearBtn.addEventListener('click', () => {
    displayOutput.innerText = '';
    currentNumber['num'] = '';
    nextNumber['num'] = '';
    ticker = 0;
})


function onEquals() {
    equalButton.addEventListener('click', () => {
        let numbersOnDisplay = displayOutput.textContent;
        console.log(typeof numbersOnDisplay);
        console.log(`numbers On Display is: ${numbersOnDisplay}`);
        numbersOnDisplay = numbersOnDisplay.trim();
        numbersOnDisplay = numbersOnDisplay.split(op);
        let a = +numbersOnDisplay[0];
        let b = +numbersOnDisplay[1];
        console.log(typeof numbersOnDisplay);
        console.log(numbersOnDisplay);
        console.log(`a after split is: ${a}`);
        console.log(`b after split is: ${b}`);
        console.log(`op is: ${op}`);
        let result = operate(a, op, b);
        displayOutput.innerText = result;
        previousResult = result;
});
}

onEquals()