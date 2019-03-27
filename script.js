/* CONSTANTS */
  //for task_1 regexp
const TIME_IN_SECOND_VALID_REGEX = /^\d+$/;   //for task_2 seconds regexp
const TIME_IN_HMS_VALID_REGEX = /^((0(?=\d)|1(?=\d)|2(?=[0-4]))\d):([0-5](?=\d)\d):([0-5](?=\d)\d)$/;   //for task_2 HMS regexp


const SECONDS_IN_HMS = [60 * 60, 60, 1 ];


/* between two specified numbers, sum numbers only if they are ending for 2, 3, 7*/
function outputSpecifiedNumbersSum(btnId, ...inputsId) {
    const NUMBER_VALID_REGEX = /^-?\d+$/;
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
function outputInHMS(outputId, inputId){
    let timeInSecond = document.getElementById(inputId).value;
    const resultTimeTransform = document.getElementById(outputId);
    if (!validation('time-form__btn', TIME_IN_SECOND_VALID_REGEX, [inputId])){
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
function outputInSeconds(outputId, inputId){

    const timeInSecond = document.getElementById(inputId).value;
    const resultTimeTransform = document.getElementById(outputId);
    if (!validation('time-form__btn', TIME_IN_HMS_VALID_REGEX, [inputId])){
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

/*output a span between two date*/
function outputSpan (inputFirstId, inputSecondId){
    const DATETIME_VALID_REGEX = /^.+$/;   //for task_3 locale datetime regexp
    let dayInMonth = 31;
    const TIME_UNIT_ARRAY = [12*dayInMonth*24*60*60*1000,dayInMonth*24*60*60*1000,24*60*60*1000,60*60*1000,60*1000,1000,1];
    const DHM_S_MS_UNIT_ARRAY = [24*60*60*1000,60*60*1000,60*1000,1000,1];
    const DAY_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    if (!validation('datetime-span-form__btn', DATETIME_VALID_REGEX, [inputFirstId, inputSecondId])){
        document.getElementById('datetime-span-result').className = 'sum-form__input--invalid'
        return;
    }
    document.getElementById('datetime-span-result').className = 'sum-form__input--valid';
    let date1 = new Date(document.getElementById(inputFirstId).value);
    let date2 = new Date(document.getElementById(inputSecondId).value);

    /*require date2 > date1 */
    if (date1 > date2) {
        [date1, date2] = [date2, date1];
    }
    let dif = date2 - date1;
    console.log('min date' + date1); //TODO remove before prod

    /*count days ... ms*/
    let resultSpan = DHM_S_MS_UNIT_ARRAY.map((unit,i)=>{
        let tempDif = dif;
        dif -= (Math.trunc(tempDif / unit) * unit);
        return(Math.trunc(tempDif / unit));
    });
    console.log(resultSpan); //TODO remove before prod

    let currentMonth = date1.getMonth();
    let resultMonth = 0, resultYears = 0;

    while (resultSpan[0] >= DAY_IN_MONTH[currentMonth]){
        resultSpan[0] -= DAY_IN_MONTH[currentMonth];
        resultMonth++;
        if (resultMonth === 12) {
            resultYears++;
            resultMonth = 0;
        }
        currentMonth = (currentMonth === (DAY_IN_MONTH.length - 1)) ? 0 : ++currentMonth;
    }
    resultSpan.splice(0,0, resultYears, resultMonth);
    console.log(resultSpan);


    console.log('+++++++++++++++++++++++++++++++');


    const result = new Date(0,0,0,0,0,0,dif);
    console.log(result);



}

function test(inputId){
    const obj = {name:"tim", age:39};
    obj.passion = 'codding';

    console.log(document.getElementById('datetime-span-form__input-2') .value);
    console.log(ms);
    //alert(dateTimeInput.value);
}

