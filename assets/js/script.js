currencyAmountEl = document.getElementById("amount")
currencyResultEl = document.getElementById("result")
currencies = document.querySelectorAll(".currency-choices")
exchangeButtonEl = document.getElementById("currency-exchange")
fromCurrencyEl = document.querySelector(".from-currency select")
toCurrencyEl = document.querySelector(".to-currency select")


for (let i = 0; i < currencies.length; i++) {
    for (differentCurrencies in PossibleCurrencies) {
        // console.log(differentCurrencies)
        var optioninHtml = `<option value="${differentCurrencies}">${differentCurrencies}</option>`;
        currencies[i].insertAdjacentHTML("beforeend", optioninHtml);
    }
}     

function convertCurrency(){
    var currencyAmountVal = currencyAmountEl.value;


    var currencyURL = `https://v6.exchangerate-api.com/v6/aa73d9d831b172889cb6b7fb/latest/${fromCurrencyEl.value}`;
        fetch(currencyURL).then(function(response){
            response.json().then(function(results){
        //  console.log(results);
            var singleRate = results.conversion_rates[toCurrencyEl.value];
            var totalPrice = (currencyAmountVal * singleRate).toFixed(2);
            currencyResultEl.innerText = `${currencyAmountVal} ${fromCurrencyEl.value} = ${totalPrice} ${toCurrencyEl.value}`;
         
    })});
}

exchangeButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    convertCurrency();
});
