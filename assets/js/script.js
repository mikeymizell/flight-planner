var currencyAmountEl = document.getElementById("amount")
var currencyChoicesEl = document.getElementById("currency-choices")
var currencyResultEl = document.getElementById("result")
var currencies = document.querySelectorAll(".currency-choices")

var currencyURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
    fetch(currencyURL).then(function(response){
     response.json().then(function(results){
        //  console.log(results);
         
     })});

for (let i = 0; i < currencies.length; i++) {
    for (differentCurrencies in PossibleCurrencies) {
        // console.log(differentCurrencies)
        var optioninHtml = `<option value="${differentCurrencies}">${differentCurrencies}</option>`;
        currencies[i].insertAdjacentHTML("beforeend", optioninHtml);
    }
}     

