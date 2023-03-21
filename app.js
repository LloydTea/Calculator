// Initializing "=" Button, Result Input Field, Result Input Label As
const equal = document.getElementById("equal");
const result = document.getElementById("result");
const button_dot = document.getElementById("button_dot");
const history = document.getElementById("history");

//Add A Function To The Equal Button Using addEventListener
equal.addEventListener("click", function () {
  document.getElementById("result").innerHTML = calculate();
});

//Variable Declaration
var dot = "dot";
var signActive = false;
var entry;
var answer;
var counter = 0;
var ArrayCalc = [];

//For Loop To Print All Number Buttons Including Decimal Point and "C"
for (let i = 0; i < 12; i++) {
  if (i == 10) {
    document.getElementById("numbers").innerHTML +=
      '<div class="col-4"> <div class="d-grid px-1 py-2 gap-2"> <button class="btn btn-outline-secondary rounded figures" id="button_dot" onclick="numberClicked(' +
      dot +
      ')" type="button"><i class="bi bi-dot"></i></button> </div> </div>';
  } else if (i == 11) {
    document.getElementById("numbers").innerHTML +=
      '<div class="col-4"> <div class="d-grid px-1 py-2 gap-2"> <button class="btn btn-outline-secondary rounded" id="reset_btn" onclick="reset()" value="AC" type="button">AC</button> </div> </div>';
  } else {
    document.getElementById("numbers").innerHTML +=
      '<div class="col-4"> <div class="d-grid px-1 py-2 gap-2"> <button class="btn btn-outline-secondary rounded figures" id="button_' +
      (9 - i) +
      '" onclick="numberClicked(' +
      (9 - i) +
      ')" type="button">' +
      (9 - i) +
      "</button> </div> </div>";
  }
}

//Number Clicked Function
const numberClicked = (x) => {
  //Assigning A Variable To The Input Value
  entry = result.value;

  //Reset Button String
  if (reset_btn.value == "AC") {
    reset_btn.innerHTML = "C";
    reset_btn.value = "C";
  }
  //Number Condition, Sign Condition, Decimal Point Condition
  if (!Number.isInteger(x) && x != "dot") {
    entry = signChecker(signActive, entry, x);
    signActive = true;
  } else if (entry == "0" && Number.isInteger(x)) {
    entry = x;
    signActive = false;
  } else if (x == dot) {
    entry = deciPoint(entry);
    signActive = false;
  } else {
    entry += x;
    signActive = false;
  }
  result.value = entry;
};

//Sign Checker And Update Function
const signChecker = (x, y, z) => {
  if (x == true) {
    y = y.substring(0, y.length - 3);
  }
  y += " " + z + " ";
  return y;
};

//Decimal Point Function
const deciPoint = (x) => {
  var y = x.substring(x.length - 1);
  if (y == " ") {
    x += "0.";
  } else {
    x += ".";
  }
  return x;
};

//Reset Calculator By Clearing All Entry
const reset = () => {
  ArrayCalc = [];
  answer = 0;
  result.value = 0;
  if (reset_btn.value != "AC") {
    history.innerHTML = "";
  } else {
    reset_btn.innerHTML = "C";
    reset_btn.value = "C";
  }
};

//Calculator Function
const calculate = () => {
  //Empty The Arrary
  ArrayCalc = [];
  try {
    ArrayCalc = entry.split(" ");
    if (ArrayCalc.length > 2 && ArrayCalc[ArrayCalc.length - 1] != "") {
      console.log(ArrayCalc);
      for (let i = 0; i < ArrayCalc.length; i++) {
        if (i == 0) {
          answer = Number(ArrayCalc[i]);
        } else if (i % 2 == 0) {
          // Plus Sign Condition
          if (ArrayCalc[i - 1] == "+") {
            answer += Number(ArrayCalc[i]);
          }
          //Substract Sign Condition
          else if (ArrayCalc[i - 1] == "-") {
            answer -= Number(ArrayCalc[i]);
          }
          //Multiply Sign Conditions
          else if (ArrayCalc[i - 1] == "×") {
            answer *= Number(ArrayCalc[i]);
          }
          //Divide Sign Conditions
          else if (ArrayCalc[i - 1] == "÷") {
            answer /= Number(ArrayCalc[i]);
          }
        }
      }
      result.value = answer;
      history.innerHTML = entry;
    }
  } catch (error) {
    history.innerHTML = "Error";
  }
};
