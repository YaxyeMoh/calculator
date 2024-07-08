let operations = document.querySelectorAll(".operation");
let numbers = document.querySelectorAll(".number");
let setting = document.querySelectorAll(".system");

let screentext = document.querySelector(".text-area p");

let calculation = [];
let isDecimal = false;


let getAnswer = (array) => {
    if (array[1] == '+') {
        return Number(array[0]) + Number(array[2]);
    } else if (array[1] == '-') {
        return Number(array[0]) - Number(array[2]);
    } else if (array[1] == '*') {
        return Number(array[0]) * Number(array[2]);
    } else if (array[1] == '/' && Number(array[2]) == 0) {
        return 'XD';
    } else {
        return Number(array[0]) / Number(array[2]);
    }
}

let getNumber = (val, digit) => {
    if (digit == '.' && !isDecimal) {
        if (val == '') {
            return '0' + digit;
        } else {
            return val + digit;
        }

        isDecimal = true;
    } else if (digit != '.') {
        return val + digit;
    }

    return val;
}

for (operation of operations) {
    operation.addEventListener('click', function() {
        if (calculation.length == 1 && this.value != '=') {
            calculation[1] = this.value;
            isDecimal = false;
        } else if (calculation.length == 3) {
            if (this.value == '=') {
                screentext.innerText = getAnswer(calculation);
                calculation.pop();
                calculation.pop();
                calculation.pop();
            } else {
                calculation[0] = getAnswer(calculation);
                screentext.innerText = calculation[0];
                calculation[1] = this.value;
                calculation.pop();
            }
        }
    });
}

for (number of numbers) {
    number.addEventListener('click', function() {
        if (calculation.length == 0) {
            calculation[0] = getNumber('', this.value);
            screentext.innerText = calculation[0];
        } else if (calculation.length == 1) {
            calculation[0] = getNumber(calculation[0], this.value);
            screentext.innerText = calculation[0];
        } else if (calculation.length == 2) {
            calculation[2] = getNumber('', this.value);
            screentext.innerText = calculation[2];
        } else if (calculation.length == 3) {
            calculation[2] = getNumber(calculation[2], this.value);
            screentext.innerText = calculation[2];
        }
    });
}

for (system of setting) {
    system.addEventListener('click', function() {
        if (this.value == 'AC') {
            calculation.pop();
            calculation.pop();
            calculation.pop();
            screentext.innerText = '0';
        } else if (this.value == '+/-') {
            if (calculation.length == 1 || calculation.length == 2) {
                calculation[0] = calculation[0].includes('-') ? calculation[0].slice(1) : '-' + calculation[0];
                screentext.innerText = calculation[0];
            } else {
                calculation[2] = calculation[2].includes('-') ? calculation[2].slice(1) : '-' + calculation[2];
                screentext.innerText = calculation[2];
            }
        } else if (this.value == '%') {
            if (calculation.length == 1 || calculation.length == 2) {
                calculation[0] = (Number(calculation[0]) / 100).toString();
                screentext.innerText = calculation[0];
            } else {
                calculation[2] = (Number(calculation[2]) / 100).toString();
                screentext.innerText = calculation[2];
            }
        }
    });
}
