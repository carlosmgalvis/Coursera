# 📘 Interest Rate Calculator

> A simple web application built with HTML, CSS, and JavaScript that allows you to calculate:

- Simple interest
- Total amount payable
- Calculation breakdown

Ideal for educational projects, JavaScript demonstrations, or DOM manipulation practice.

## 🚀 Features

- Clean, minimalist interface.
- Inputs for:
  - Principal (P)
  - Rate (%) (R)
  - Time (Years) (T)

- Instant calculation upon clicking the **Calculate** button.
- Results displayed dynamically on screen.
- Separate functions for:
  - Simple interest calculation.
  - Total amount calculation.
- Compatible with Node.js testing via `module.exports`.

## 📂 Project Structure

```Code
/
├── index.html
├── style.css
└── script.js
```

## 🧮 Formulas

### Simple Interest

$$ Interest = \frac {𝑃⋅R⋅𝑇} {100} $$

### Total Amount

$$ Total Amount = 𝑃 + Interest $$

## 📄 Main Code

### JavaScript functions

```javascript
const calculateSimpleInterest = (principal, rate, time) => {
  return (principal * rate * time) / 100;
};

const calculateTotalPayableAmount = (principal, interest) => {
  return principal + interest;
};

const calculate = () => {
  let p = Number(document.getElementById("principal").value);
  let r = Number(document.getElementById("rate").value);
  let t = Number(document.getElementById("time").value);

  let simpleInterest = calculateSimpleInterest(p, r, t);
  let amount = calculateTotalPayableAmount(p, simpleInterest);

  let result = document.getElementById("result");

  result.innerHTML = `
        <div>Principal Amount: <span>${p.toFixed(2)}</span></div>
        <div>Total Interest: <span>${simpleInterest.toFixed(2)}</span></div>
        <div>Total Amount: <span>${amount.toFixed(2)}</span></div>
    `;
};

if (typeof module !== "undefined")
  module.exports = {
    calculateSimpleInterest,
    calculateTotalPayableAmount,
    calculate,
  };
```

## 🖥️ How to run

1. Clone the repository:

```bash
git clone <tu-repo>
```

2. Open the file:

```Code
index.html
```

3. Interact with the calculator in your browser.

## 🧪 Test

If you wish to test the functions in Node.js:

```javascript
const {
  calculateSimpleInterest,
  calculateTotalPayableAmount,
} = require("./script.js");

console.log(calculateSimpleInterest(1000, 5, 1)); // 50
console.log(calculateTotalPayableAmount(1000, 50)); // 1050
```

## 📌 Future Improvements

- Input validation.
- Support for compound interest.
- Modern styling using Tailwind or Bootstrap.
- Conversion to an ES6 module.
- TypeScript version.
