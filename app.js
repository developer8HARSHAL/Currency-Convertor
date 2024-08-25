const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_Ytyf9mVlm6wcCyRUWGkFk4uVrVTUxqKtUcFP2unb";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");

for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  console.log(amtval);
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }

  // Fetch exchange rates
  try {
    let response = await fetch(BASE_URL);
    let data = await response.json();
    
    // Access the exchange rate for the selected currencies
    let rate = data.data[tocurr.value].value / data.data[fromcurr.value].value;
    console.log(`Exchange rate from ${fromcurr.value} to ${tocurr.value} is: `, rate);
    
    // Calculate the converted amount
    let convertedAmount = rate * amtval;
    console.log(`Converted Amount: ${convertedAmount}`);
    
    // Display the result
    document.querySelector(".msg").innerText = `${amtval} ${fromcurr.value} = ${convertedAmount.toFixed(2)} ${tocurr.value}`;
    
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
});
