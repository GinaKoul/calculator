/* Create the global variables that will hold 
specific elements of the html file */

const input = document.querySelector(".input");

const output = document.querySelector(".output");

const equals = document.querySelector(".equals");

const buttons = document.querySelectorAll(".number");

const clear = document.querySelector(".clear");

/* Create global variables that will hold 
the result of the functions*/

let string = "";

let array;

//let operator;

let add;

let sub;

let multiply;

let divide;

let num = "";
let numArray = [];
let operArray = [];
let operation = [];
let i = 0;

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
    string += button.value;
    input.textContent += button.value;
}

/* Add an event listener on the equals button
 that converts strings to arrays and calls the 
 needed function to do the math*/

equals.addEventListener("click",()=>{

    array = string.split("");

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

        }else if (operArray[j] === "*"){
            arrayManipulation(j,multiplication);
        }
    }

    for(let j=0; j<=operArray.length; j++){
  
        if (operArray[j] === "+"){
            arrayManipulation(j,addition);

        }else if (operArray[j] === "-"){
            arrayManipulation(j,subtraction);
        }
    }

    output.textContent = numArray;

});

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
    divide = operation.reduce((div,number)=>{
        return div /= number;
    });

    return divide;
}

/* Add event lintener to clear button that turns
 every variable into an empty one*/ 

clear.addEventListener("click",()=>{
    input.textContent = "";
    output.textContent = "";
    string = "";
    array = "";
    operator = "";
    add ="";
    sub = "";
    multiply ="";
    divide ="";
});