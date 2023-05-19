/* Create the global variables that will hold 
specific elements of the html file */

const input = document.querySelector(".input");

const output = document.querySelector(".output");

const equals = document.querySelector(".equals");

const buttons = document.querySelectorAll(".number");

const clear = document.querySelector(".clear");

const dot = document.querySelector(".dot");

const operB = document.querySelectorAll("#oper");

const numB = document.querySelectorAll(".num");

const back = document.querySelector(".back");

const message = document.querySelector(".message");

/* Create global variables that will hold 
the result of the functions*/

let string = "";

let array;

let add;

let sub;

let multiply;

let divide;

let num = "";
let numArray = [];
let operArray = [];
let operation = [];
let i = 0;

let last;

let float= true;

let dotAble = false;

let error= false;

let errorM = "";

let op = true;

/* Add an event lintener that on each click
 will display the value each clicked button
 one next to an other and will pass all the values
 to a string variable*/

buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        displayNum(button);
    })
});

function displayNum(button){
    if((button.value!=="." || float) && ((button.value!=="+" && button.value!=="-" && button.value!=="*" && button.value!=="/")|| op)){
        string += button.value;
        input.textContent += button.value;
    }
}

//Allow or not to enter a dot or an operator

dot.addEventListener("click", ()=>{
    float= false;
    op = false;
    dotAble = false;
});

operB.forEach(oper =>{
    oper.addEventListener("click", ()=>{
        dotAble = true;
        float = false;
        op = false;
    });
});

numB.forEach(num =>{
    num.addEventListener("click", ()=>{
        if(dotAble){
            float= true;
        }
        op = true;
    });
});

//Remove last value of string

back.addEventListener("click", backspace);

function backspace(){

    array = string.split("");
    last = array.splice(-1,1);

    let regex2 = /\d/;
    
    if(last[0] === '.'){
        float= true;
        op = true;
        dotAble = true;
    }

    if(last[0]=== '+'|| last[0]=== '-'||last[0]=== '*'||last[0]=== '/'){
        op = true;
        if(dotAble && !float){
            float = true;
            dotAble = false;
        }
    }

    if(regex2.test(last)){
        float = false;
        op = false;
    }

    string = array.join("");
    array= [];
    input.textContent = string;
}

window.addEventListener("keydown",(event)=>{
    let key = event.key;
    let regex = /\d|\+|\-|\*|\//;
    if(regex.test(key)){
        string += `${key}`;
        input.textContent = string;
        output.textContent = "";
    }else if(key==="Enter"){
        event.preventDefault();
        calculations();
    }else if(key==="Backspace"){
        backspace();
    }
});

/* On click of the output the result will be 
added to the input field and removed from the
output field*/ 

output.addEventListener("click",()=>{
    if(output.textContent!==""){
        string = output.textContent;
        input.textContent = string;
        output.textContent = "";
    }
});

/* Add an event listener on the equals button
 that converts string to two arrays, one with 
 the numbers and one with the operators, and 
 calls the needed function to make the calculations*/

equals.addEventListener("click",calculations);

function calculations(){

    array = string.split("");

    if(array[0] === "+" || array[0] === "-" || array[0] === "*" || array[0] ==="/" || array[array.length-1] === "+" || array[array.length-1] === "-" || array[array.length-1] === "*" || array[array.length-1] ==="/"){
        message.textContent = "Calculation can not start or end with an operator";
    }else{

        array.forEach(value=>{
            if(value === "+" || value === "-" || value === "*" || value ==="/" ){
                operArray.splice(i,0,value);
                numArray.splice(i,0,num);
                num = "";
                i++;

            }else{
                num += value;

            }
        });

        i++;
        numArray.splice(i,0,num);

        for(let j=0; j<=operArray.length; j++){
            if (operArray[j] === "/"){
                arrayManipulation(j,division);
                j--;

            }else if (operArray[j] === "*"){
                arrayManipulation(j,multiplication);
                j--;
            }
        }

        for(let j=0; j<=operArray.length; j++){
    
            if (operArray[j] === "+"){
                arrayManipulation(j,addition);
                j--;

            }else if (operArray[j] === "-"){
                arrayManipulation(j,subtraction);
                j--;
            }
        }

        message.textContent = errorM;
        if(errorM === "Can not divide by 0"){
            output.textContent = "ERROR";
        }else{
            output.textContent = Math.round(numArray * 10) / 10;
            console.log(output.textContent);
        }
        clearF();
    }
}

function arrayManipulation(j,oper){
    operation = numArray.splice(j,2);
    operArray.splice(j,1);
 
    let newNum = oper(operation);
    numArray.splice(j,0,newNum);
    operation = [];
}

// Add each value of the array and returns the result

function addition(operation){
    add = operation.reduce((added,number)=>{
       return added += Number(number);
    },0);

    return add;
}

// Subtract each value of the array and returns the result

function subtraction(operation){

    sub = operation.reduce((subtract,number)=>{
        return subtract-= number;
    });

    return sub;
}

// Murliply each value of the array and returns the result

function multiplication(operation){
    multiply = operation.reduce((multi,number)=>{
        return multi *= number;
    });

    return multiply;
}

// Divide each value of the array and returns the result

function division(operation){

    for(let k=1; k<operation.length; k++){
        if(operation[k]==="0"){
            errorM = "Can not divide by 0";
            error = true;
        }
    }
    if(!error){
        divide = operation.reduce((div,number)=>{
            return div /= number;
        });

        return divide;
    }

    error= false;
}

/* Add event lintener to clear button that turns
 every variable into an empty one*/ 

clear.addEventListener("click",()=>{
    input.textContent = "";
    output.textContent = "";
    string = "";
    clearF();
    float= true;
    op = true;
    dotAble = false;
    error= false;
});

function clearF(){
    array = [];
    add ="";
    sub = "";
    multiply ="";
    divide ="";
    num = "";
    numArray = [];
    operArray = [];
    operation = [];
    i = 0;
    errorM = "";
}