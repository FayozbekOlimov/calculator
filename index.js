const checkInput = document.getElementById('check');
const variables = document.querySelector(':root');

// ========== LIGHT - DARK MODE ========== //
checkInput.addEventListener('click', () => {
    variables.classList.toggle('light-root');
});

const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operation');
const input = document.getElementById('input');

const equal = document.getElementById('equal');
const reset = document.getElementById('reset');
const dot = document.getElementById('dot');
const del = document.getElementById('del');

let prevValue, nextValue, operator;
const MAX_VALUE = 10 ** 9;

numbers.forEach(num => {
    num.addEventListener('click', () => {
        if (input.innerText == '0') {
            input.innerText = '';
        }
        if (input.innerText.split('').filter(x => x.match(/[0-9]/)).length < 10) {
            input.innerText += num.innerText;
        }
    })
})

dot.addEventListener('click', () => {
    if (input.innerText.includes('.')) {
        input.innerText += '';
    } else if (input.innerText.split('').filter(x => x.match(/[0-9]/)).length < 10) {
        input.innerText += '.';
    }
})

operators.forEach(opBtn => {
    opBtn.addEventListener('click', () => {
        prevValue = parseFloat(input.innerText);
        operator = getOperator(opBtn.innerText);
        input.innerText = '0';
    })
})

equal.addEventListener('click', () => {
    nextValue = parseFloat(input.innerText);
    if (operator != undefined) {
        input.innerText = getResult();
    }
    prevValue = nextValue = '';
    operator = undefined;
});

reset.addEventListener('click', () => {
    input.innerText = '0';
})

del.addEventListener('click', () => {
    if (input.innerText.length == 1) {
        input.innerText = '0';
    } else {
        input.innerText = input.innerText.slice(0, -1);
    }
})

function getOperator(sign) {
    if (sign == '×') return '*';
    if (sign == '÷') return '/';
    return sign;
}

function getResult() {
    if (operator == undefined || prevValue == undefined || nextValue == undefined) return;
    let result = eval(prevValue + operator + nextValue);
    if (+result > MAX_VALUE || +result < (-1) * MAX_VALUE) {
        return result.toExponential(5);
    }
    if (-1 < +result && +result < 1) {
        return parseFloat(result.toFixed(9));
    }
    return parseFloat(result.toExponential(9));
}