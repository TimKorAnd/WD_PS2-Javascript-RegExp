/* CONSTANTS */

const TIME_IN_SECOND_VALID_REGEX = /^\d+$/;   //for task_2 seconds regexp
const TIME_IN_HMS_VALID_REGEX = /^((0(?=\d)|1(?=\d)|2(?=[0-4]))\d):([0-5](?=\d)\d):([0-5](?=\d)\d)$/;   //for task_2 HMS regexp
const SECONDS_IN_HMS = [60 * 60, 60, 1 ];
const NOT_EMPTY_VALID = /^.+|\w|\W$/; // for task_6 regexp

/*bind a event listener with specified func to each from array of DOM elements*/
function eventLoader(action, func, elementsId) {
    elementsId.forEach((value)=>{
        let el = document.getElementById(value);
        el.addEventListener(action, (e) => {func.call();});
    });
}

/*call eventLoader for all tasks */
function start(){
    /*For task_1 outputSpecifiedNumbersSum()*/
    eventLoader('input', () => outputSpecifiedNumbersSum('sum-form__btn', 'sum-form__input-1', 'sum-form__input-2'),
        ['sum-form__input-1','sum-form__input-2','sum-form__btn']);

    /*For task_2 hms <=> sec */
    eventLoader('input', () => outputInHMS('time-form__hms-input', 'time-form__seconds-input' ),
        ['time-form__seconds-input']);
    eventLoader('input', () => outputInSeconds('time-form__seconds-input', 'time-form__hms-input' ),
        ['time-form__hms-input']);
    eventLoader('focus', () => validation('time-form__btn', TIME_IN_SECOND_VALID_REGEX, 'time-form__seconds-input'),
        ['time-form__seconds-input']);
    eventLoader('focus', () => validation('time-form__btn', TIME_IN_HMS_VALID_REGEX, 'time-form__hms-input'),
        ['time-form__hms-input']);
    eventLoader('keypress', (() => {if (enterPressed(event)) {outputInHMS('time-form__hms-input',
        'time-form__seconds-input')}}),['time-form__seconds-input']);
    eventLoader('keypress', (() => {if (enterPressed(event)) {outputInSeconds('time-form__seconds-input',
        'time-form__hms-input')}}),['time-form__hms-input']);

    /*For task_3 datetime-locale*/
    eventLoader('input', () => outputSpan('datetime-span-form__input-1',
        'datetime-span-form__input-2', 'datetime-span-result'),
        ['datetime-span-form__input-1', 'datetime-span-form__input-2']);

    /*For task_4 chessboard*/
    eventLoader('input', () => drawChessboard('chess-board-form__input-col',
        'chess-board-form__input-row', 'chess-board-form__result-output'),
        ['chess-board-form__input-col','chess-board-form__input-row']);

    /*For task_5 links check & sort*/
    eventLoader('blur', () => outputCheckedLinksWithoutHTTPs('links-form__text',
        'links-form__result-output-title'),
        ['links-form__text']);

    /*For task_6 highlight match in textarea*/
    eventLoader('click', () => outputMarkedText('mark-text-form__text', 'mark-text-form__input-regexp',
        'mark-text-form__result-output-title'),
        ['mark-text-form__btn']);
    eventLoader('input', () => outputMarkedText('mark-text-form__text', 'mark-text-form__input-regexp',
        'mark-text-form__result-output-title'),
        ['mark-text-form__text','mark-text-form__input-regexp']);
    /*eventLoader('input', () => validation('mark-text-form__btn', NOT_EMPTY_VALID,
        ['mark-text-form__text','mark-text-form__input-regexp']),
        ['mark-text-form__text','mark-text-form__input-regexp']);*/

    /*/!*Run some func at start*!/
    outputSpan('datetime-span-form__input-1','datetime-span-form__input-2', 'datetime-span-result');*/
}

////////////////////TASK_1_Sum numbers ends 2,3,7 //////////////////
/* Task_1: between two specified numbers, sum numbers only if they are ending for 2, 3, 7*/
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

/*validation for 1,2,3,4,6 task
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
                currentInput.className = 'form__input--invalid';
                isAllInputsValid = false;
            } else {
                currentInput.className = 'form__input--valid';
            }
        });
    } else {
        const currentInput = document.getElementById(inputsId);
        if (!regTemplate.test(currentInput.value)) {
            currentInput.className = 'form__input--invalid';
            isAllInputsValid = false;
        } else {
            currentInput.className = 'form__input--valid';
        }
    }

    document.getElementById(btnId).disabled = !isAllInputsValid;
    return isAllInputsValid;
}

////////////////////TASK_2_Time transformation sec > HMS //////////////////
/*output in hms*/
function outputInHMS(outputId, inputId){
    let timeInSecond = document.getElementById(inputId).value;
    const resultTimeTransform = document.getElementById(outputId);
    if (!validation('time-form__btn', TIME_IN_SECOND_VALID_REGEX, [inputId])){
        resultTimeTransform.placeholder =  'enter correct seconds';
        resultTimeTransform.className = 'form__input--invalid';
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
        resultTimeTransform.className = 'form__input--valid';
    }

    transferFromSecond();

}

