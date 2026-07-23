// Calculate Simple Interest
const calculateSimpleInterest = (principal, rate, time) => {
    return (principal * rate * time) / 100;
};

// Calculate Total Payable Amount
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

// Export for Node testing (optional)
if (typeof module !== 'undefined')
    module.exports = { calculateSimpleInterest, calculateTotalPayableAmount, calculate };
