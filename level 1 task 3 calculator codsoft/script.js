const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const clickSound = document.getElementById('click-sound');

let currentInput = '';
let operator = '';
let firstOperand = null;

// Button click functionality
buttons.forEach(button => {
    button.addEventListener('click', () => {
        playSound();
        handleInput(button.dataset.number, button.dataset.operator, button.id);
    });
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        handleInput(key, null, null);
        playSound();
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleInput(null, key, null);
        playSound();
    } else if (key === 'Enter' || key === '=') {
        handleInput(null, null, 'equals');
        playSound();
        event.preventDefault();
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || '0';
        playSound();
    } else if (key.toLowerCase() === 'c') {
        handleInput(null, null, 'clear');
        playSound();
    }
});

// Unified input handler
function handleInput(number, op, id) {
    if (id === 'clear') {
        currentInput = '';
        operator = '';
        firstOperand = null;
        display.textContent = '0';
    } else if (id === 'equals') {
        if (firstOperand !== null && operator && currentInput !== '') {
            currentInput = calculate(firstOperand, currentInput, operator);
            display.textContent = currentInput;
            firstOperand = null;
            operator = '';
        }
    } else if (op) {
        if (currentInput === '' && firstOperand === null) return;
        if (firstOperand === null) {
            firstOperand = currentInput;
            currentInput = '';
        } else if (currentInput !== '') {
            firstOperand = calculate(firstOperand, currentInput, operator);
            currentInput = '';
            display.textContent = firstOperand;
        }
        operator = op;
    } else if (number !== null) {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
        display.textContent = currentInput;
    }
}

// Calculator calculation logic
function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return b;
    }
}

// Play click sound
function playSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}
