const firstSelection = document.querySelector("#firstCoin");
const secondSelection = document.querySelector("#secondCoin");
const calculateBtn = document.querySelector("#calculate");
const convertedCoin = document.querySelector(".howMany");
let currencies;

const calculateCurrency = () => {
  const firstId = firstSelection.value;
  const secondId = secondSelection.value;
  const howMuch = Number(document.querySelector(".coinInput").value);
  let firstCoinValue;
  let secondCoinValue;
  let converted;

  if (howMuch) {
    currencies.forEach((cur) => {
      if (cur.id === firstId) {
        firstCoinValue = cur.current_price;
      }
      if (cur.id === secondId) {
        secondCoinValue = cur.current_price;
        // document.querySelector(".coinIcon").src = cur.image;
      }
    });
    converted = (firstCoinValue * howMuch) / secondCoinValue;
    convertedCoin.textContent = converted;
    console.log(converted);
  } else {
    alert("Enter number pls");
  }
};

const fillSelections = (data) => {
  // for (id of data) {
  //   let html = `<option value="bitcoin">Bitcoin</option>`;
  //   firstSelection.insertAdjacentHTML("afterbegin", html);
  // }

  data.forEach((e) => {
    let html = `<option value=${e.id}>of ${e.name} </option>`;
    let html2 = `<option value=${e.id}>${e.name}</option>`;
    firstSelection.insertAdjacentHTML("beforeend", html);
    secondSelection.insertAdjacentHTML("beforeend", html2);
  });
  currencies = data;
};

fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap&per_page=100&page=1&sparkline=false"
)
  .then((res) => res.json())
  .then((data) => {
    fillSelections(data);

    console.log(data);
  })
  .catch((er) => console.log(er));

calculateBtn.addEventListener("click", calculateCurrency);
