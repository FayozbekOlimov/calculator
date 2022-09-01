const themeSwitcher = document.getElementById('theme-switcher');
const variables = document.querySelector(':root');

// ========== LIGHT - DARK MODE ========== //
themeSwitcher.addEventListener('click', () => {
    variables.classList.toggle('light-root');
});

// ========== SELECTORS ========== //
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operation');
const input = document.getElementById('input');

const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const delBtn = document.getElementById('del');
const dotBtn = document.getElementById('dot');
const plusMinusBtn = document.getElementById('plus-minus');

// ========== GLOBAL VARIABLES ========== //
let prevValue, nextValue, operator;
const MAX_VALUE = 10 ** 9 - 1;

// ========== EVENT LISTENERS ========== //
numbers.forEach(num => {
    num.addEventListener('click', () => {
        displayNumbers(num.innerText);
    });
});

dotBtn.addEventListener('click', () => {
    displayDot();
});

operators.forEach(opBtn => {
    opBtn.addEventListener('click', () => {
        getOperands(opBtn.innerText);
    });
});

plusMinusBtn.addEventListener('click', () => {
    displayPlusMinus();
});

equalBtn.addEventListener('click', () => {
    equal();
});

clearBtn.addEventListener('click', () => {
    clear();
});

delBtn.addEventListener('click', () => {
    deleteNumber();
});

// ========== KeyboardEvent ========== //
const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    operands = ['+', '-', '*', '/'];

document.addEventListener('keydown', (e) => {
    if (nums.includes(e.key)) {
        displayNumbers(e.key);
    } else if (e.key == '.') {
        displayDot();
    } else if (operands.includes(e.key)) {
        getOperands(e.key);
    } else if (e.key == 'Enter' || e.key == '=') {
        equal();
    } else if (e.key == 'Escape') {
        clear();
    } else if (e.key == 'Backspace') {
        deleteNumber();
    }
});

// ========== FUNCTIONS ========== //
function displayNumbers(num) {
    if (input.innerText == '0') {
        input.innerText = '';
    }
    if (isInputValid()) {
        input.innerText += num;
    }
}

function displayDot() {
    if (input.innerText.includes('.')) {
        input.innerText += '';
    } else if (isInputValid()) {
        input.innerText += '.';
    }
}

function getOperands(operand) {
    if (input.innerText == 'INFINITY') {
        prevValue = Infinity;
    } else {
        prevValue = parseFloat(input.innerText);
    }
    operator = getOperator(operand);
    clear();
}

function displayPlusMinus() {
    let currValue = input.innerText;
    if (input.innerText == '0' || input.innerText == 'INFINITY' || input.innerText == 'NAN') {
        return;
    }
    if (currValue[0] != '-') {
        input.innerText = "-" + input.innerText;
    } else {
        input.innerText = input.innerText.slice(1);
    }
}

function equal() {
    if (operator != undefined) {
        nextValue = parseFloat(input.innerText);
        input.innerText = getResult();
    }
    prevValue = nextValue = '';
    operator = undefined;
}

function clear() {
    input.innerText = '0';
}

function deleteNumber() {
    if (input.innerText.length == 1 || input.innerText == 'INFINITY' || input.innerText == 'NAN') {
        clear();
    } else {
        input.innerText = input.innerText.slice(0, -1);
    }
}

function getOperator(sign) {
    if (sign == '×') return '*';
    if (sign == '÷') return '/';
    return sign;
}

function isInputValid() {
    return input.innerText.split('').filter(x => x.match(/[0-9]|[E]/)).length < 9
        && input.innerText != 'INFINITY'
        && input.innerText != 'NAN';
}

function getResult() {
    let result = eval(prevValue + operator + nextValue);
    if (+result > MAX_VALUE || +result < (-1) * MAX_VALUE) {
        return result.toExponential(4);
    }
    if (-1 < +result && +result < 1) {
        return parseFloat(result.toFixed(8));
    }
    return parseFloat(result.toExponential(8));
}