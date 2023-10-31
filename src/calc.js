import React, { useState } from "react";
import "./calc.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");
  
  
  const handleButton = (label) => {
    const isOperator = ["+", "-", "*", "/", "."].includes(label);
    const lastCharIsOperator = inputValue.length > 0 && ["+", "-", "*", "/", "."].includes(inputValue.slice(-1));
  
    if (label === "." && inputValue.includes(".")) {
      return;
    }
  
    if (label === "%" && inputValue.includes("%")) {
      return;
    }
    
    if (isOperator || ["¹/𝓍", "𝓍²", "²√𝓍"].includes(label)) {
        setInputValue(inputValue);
    }

    if (inputValue.length < 30) {
      if (isOperator) {
        if (lastCharIsOperator) return;
  
        setInputValue(inputValue + label);
      } else {
        switch (label) {
          case "=":
            try {
              setOutput(calculateResult(inputValue));
            } catch (error) {
              setOutput("Error");
            }
            break;
          case "C":
            setInputValue("");
            setOutput("");
            break;
          case "CE":
            setInputValue(inputValue.slice(0, -1));
            break;
          case "+/-":
            if (inputValue) {
              setInputValue(inputValue[0] === "-" ? inputValue.slice(1) : "-" + inputValue);
            }
            break;
          case "%":
            setInputValue((parseFloat(inputValue) / 100).toString());
            break;
          case "¹/𝓍":
            setInputValue((1 / parseFloat(inputValue)).toString());
            break;
          case "𝓍²":
            setInputValue((Math.pow(parseFloat(inputValue), 2)).toString());
            break;
          case "²√𝓍":
            setInputValue((Math.sqrt(parseFloat(inputValue)).toString()));
            break;
          default:
            setInputValue(inputValue + label);
            break;
        }
      }
    }
  };
  
  const calculateResult = (expression) => {
    const operators = ["+", "-", "*", "/", "¹/𝓍", "𝓍²", "²√𝓍", "%"];
    const tokens = expression.match(/[+\-*/]|\d+(\.\d+)?|1\/x|x²|2√x|%|(\d+(\.\d+)?)%?/g);
    let stack = [];
    let currentOperator = null;
  
    for (const token of tokens) {
      if (operators.includes(token)) {
        currentOperator = token;
      } else {
        if (currentOperator === null) {
          stack.push(parseFloat(token));
        } else {
          if (currentOperator === "+") {
            stack.push(parseFloat(token));
          } else if (currentOperator === "-") {
            stack.push(-parseFloat(token));
          } else if (currentOperator === "*") {
            stack.push(stack.pop() * parseFloat(token));
          } else if (currentOperator === "/") {
            const divisor = parseFloat(token);
            if (divisor === 0 || divisor === 0.00) {
              return "Not Divisible";
            }
            stack.push(stack.pop() / divisor);
          } else if (currentOperator === "¹/𝓍") {
            stack.push(1 / parseFloat(token));
          } else if (currentOperator === "𝓍²") {
            stack.push(Math.pow(parseFloat(token), 2));
          } else if (currentOperator === "²√𝓍") {
            stack.push(Math.sqrt(parseFloat(token)));
          } else if (currentOperator === "%") {
            stack.push((stack.pop() / 100) * parseFloat(token));
          }
        }
      }
    }
  
    return stack.reduce((acc, num) => acc + num, 0).toString();
  };
  
  
  
  const buttons = [
    "%","C","CE","/","¹/𝓍","𝓍²","²√𝓍",".","7","8","9","*","4","5","6","-","1","2","3", "+","+/-","0", "00", "=",
  ];
  

  const iconStyle = {
    width: "20px",
    height: "25px",
  };

  return (
    <div className="container1">
      <div className="calculator">
        <div className="header">
          <h6>Calculator</h6>
          <span style={{ ...iconStyle, marginRight: "35px" }}> - </span>
          <span style={{ ...iconStyle, marginRight: "34px" }}> ▢ </span>
          <span style={{ ...iconStyle, marginRight: "3px" }}> ｘ </span>
        </div>

        <h4>
          <span style={{ ...iconStyle, marginRight: "5px" }}> ≡ </span>
          Standard
        </h4>
        <form action="">
          <div className="display">
            <input type="text" value={inputValue} readOnly maxLength={8} />
            <div className="displaytwo">
            <input type="text" value={output} readOnly maxLength={8} />
          </div>
          </div>
          <div style={{ width: "100%" }}>
            {buttons.map((label, index) => (
              <input
                key={index}
                type="button"
                value={label}
                onClick={() => handleButton(label)}
                className={label === "=" ? "equal" : ""}
                maxLength={8}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