////////////////////TASK_2_Time transformation HMS > sec //////////////////
/*output seconds*/
function outputInSeconds(outputId, inputId){

    const timeInSecond = document.getElementById(inputId).value;
    const resultTimeTransform = document.getElementById(outputId);
    if (!validation('time-form__btn', TIME_IN_HMS_VALID_REGEX, [inputId])){
        resultTimeTransform.placeholder = 'enter correct hh:mm:ss';
        resultTimeTransform.className = 'form__input--invalid';
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
    resultTimeTransform.className = 'form__input--valid';

}
/*return true if enter pressed*/
function enterPressed(event) {
    return (event.which == 13 || event.keyCode == 13);
}

////////////////////_3_DATETIME-LOCALE//////////////////
/*output a span between two date*/
function outputSpan (inputFirstId, inputSecondId, resultOutputId){
    const DATETIME_VALID_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;   //for task_3 locale datetime regexp
    const TIME_UNITS_IN_MS_ARRAY = [24*60*60*1000,60*60*1000,60*1000,1000,1];
    const MONTH_IN_YEAR_FROM_ZERO = 11;
    const MEASURE_UNITS_TEEN_LO_RANGE = 10;
    const MEASURE_UNITS_TEEN_HI_RANGE = 20;
    const MEASURE_UNITS_IN_TEN_RANGE = 4;
    const MEASURE_UNIT_MILI = 'мили';

    const MEASURE_UNITS = [['лет','год','года','года','года'],
                            ['месяцев','месяц','месяца','месяца','месяца'],
                            ['дней','день','дня','дня','дня'],
                            ['часов','час','часа','часа','часа'],
                            ['минут','минута','минуты','минуты','минуты'],
                            ['секунд','секунда','секунды','секунды','секунды']];
    let resultOutput = document.getElementById(resultOutputId);

    if (!validation('datetime-span-form__btn', DATETIME_VALID_REGEX, [inputFirstId, inputSecondId])){
        resultOutput.innerText = 'введите корректную дату'
        resultOutput.className = 'form__input--invalid'
        return;
    }
    //document.getElementById('datetime-span-result').className = 'form__input--valid';
    resultOutput.className = 'form__input--valid';
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
        if (resultMonth === (MONTH_IN_YEAR_FROM_ZERO + 1)) {
            resultYears++;
            resultMonth = 0;
        }
        currentMonth = (currentMonth === (MONTH_IN_YEAR_FROM_ZERO)) ? 0 : ++currentMonth;
    }
    /*add years & month in result array*/
    resultSpan.splice(0,0, resultYears, resultMonth);
    /*add measure units for output*/
    let answerStr = '';
    resultSpan.forEach((timeUnit, i) => {
        let str = '';
        let j  = parseInt(timeUnit.toString().substr(-1));
        if (i === MEASURE_UNITS.length) {
            str = MEASURE_UNIT_MILI;
            --i;
        }
        if ((timeUnit > MEASURE_UNITS_TEEN_LO_RANGE && timeUnit < MEASURE_UNITS_TEEN_HI_RANGE) || (j > MEASURE_UNITS_IN_TEN_RANGE)) {
            j = 0;
        }
        str += MEASURE_UNITS[i][j];

        answerStr += ((resultSpan[i].toString().concat(' ',str,' ')));
    });
    resultOutput.innerText = answerStr;
}

