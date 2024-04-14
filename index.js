const grossIncomeInput = document.getElementById('grossIncome');
const extraIncomeInput = document.getElementById('extraIncome');
const ageGroupSelect = document.getElementById('ageGroup');
const deductionsInput = document.getElementById('deductions');
const submitButton = document.getElementById('submit');
const modal = document.getElementById('myModal');
const closeModal = document.getElementById('close');
const resultText = document.getElementById('result');

 

function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function calculateTax(income, age) {
    const taxableIncome = income - 800000;
    if (taxableIncome <= 0) {
        return 0;
    }

    let taxRate;
    if (age < 40) {
        taxRate = 0.3;
    } else if (age >= 40 && age < 60) {
        taxRate = 0.4;
    } else {
        taxRate = 0.1;
    }

    return taxableIncome * taxRate;
}

function validateInputs() {
    let isValid = true;

    if (!isValidNumber(grossIncomeInput.value)) {
         
        isValid = false;
    }  

    if (!isValidNumber(extraIncomeInput.value)) {
         
        isValid = false;
    }  

    if (ageGroupSelect.value === '') {
         
        isValid = false;
    }  

    if (!isValidNumber(deductionsInput.value)) {
        
        isValid = false;
    } 

    return isValid;
}

function calculateOverallIncome() {
    const grossIncome = parseFloat(grossIncomeInput.value) || 0;
    const extraIncome = parseFloat(extraIncomeInput.value) || 0;
    const deductions = parseFloat(deductionsInput.value) || 0;
    const totalIncome = grossIncome + extraIncome - deductions;
    return totalIncome;
}

function getAgeGroup() {
    const ageGroup = ageGroupSelect.value;
    let age;
    if (ageGroup === '<40') {
        age = 30; // Assuming an age of 30 for this group
    } else if (ageGroup === '>=40&<60') {
        age = 50; // Assuming an age of 50 for this group
    } else if (ageGroup === '>=60') {
        age = 65; // Assuming an age of 65 for this group
    }
    return age;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  }

function showResult() {
    const totalIncome = calculateOverallIncome();
    const age = getAgeGroup();
    const tax = calculateTax(totalIncome, age);
    const overallIncome = totalIncome - tax;
     
    resultText.innerHTML=numberWithCommas(overallIncome)
    modal.style.display = 'block';
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (validateInputs()) {
        showResult();
    }
});

closeModal.addEventListener('click', (event) => {
    event.preventDefault();
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});