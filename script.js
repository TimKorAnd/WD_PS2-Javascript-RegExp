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
    const TIME_UNITS_IN_MS_ARRAY = [24*60*60*1000,60*60*1000,60*1000,1000,1];
    const MONTH_IN_YEAR = 11;
    const MEASURE_UNITS = [['лет','год','года','года','года','лет','лет','лет','лет','лет'],
                            ['месяцев','месяц','месяца','месяца','месяца','месяцев','месяцев','месяцев','месяцев','месяцев',],
                            ['дней','день','дня','дня','дня','дней','дней','дней','дней','дней',],
                            ['часов','час','часа','часа','часа','часов','часов','часов','часов','часов',],
                            ['минут','минута','минуты','минуты','минуты','минут','минут','минут','минут','минут',],
                            ['секунд','секунда','секунды','секунды','секунды','секунд','секунд','секунд','секунд','секунд',]];

    if (!validation('datetime-span-form__btn', DATETIME_VALID_REGEX, [inputFirstId, inputSecondId])){
        document.getElementById('datetime-span-result').className = 'sum-form__input--invalid'
        return;
    }
    document.getElementById('datetime-span-result').className = 'sum-form__input--valid';
    let date1 = new Date(document.getElementById(inputFirstId).value +'Z');
    let date2 = new Date(document.getElementById(inputSecondId).value + 'Z');

    /*require date2 > date1 */
    if (date1 > date2) {
        [date1, date2] = [date2, date1];
    }
    let dif = date2 - date1;

    /*calculate days ... ms*/
    let resultSpan = TIME_UNITS_IN_MS_ARRAY.map((unit)=>{
        let tempDif = dif;
        dif -= (Math.trunc(tempDif / unit) * unit);
        return(Math.trunc(tempDif / unit));
    });

    /*calculate years, months & days from days*/
    let currentMonth = date1.getMonth();
    let currentYear = date1.getFullYear();
    let resultMonth = 0, resultYears = 0, dayInCurrentMonth ;
        /*calc month, days in remain*/
    while (resultSpan[0] >= (dayInCurrentMonth = (new Date(currentYear + resultYears,currentMonth + 1 ,0)).getDate())){
        resultSpan[0] -= dayInCurrentMonth;
        resultMonth++;
        if (resultMonth === 12) {
            resultYears++;
            resultMonth = 0;
        }
        currentMonth = (currentMonth === (MONTH_IN_YEAR)) ? 0 : ++currentMonth;
    }
    /*add years & month in result array*/
    resultSpan.splice(0,0, resultYears, resultMonth);
    /*add measure units for output*/
    resultSpan.forEach((timeUnit, i) => {
        let str = '';
        if (i === 6) {
            str = 'мили';
            --i;
        }
        if (timeUnit > 10 && timeUnit < 20) {
            str += MEASURE_UNITS[i][0];
        } else {
            str += MEASURE_UNITS[i][parseInt(timeUnit.toString().substr(-1))];
        }

        console.log((resultSpan[i].toString().concat(' ',str)));
    });
}

function test(inputId){
    const obj = {name:"tim", age:39};
    obj.passion = 'codding';

    console.log(document.getElementById('datetime-span-form__input-2') .value);
    console.log(ms);
    //alert(dateTimeInput.value);
}

