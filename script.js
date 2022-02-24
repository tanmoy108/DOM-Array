const addUser = document.getElementById("add-user");
const doubleMoney = document.getElementById("double-money");
const showM = document.getElementById("show-only-milionary");
const showR = document.getElementById("sort-richest");
const calculate = document.getElementById("calculate-money");
const table = document.getElementById("table");

getUser();
getUser();
getUser();

let dataArray = [];

async function getUser() {
  const fetchValue = await fetch("https://randomuser.me/api");
  const data = await fetchValue.json();
  const result = data.results[0];

  const objUser = {
    name: `${result.name.first} ${result.name.last}`,
    moneyvalue: Math.floor(Math.random() * 1000000),
  };

  objToArray(objUser);
}

function objToArray(obj) {
  dataArray.push(obj);

  domUpdate(dataArray);
}

function domUpdate(arrayData) {
  table.innerHTML = `<h3 class="head" ><strong>Person</strong>Money($)</h3>`;
  arrayData.forEach(function (value) {
    const createElement = document.createElement("div");
    const createh2 = document.createElement("h3");
    createh2.innerHTML = ` <strong>${value.name}</strong>${value.moneyvalue}`;
    let a = createElement.appendChild(createh2);
    table.appendChild(a);
  });
}

function doublefunction() {
  dataArray = dataArray.map((value) => {
    return { ...value, moneyvalue: value.moneyvalue * 2 };
  });
  domUpdate(dataArray);
}

function showMillionaires() {
  dataArray = dataArray.filter((value) => value.moneyvalue > 1000000);
  domUpdate(dataArray);
}

function richfunction() {
  dataArray = dataArray.sort((a, b) => b.moneyvalue - a.moneyvalue);
  domUpdate(dataArray);
}

const total = () => {
  let totalValue = dataArray.reduce(
    (total, value) => (total = total + value.moneyvalue),
    0
  );
  console.log(totalValue);
  const createhead = document.createElement("h3");
  createhead.innerHTML = ` <strong>Total Value</strong>${totalValue}`;
  table.appendChild(createhead);
};

addUser.addEventListener("click", getUser);
doubleMoney.addEventListener("click", doublefunction);
showM.addEventListener("click", showMillionaires);
showR.addEventListener("click", richfunction);
calculate.addEventListener("click", total);
