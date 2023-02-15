/* eslint-disable */
import React, { useState } from 'react';
import './App.css';


function evaluate(str) {
    let res;
    const operators = "+-*/";
    const values = str.split(/([\+\-\*\/])/);
    let currentOperator = null;
    for (let i = 0; i < values.length; i++) {
        const value = values[i].trim();
        if (value === "") {
          continue;
        }
        if (operators.includes(value)) {
            currentOperator = value;
          }
        else {
           const number = parseFloat(value);
            if (isNaN(number)) {
            throw new Error(`Invalid value: ${value}`);
            }
            
            if (res === undefined) {
              res = number;
            } 
            else {
               switch (currentOperator) {
                   case "+":
                      res += number;
                      break;
                    case "-":
                      res -= number;
                      break;
                    case "*":
                      res *= number;
                      break;
                    case "/":
                      res /= number;
                      break;
                    default:
                      throw new Error(`Unknown operator: ${currentOperator}`);
        }
      }
    }
}

if (res === undefined) {
  throw new Error("Empty expression");
}

return res;
}


const App =() =>{
    const [result, setResult] =useState("") 
    const clear=()=>{
        setResult("");
    }
    const backspace=()=>{
        setResult(result.slice(0,result.length-1));
    }
    const handleClick=(e) =>setResult(result.concat(e.target.name));
    const calc=()=>{
        try{
            if(result.slice(result.length-2,result.length)==='/0'){
                setResult("MathError")
            }
            else{
            setResult(evaluate(result).toString());
            }
        }
        catch(err){
            setResult("Error");
        }
    }
    return (
        <>
<div className='container'>
    <from>
    <input type="text" value ={result}/>
    </from>
    <div className='keyboard'>
        <button className='specialButton' onClick={clear} id="clear">AC</button>
        <button className='specialButton' onClick={backspace} id="backspace" >C</button>
        <button className='specialButton' name ="/" onClick={handleClick}>/</button>
        <button name="7" onClick={handleClick}>7</button>
        <button name="8" onClick={handleClick}>8</button>
        <button name="9" onClick={handleClick}>9</button>
        <button className='specialButton' name="*" onClick={handleClick}>*</button>
        <button name="4" onClick={handleClick}>4</button>
        <button name="5" onClick={handleClick}>5</button>
        <button name="6" onClick={handleClick}>6</button>
        <button className='specialButton' name="-" onClick={handleClick}>-</button>
        <button name="1" onClick={handleClick}>1</button>
        <button name="2" onClick={handleClick}>2</button>
        <button name="3" onClick={handleClick}>3</button>
        <button className='specialButton' name="+" onClick={handleClick}>+</button>
        <button name="0" onClick={handleClick}>0</button>
        <button name="." onClick={handleClick}>.</button>
        <button  className='specialButton' onClick={calc} id="equal">=</button>

    </div>
</div>
        </>
    );
}
export default App;