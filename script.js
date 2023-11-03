let oddPress = {
    num: '0',
    status: false, //true means it is activated;
}


let op = '+';

let evenPress = {
    num: '0',
    status: false,
}


const displayOutput = document.querySelector('.displayContainer');
const equalButton = document.querySelector('.equalButton');
const zeroButton = document.querySelector('.zeroButton');
const nodeListOfNumberButtons = document.querySelectorAll('.numberButton'); //this is a nodelist
const numberButtons = Array.from(nodeListOfNumberButtons); //makes nodelist into an array

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
    switch (oddPress['status']){
        case false: //not yet pressed/ holding a value, so allocate 0 to 'a'
            oddPress['num'] = 0;
            oddPress['status'] = true;
            break;
        case true: //currently holding a value, so we have to allocate 0 to 'b' (b should be false if we programmed right), and set 'b' status to true after we allocated 0. and set oddPress back to false to take next value
            evenPress['num'] = 0;
            oddPress['status'] = false;
            evenPress['status'] = true;
            break;
    }
    let a = oddPress['num'];
    let b = evenPress['num'];
    displayOutput.innerHTML = '0';
})

numberButtons.map(button => {
    button.addEventListener('click', () => { 
        let text = button.textContent;
        switch (oddPress['status']){
            case false: //not yet pressed/ holding a value, so allocate 0 to 'a'
                oddPress['num'] = +text;
                oddPress['status'] = true;
                break;
            case true: //currently holding a value, so we have to allocate 0 to 'b' (b should be false if we programmed right), and set 'b' status to true after we allocated 0. and set oddPress back to false to take next value
                evenPress['num'] = +text;
                oddPress['status'] = false;
                break;
        }
        let a = oddPress['num'];
        let b = evenPress['num'];
        displayOutput.innerText = `${a} ${b}`;
        console.log(displayOutput.innerText);
    })
})

equalButton.addEventListener('click', () => {
    let numbersOnDisplay = displayOutput.textContent;
    let a = +numbersOnDisplay.split('')[0];
    let b = +numbersOnDisplay.split('')[2];
    displayOutput.innerText = operate(a, op, b);
});

console.log(oddPress);