/* Create the global variables that will hold 
specific elements of the html file*/

const input = document.querySelector(".input");

const output = document.querySelector(".output");

const equals = document.querySelector(".equals");

const buttons = document.querySelectorAll(".number");

const clear = document.querySelector(".clear");

/* Create global variables that will hold 
the result of the functions*/

let string = "";

let array;

let operator;

let add;

let sub;

let multiply;

let divide;

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
    

    if (string.indexOf("-")!== -1){
        array = string.split("-");
        //operator = "-";
        console.log(array);

        array= array.map(included =>{
            if(included.indexOf("/")!== -1){
                let inc = included;
                inc = inc.split("/");
                return division(inc);
            }else if(included.indexOf("*")!== -1){
                let inc = included;
                inc = inc.split("*");
                return multiplication(inc);
            }else{
                return included;
            }

        });
        
        subtraction(array);
    }

    if (string.indexOf("+")!== -1){
        array = string.split("+");
        operator = "+";
    }

    if (string.indexOf("*")!== -1){
        array = string.split("*");
        //operator = "*";
    }

    if (string.indexOf("/")!== -1){
        array = string.split("/");
        //operator = "/";
    }


    if(operator === "+"){

        addition(array);

    }else if(operator === "-"){

        subtraction(array);

    }else if(operator === "*"){

        multiplication(array);

    }else if(operator === "/"){

        division(array);

    }
});

// Add each value of the array and returns the result

function addition(array){
    add = array.reduce((added,number)=>{
       return added += Number(number);
    },0);

    return add;

    output.textContent = add;
}

// Subtract each value of the array and returns the result

function subtraction(array){

    sub = array.reduce((subtract,number)=>{
        return subtract-= number;
    });

    //return sub;

    output.textContent = sub;
}

// Murliply each value of the array and returns the result

function multiplication(arr){
    multiply = arr.reduce((multi,number)=>{
        return multi *= number;
    });

    return multiply;

    output.textContent = multiply;
}

// Divide each value of the array and returns the result

function division(arr){
    divide = arr.reduce((div,number)=>{
        return div /= number;
    });

    return divide;

    output.textContent = divide;
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
})