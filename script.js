const NUMBER_VALID_REGEX = /^-?\d+$/;

/* between two specified numbers, sum numbers only if they are ending for 2, 3, 7*/
function getSum(inputsId) {

   /* const sumForm = document.getElementById("sumForm");
    const addendFirst = sumForm[1].value;
    const addendSecond = sumForm[2].value;*/
    const addendFirst = document.getElementById(inputsId[0]).value;
    const addendSecond = document.getElementById(inputsId[1]).value;
    const resultOutput = document.getElementById("resultOutput");

    /*sum specified numbers in range*/
    let sumSpecNum = (a , b ) => {
        if (a === '' || b === '') {
            return "please, enter data in empty field"
        }
        if (isNaN(a) || isNaN(b)) {
            return "please, enter correct data for sum calculate"
        }

       /* if (const errors = hasErrors()) {
            displayErrors(errors);
            return;
        }*/

        a = parseInt(a);
        b = parseInt(b);
        let minNum = a < b ? a : b;
        b = a + b - minNum;

        a = 0;

        for (let i = minNum; i <= b; i++){
            if (isSpecNum(i)){
               a += i;
            }
        }
        return a;
    };

    /*is number end with 2 or 3 or 7*/
    let isSpecNum = (num) => {
        num = (Math.abs(num)) % 10;
        return (num === 2) || (num === 3) || (num === 7);

    };
    resultOutput.innerText = sumSpecNum(addendFirst, addendSecond);
}


function validationAndTaskRun(func, regTemplate, btnId, ...inputsId){

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
    /*if (isAllInputsValid && func !== null)*/ func(inputsId);


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

