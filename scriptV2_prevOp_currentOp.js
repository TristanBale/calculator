class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand
        this.currentOperand = currentOperand
    }

    clear() {

    }

    delete() {

    }

    appendNumber(number) {

    }

    chooseOperation(operation) {

    }

    compute() {

    }

    updateDisplay() {
        
    }
}


const displayOutput = document.querySelector('.displayContainer');
const previousOperand = document.querySelector('.previousOperand');
const currentOperand = document.querySelector('.currentOperand');

const nodeListOfNumberButtons = document.querySelectorAll('.numberButton'); //this is a nodelist
const numberButtons = Array.from(nodeListOfNumberButtons); //makes nodelist into an array
const zeroButton = document.querySelector('.zeroButton');

const nodelistOfOperatorButtons = document.querySelectorAll('.operatorButton');
const operatorButtons = Array.from(nodelistOfOperatorButtons);
const powerBtn = document.querySelector('.powerBtn');

const clearBtn = document.querySelector('.clearBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const equalButton = document.querySelector('.equalButton');