///////////////////TASK_4_CHESSBOARD/////////////////////////
function drawChessboard(inputFirstId, inputSecondId, resultOutputId) {
    const CHESSBOARD_SIZE_VALID = /^\d+$/;
    const MAX_SIZE = 200;
    let resultOutput = document.getElementById(resultOutputId);
    if (!validation('chess-board-form__btn', CHESSBOARD_SIZE_VALID, [inputFirstId, inputSecondId])){
        resultOutput.innerText = 'enter correct chessboard size';
        resultOutput.className = 'form__input--invalid'
        return;
    }
    resultOutput.className = 'form__input--valid';
    resultOutput.innerText = '';

    let colNum = document.getElementById(inputFirstId).value;
    let rowNum = document.getElementById(inputSecondId).value;
    const res = document.getElementById(resultOutputId);
    for (let row = 0; row < rowNum; row ++) {
        for (let col = 0; col < colNum; col++) {
            let cell = document.createElement('div');
            cell.className = 'row ';
            if ((col + row) % 2 === 0) {
                cell.className += 'black-cell'
            } else {
                cell.className += 'white-cell'
            }
            cell.append('__');
            res.append(cell);
        }
        cell = document.createElement('div');
        cell.className = 'col';
        res.append(cell);
    }
}
///////////////////TASK_5_LINKS_CHECK/////////////////////////
function outputCheckedLinksWithoutHTTPs(inputTextId, resultOutputId){
    const IPv4_VALID = /^(?:(?:(?:\d{1,3})\.){3})(?:\d{1,3})$/;
    //const LINK_VALID = /^(http(s?):\/\/)(www\.)?(((\w{2,63})\.)+((\w{2,63})\.?))$/i;
    const LINK_VALID = /^(?:http(s?):\/\/)(?:www\.)?(?:(?:(?:[-a-z0-9]{2,63})\.)+(?:(?:[-a-z0-9]{2,63})(\.?|\/?)))$/i;
    const LINK_HTTPs = /^(?:http(s?):\/\/)/i;
    const INVALID_DASH_AND_UNDERSCORE_TEST = /-(?=-)|\.(?=-)|-(?=\.)|_/;
    const LINK_MAX_LENGTH = 255;

    const inputStr = document.getElementById(inputTextId).value;
    const inputArray = inputStr.split(',');
    //const outputArray = [];
    let outputArray = new Map();

    function isValidLinkOrIPv4(str) {
        return (IPv4_VALID.test(str)||((LINK_VALID.test(str))&&(!INVALID_DASH_AND_UNDERSCORE_TEST.test(str))&&(str.length <= LINK_MAX_LENGTH)));
    }

    inputArray.forEach(str => {
        //console.log(str);
        if (isValidLinkOrIPv4(str)){
            outputArray.set(str, str.replace(LINK_HTTPs,''));
        }
    });

    const outputDiv = document.getElementById(resultOutputId);

    outputArray =  new Map([...outputArray.entries()].sort((a, b) => {
        let x = a[1].toLowerCase();
        let y = b[1].toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    }));

    outputArray.forEach((value, key) =>{
        const link = document.createElement('a');
        link.className = 'col';
        link.setAttribute('href',key);
        link.setAttribute('target', '_blank');
        link.innerText = value;
        outputDiv.appendChild(link);
    });
}
///////////////////TASK_6_MARK_MATCHING/////////////////////////
function outputMarkedText(inputTextId, inputRegexpId,resultOutputId) {
    const inputStr = document.getElementById(inputTextId).value;
    const resultOutputEl = document.getElementById(resultOutputId);
    const labelEl = document.getElementById('mark-text-form__input-regexp-label');
    let inputRegExp;
    /*regexp or string searching for mark*/
    try {
        inputRegExp = new RegExp(document.getElementById(inputRegexpId).value,'g');
        labelEl.innerText = 'now regExp searching';
    } catch {
        labelEl.innerText = 'now just string searching';
        /*escape spec. symbols*/
        inputRegExp = new RegExp(document.getElementById(inputRegexpId).value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),'g')
    }

    /*validation*/
    if (!validation('mark-text-form__btn', NOT_EMPTY_VALID,['mark-text-form__text','mark-text-form__input-regexp'])){
        resultOutputEl.innerHTML = 'please, enter strings in empty fields';
        return;
    }

    let resultStr = inputStr;
    /*insert string into target from specified index*/
    function insert(targetStr, indexForInsertion, insertingStr) {
        return targetStr.substr(0, indexForInsertion) + insertingStr + targetStr.substr(indexForInsertion);
    }
    /*array for matched by regexpr result*/
    let marked;
    /*correction for <mark>.length=6 </mark>.length=7 tegs length*/
    let totalLengthMarkTegCorrection = 0;

    while ((marked = inputRegExp.exec(inputStr)) !== null){
        resultStr = insert(resultStr, inputRegExp.lastIndex - marked[0].length + totalLengthMarkTegCorrection, '<mark>');
        totalLengthMarkTegCorrection += '<mark>'.length;
        resultStr = insert(resultStr, inputRegExp.lastIndex + totalLengthMarkTegCorrection, '</mark>');
        totalLengthMarkTegCorrection += '</mark>'.length;
    }

    resultOutputEl.innerHTML = '<p>'+resultStr+'</p>';

}

