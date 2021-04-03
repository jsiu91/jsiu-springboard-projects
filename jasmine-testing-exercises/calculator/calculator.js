window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.querySelector('#loan-amount').value = 200000;
  document.querySelector('#loan-years').value = 10;
  document.querySelector('#loan-rate').value = 5;

  const values = {amount: 200000, years: 10, value: 5};

  calculateMonthlyPayment(values);
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  updateMonthly(calculateMonthlyPayment(getCurrentUIValues()));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const amount = values.amount;
  const years = values.years * 12;
  const rate = (values.rate / 100) / 12;
  let monthlyPayment = 0;

  monthlyPayment = amount * rate * (Math.pow(1 + rate, years)) / (Math.pow(1 + rate, years) - 1); 
  monthlyPayment = monthlyPayment.toFixed(2);

  return String(monthlyPayment);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.querySelector('#monthly-payment').innerText = monthly;
}
