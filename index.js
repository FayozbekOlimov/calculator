const themeSwitcher = document.getElementById('theme-switcher');
const variables = document.querySelector(':root');

// ========== LIGHT - DARK MODE ========== //
themeSwitcher.addEventListener('click', () => {
    variables.classList.toggle('light-root');
});

const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operation');
const input = document.getElementById('input');

const equal = document.getElementById('equal');
const clear = document.getElementById('clear');
const del = document.getElementById('del');
const dot = document.getElementById('dot');
const plusMinus = document.getElementById('plus-minus');

let prevValue, nextValue, operator;
const MAX_VALUE = 10 ** 9 - 1;

numbers.forEach(num => {
    num.addEventListener('click', () => {
        if (input.innerText == '0') {
            input.innerText = '';
        }
        if (isInputValid()) {
            input.innerText += num.innerText;
        }
    });
});

dot.addEventListener('click', () => {
    if (input.innerText.includes('.')) {
        input.innerText += '';
    } else if (isInputValid()) {
        input.innerText += '.';
    }
});

operators.forEach(opBtn => {
    opBtn.addEventListener('click', () => {
        prevValue = parseFloat(input.innerText);
        operator = getOperator(opBtn.innerText);
        input.innerText = '0';
    });
});

plusMinus.addEventListener('click', () => {
    input.innerText = (-1) * (+input.innerText);
});

equal.addEventListener('click', () => {
    if (operator != undefined) {
        nextValue = parseFloat(input.innerText);
        input.innerText = getResult();
    }
    prevValue = nextValue = '';
    operator = undefined;
});

clear.addEventListener('click', () => {
    input.innerText = '0';
});

del.addEventListener('click', () => {
    if (input.innerText.length == 1 || input.innerText == 'INFINITY' || input.innerText == 'NAN') {
        input.innerText = '0';
    } else {
        input.innerText = input.innerText.slice(0, -1);
    }
});

function getOperator(sign) {
    if (sign == '×') return '*';
    if (sign == '÷') return '/';
    return sign;
}

function isInputValid() {
    return input.innerText.split('').filter(x => x.match(/[0-9]|[E]/)).length < 9 && input.innerText != 'INFINITY' && input.innerText != 'NAN';
}

function getResult() {
    // if (operator == undefined || prevValue == undefined || nextValue == undefined) return;
    let result = eval(prevValue + operator + nextValue);
    if (+result > MAX_VALUE || +result < (-1) * MAX_VALUE) {
        return result.toExponential(5);
    }
    if (-1 < +result && +result < 1) {
        return parseFloat(result.toFixed(8));
    }
    return parseFloat(result.toExponential(8));
}