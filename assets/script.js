const bill = document.querySelector("#bill");
const numberOfPeople = document.querySelector("#number-of-people");
const tipPercent = document.querySelectorAll(".tip-wrapper p");
const customTip = document.querySelector("#custom");
const resetBtn = document.querySelector(".reset-btn");
const TotalPersonDisplay = document.querySelector(".display-total-person");
const TotalTipDisplay = document.querySelector(".display-total-tip-amount");
const errMsg = document.querySelector(".err-msg");
const u = document.querySelectorAll(".ti");

let tipVal;
let x;
let y;
let z;
let tipObj;

// Store the values in objects for easy retrieve
let billVal;
let NumOfPeople;

let b = { ta: 0 };

// Create and object to store tip
// if the value of the is click once the value will be store sure it can be used for order
// if did this so that once you click on the tip the value is store and use in calculation once the other values has change
tipObj = { tip: 0, bill: 0, people: 0, acitveElement: 0 };

// Vairable
u.forEach((per) => {
  per.addEventListener("click", TipDisplay);
  per.addEventListener("click", TotalDisplay);
  per.addEventListener("click", active);

  // Remove the active class when reset btn is click
  resetBtn.addEventListener("click", (e) => {
    if (per.classList.contains("active")) {
      per.classList.remove("active");
    }
  });
});

bill.addEventListener("keyup", TipDisplay);
bill.addEventListener("keyup", TotalDisplay);
bill.addEventListener("keyup", (e) => {});

numberOfPeople.addEventListener("keyup", TipDisplay);
numberOfPeople.addEventListener("keyup", TotalDisplay);
numberOfPeople.addEventListener("keyup", Erro);

customTip.addEventListener("keyup", TipDisplay);
customTip.addEventListener("keyup", TotalDisplay);

resetBtn.addEventListener("click", (e) => {
  customTip.value = "";
  numberOfPeople.value = "";
  bill.value = "";
  TotalTipDisplay.textContent = "$0.00";
  TotalPersonDisplay.textContent = "$0.00";
});

// Functions
function tipCal(bills, tip, people) {
  if (bills) {
    return (bills * (tip / 100)) / people;
  } else {
    return 0;
  }
}

function totalCal(bill, tip, people) {
  let Tip;
  let totalTip;
  Tip = bill * (tip / 100);
  if (Tip === 0 || !bill) {
    return 0;
  } else {
    totalTip = Tip + bill;
    return totalTip / people;
  }
}

function Erro() {
  if (NumOfPeople == 0) {
    errMsg.style.display = "block";
    numberOfPeople.style.border = "2px solid coral";
  } else {
    numberOfPeople.style.border = "2px solid transparent";
    errMsg.style.display = "none";
  }
}

function active(e) {
  z = tipObj["activeElement"];
  tipObj["activeElement"] = e.target;

  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
  } else {
    if (!z == 0) {
      z.classList.remove("active");
    }
    e.target.classList.add("active");
  }
}

function TipDisplay(e) {
  tipObj["bill"] = bill.value;
  tipObj["people"] = numberOfPeople.value;

  if (tipObj["bill"].length == 0) {
    billVal = 0;
  } else {
    billVal = parseFloat(tipObj["bill"]);
  }

  if (tipObj["people"].length == 0) {
    NumOfPeople = 0;
  } else {
    NumOfPeople = parseFloat(tipObj["people"]);
  }

  // Take tip parcent
  if (e.target.classList.contains("custom")) {
    if (e.target.value.trim().length == 0) {
      x = 0;
    } else {
      x = parseFloat(e.target.value);
    }
    y = parseInt(x);
  } else {
    x = e.target.textContent;
    y = parseInt(x);
  }
  // Convert to integer

  // store the tip value in the object
  if (!(x.length == 0)) {
    tipObj["tip"] = y;
  }

  // Make a tip value a variable
  tipVal = parseFloat(tipObj["tip"]);

  if (!(NumOfPeople === "" || NumOfPeople <= 0)) {
    TotalTipDisplay.textContent = `$${tipCal(
      billVal,
      tipVal,
      NumOfPeople
    ).toFixed(2)}`;
  } else {
    TotalTipDisplay.textContent = "$0.00";
  }
}

function TotalDisplay(e) {
  // tipVal = tipObj["tip"];

  if (
    !(numberOfPeople.value.trim() === "" || numberOfPeople.value.trim() <= 0)
  ) {
    TotalPersonDisplay.textContent = `$${totalCal(
      billVal,
      tipVal,
      NumOfPeople
    ).toFixed(2)}`;
  } else {
    TotalPersonDisplay.textContent = "$0.00";
  }
}
