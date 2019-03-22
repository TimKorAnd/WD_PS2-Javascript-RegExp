/* CONSTANTS */
const NUMBER_VALID_REGEX = /^-?\d+$/;   //for task_1 regexp
const TIME_IN_SECOND_VALID_REGEX = /^\d+$/;   //for task_2 seconds regexp
const TIME_IN_HMS_VALID_REGEX = /^((0(?=\d)|1(?=\d)|2(?=[0-4]))\d):([0-5](?=\d)\d):([0-5](?=\d)\d)$/;   //for task_2 HMS regexp

const SECONDS_IN_HMS = [60 * 60, 60, 1 ];


/* between two specified numbers, sum numbers only if they are ending for 2, 3, 7*/
function getSum(regTemplate, btnId, ...inputsId) {
    /*sum specified numbers in range*/
    let sumSpecNum = (a , b ) => {
        if (a === '' || b === '') {
            return "please, enter data in empty field"
        }
        if (isNaN(a) || isNaN(b)) {
            return "please, enter correct data for sum calculate"
        }
        a = parseInt(a);
        b = parseInt(b);
        let minNum = a < b ? a : b;
        let maxNum = a + b - minNum;
        let sum = 0;
        for (let i = minNum; i <= maxNum; i++){
            if (isSpecNum(i)){
               sum += i;
            }
        }
        return sum;
    };

    /*is number end with 2 or 3 or 7*/
    let isSpecNum = (num) => {
        num = (Math.abs(num)) % 10;
        return (num === 2) || (num === 3) || (num === 7);

    };

    validation(btnId, NUMBER_VALID_REGEX, inputsId);

    const numberFirst = document.getElementById(inputsId[0]).value;
    const numberSecond = document.getElementById(inputsId[1]).value;
    const resultOutput = document.getElementById('sum-form__result-output');
    resultOutput.innerText = sumSpecNum(numberFirst, numberSecond);
}
/*validation
* return true if all inputs valid, false if not;
* btnId - btn for activate/deactivate
* regTemplate - reg.expression for test inputs
* inputsId one or some inputs*/
function validation(btnId, regTemplate, inputsId){

    let isAllInputsValid = true;
    if ((typeof  inputsId === "object") && (inputsId.length > 1)) {
        inputsId.forEach((currentId, i, inputsId) => {
            const currentInput = document.getElementById(currentId);
            if (!regTemplate.test(document.getElementById(currentId).value)) {
                currentInput.className = 'sum-form__input--invalid';
                isAllInputsValid = false;
            } else {
                currentInput.className = 'sum-form__input--valid';
            }
        });
    } else {
        const currentInput = document.getElementById(inputsId);
        if (!regTemplate.test(currentInput.value)) {
            currentInput.className = 'sum-form__input--invalid';
            isAllInputsValid = false;
        } else {
            currentInput.className = 'sum-form__input--valid';
        }
    }

    document.getElementById(btnId).disabled = !isAllInputsValid;
    return isAllInputsValid;
}

/*output in hms*/
function outputInHMS(regTime, outputId, inputId){
    let timeInSecond = document.getElementById(inputId).value;
    const resultTimeTransform = document.getElementById(outputId);
    if (!validation('time-form__btn', regTime, [inputId])){
        resultTimeTransform.placeholder =  'enter correct seconds';
        resultTimeTransform.className = 'sum-form__input--invalid';
        return;
    };
    /*transfer from second to hms*/
    function transferFromSecond() {
        let arrayHMS = SECONDS_IN_HMS.map((item) => {
            let tis = timeInSecond;
            timeInSecond %= item;
            return Math.floor(tis / item);
        });

        arrayHMS.forEach((x, j) => {
            arrayHMS[j] = (x.toString().padStart(2, '0'));
        });

        resultTimeTransform.value = arrayHMS.join(':');
        resultTimeTransform.className = 'sum-form__input--valid';
    }

    transferFromSecond();

}

/*output seconds*/
function outputInSeconds(regHMS, outputId, inputId){

    const timeInSecond = document.getElementById(inputId).value;
    const resultTimeTransform = document.getElementById(outputId);
    if (!validation('time-form__btn', regHMS, [inputId])){
        resultTimeTransform.placeholder = 'enter correct hh:mm:ss';
        resultTimeTransform.className = 'sum-form__input--invalid';
        return;
    };
    /*transfer time from HMS to seconds*/
    function transferFromHMS() {
        let seconds = timeInSecond.split(':').reduce((prevVal, currVal, currIndex, seconds) => {
            return prevVal + currVal * SECONDS_IN_HMS[currIndex];
        }, 0);
        return seconds;
    }

    let seconds = transferFromHMS();

    resultTimeTransform.value =  seconds.toString();
    resultTimeTransform.className = 'sum-form__input--valid';

}
/*return true if enter pressed*/
function enterPressed(event) {
    return (event.which == 13 || event.keyCode == 13);
}

function test(){
    const obj = {name:"tim", age:39};
    console.log(typeof obj);
    alert('hello');
}

