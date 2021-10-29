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





// var destination = "OAK" + "-sky"
var fromFlightEl = document.getElementById("from-flight");
var toFlightEl = document.getElementById("to-flight");
var departureDateEl = document.getElementById("from-date");
var returnDateEl = document.getElementById("return-date");
var flightQuotesBtn = document.getElementById("flight-quotes");
var resultingFlightEl = document.getElementById("resuling-flight");
var currentCountryCurrencyEl= document.getElementById("countrycurrency");
var searchAirportsEl = document.getElementById("searchairports");
var airportSearchResultsEl = document.getElementById("airportsearchresults");
var searchAirportsBtn = document.getElementById("searchairportsbtn");




function findairports(){
    var searchInput = searchAirportsEl.value;

    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=" + searchInput, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "13296de5camsh8863768bdc0c0f8p1ad10bjsnec10eb3ec9a4"
        }
    })
    .then(response => {
        return response.json();
    }).then (function(results){
        console.log(results);
        for (let i = 0; i < results.Places.length; i++) {
            // console.log(results.Places)
            var airportList =  results.Places[i].PlaceId;
            var placeName =  results.Places[i].PlaceName;
            var countryName =  results.Places[i].CountryName;
            var eachAirport = document.createElement("li");
            eachAirport.textContent = "Airport code: "+" "+ airportList.replace('-sky','') + " " + "located in :" +" "+ placeName + " " + "Country " +" "+ countryName ;
            airportSearchResultsEl.append(eachAirport);
            
        }
    })
    .catch(err => {
        console.error(err);
    });
}

searchAirportsBtn.addEventListener("click", findairports);


function flightquotes(){
    var fromInput = fromFlightEl.value + "-sky";
    var toInput = toFlightEl.value + "-sky";
    // $(function() {
    //     $(departureDateEl).datepicker();
    //   } );
    var departureDateInput = departureDateEl.value;
    // $(departureDateInput).datepicker({
    //     minDate: 1
    //   });
    var returnDateInput = returnDateEl.value;
    

    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/"+ fromInput +"/"+ toInput + "/" + departureDateInput +"?inboundpartialdate=" + returnDateInput ,{
	    method: "GET",
	    headers: {
		    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
		    "x-rapidapi-key": "13296de5camsh8863768bdc0c0f8p1ad10bjsnec10eb3ec9a4"
	    }
    })
    .then(function(response){
       return response.json()
    })
        .then(function(results){
            console.log(results);
            for (let i = 0; i < results.Quotes.length; i++) {
                var ratesEl = results.Quotes[i].MinPrice;
                rates = document.createElement("li");
                rates.textContent = "Your trip will cost "+ ratesEl + "$ through " + results.Carriers[i].Name;
                resultingFlightEl.appendChild(rates);
            }
            for (let i = 0; i < results.Places.length; i++) {
                
            
            var destinationCountry = results.Places[1].CountryName;
            var departureCountry = results.Places[0].CountryName;


            function getCountryCurrency(){
                for (var key of Object.keys(countriesCurrencies)) {
                    if(countriesCurrencies[key] === destinationCountry || countriesCurrencies[key] === departureCountry){
                        if (destinationCountry = "Austria"||"Belgium"||"Cyprus"||"Estonia"||"Finland"||"France"||"Germany"||"Greece"||"Ireland"||
                        "Italy"||"Latvia"||"Lithuania"||"Luxembourg"||"Malta"||"Netherlands"||"Portugal"||"Slovakia"||"Slovenia"||"Spain"){
                            destinationCountry = "European Union"
                        }
                        if (departureCountry = "Austria"||"Belgium"||"Cyprus"||"Estonia"||"Finland"||"France"||"Germany"||"Greece"||"Ireland"||
                        "Italy"||"Latvia"||"Lithuania"||"Luxembourg"||"Malta"||"Netherlands"||"Portugal"||"Slovakia"||"Slovenia"||"Spain"){
                            departureCountry = "European Union"
                        }
                        var twoCurrencies1 = document.createElement("li");
                        var twoCurrencies2 = document.createElement("li");
                        // twoCurrencies1.textContent= key;
                        twoCurrencies2.textContent= "The currencies needed are: " + key;
                        currentCountryCurrencyEl.append(twoCurrencies1);
                        currentCountryCurrencyEl.append(twoCurrencies2);
                        // currentCountryCurrencyEl.textContent = key;
                        
                    }
                    
                }
             
            }
            }   
            getCountryCurrency();
            return destinationCountry;
        })
    
    .catch(err => {
	console.error(err);
    });
}

// var getCurrencyApiKey = "c2709f46f398d9368763b061a9735a35";
// var getCurrencyURL = "http://api.countrylayer.com/v2/all?access_key=" + getCurrencyApiKey ;


flightQuotesBtn.addEventListener("click", flightquotes);