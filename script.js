/* CONSTANTS */
const NUMBER_VALID_REGEX = /^-?\d+$/;   //for task_1 regexp


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
/*validation */
function validation(btnId, regTemplate, inputsId){

    let isAllInputsValid = true;

    inputsId.forEach((currentId, i, inputsId) => {
        const currentInput = document.getElementById(currentId);

        if (!regTemplate.test(document.getElementById(currentId).value)){
            currentInput.className = 'sum-form__input--invalid';
            isAllInputsValid = false;
        } else {
            currentInput.className = 'sum-form__input--valid';
        }
    });

    document.getElementById(btnId).disabled = !isAllInputsValid;
    return isAllInputsValid;
}

function transferFromSecond(inputId){
    const timeInSecond = document.getElementById(inputId).value;
    const resultTimeTransform = document.getElementById('resultTimeTransform');
    const date = new Date(null);
    resultTimeTransform.innerText = timeInSecond;

}

function test(){
    const obj = {name:"tim", age:39};
    console.log(typeof obj);
    alert('hello');
}

