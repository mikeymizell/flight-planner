currencyAmountEl = document.getElementById("amount")
currencyResultEl = document.getElementById("result")
currencies = document.querySelectorAll(".currency-choices")
exchangeButtonEl = document.getElementById("currency-exchange")
fromCurrencyEl = document.querySelector(".from-currency select")
toCurrencyEl = document.querySelector(".to-currency select")
var y = document.getElementById("y")


for (let i = 0; i < currencies.length; i++) {
    for (differentCurrencies in PossibleCurrencies) {
        // console.log(differentCurrencies)
        var optioninHtml = `<option value="${differentCurrencies}">${differentCurrencies}-${PossibleCurrencies[differentCurrencies]}</option>`;
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
            currencyResultEl.classList.add("has-text-danger-dark")
            currencyResultEl.classList.add("has-background-success")
            currencyResultEl.classList.add("has-text-weight-semibold")
            currencyResultEl.classList.add("is-size-1")
            currencyResultEl.innerText = `${currencyAmountVal} ${fromCurrencyEl.value} = ${totalPrice} ${toCurrencyEl.value} 
            
            
            "Click anywhere to continue!" `;
         
    })});
}

exchangeButtonEl.addEventListener("click", function(event){
    // event.preventDefault();
    convertCurrency();
    currencyResultEl.style.display = "block"
            y.onclick = function() {
                currencyResultEl.style.display = "none";
              }
              
              window.onclick = function(event) {
                if (event.target == currencyResultEl) {
                  currencyResultEl.style.display = "none";
                }
              }
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
var errorMessageEl = document.getElementById("errormodal");
var noResultEl = document.getElementById("noresult");
var span = document.getElementsByClassName("close")[0];
var x = document.getElementById("x");
var searchInput = searchAirportsEl.value;

var passengerCountEl = document.querySelector(".passengerCount select");

noResultEl.style.display = "none";
errorMessageEl.style.display = "none";
airportSearchResultsEl.style.display = "block";

function findairports(searchInput){
    airportSearchResultsEl.style.display = "block";

    searchInput = searchAirportsEl.value;
    const searchArr = searchInput.split(" ");
    if (searchArr.length > 1) {
        searchInput = searchArr[0];
        for (i = 1; i < searchArr.length; i++) {
            searchInput = searchInput + "%20" + searchArr[i];
        }
    }

    fetch("https://priceline-com-provider.p.rapidapi.com/v1/flights/locations?name=" + searchInput, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
            "x-rapidapi-key": "b2ee2a2fbdmsh548f57564d17ed2p16a25ejsnd697d752212c"
        }
    })
    .then(response => {
        return response.json();
    }).then (function(results){
        console.log(results);

        airportSearchResultsEl.innerHTML="";
        if(results.length < 1  ){
            // alert("hi")
            
            // noResultEl.classList.add("has-background-black")
            // noResultEl.classList.add("has-text-danger-dark")
            // noResultEl.classList.add("has-text-weight-light")
            // noResultEl.style.display="block"
            noResultEl.style.display = "block"
            span.onclick = function() {
                noResultEl.style.display = "none";
              }
              
              window.onclick = function(event) {
                if (event.target == noResultEl) {
                  noResultEl.style.display = "none";
                }
              }
        }

        for (let i = 0; i < results.length; i++) {
            console.log(results[i].itemName)
            var airportList =  results[i].cityCode;
            var placeName =  results[i].cityName + ", " + results[i].provinceName;
            var countryName =  results[i].countryCode;
            var eachAirport = document.createElement("li");
            eachAirport.classList.add("has-text-danger-dark")
            eachAirport.classList.add("has-background-black")
            eachAirport.classList.add("has-text-weight-semibold")
            eachAirport.classList.add("is-size-5")
            
            eachAirport.textContent = "Airport code : "+" "+ airportList.replace('-sky','') + ". " + "Located in : " +" "+ placeName + ". " + "Country: " +" "+ countryName ;
            
            airportSearchResultsEl.append(eachAirport);
        }
    })
    .catch(err => {
        console.error(err);
    });
    saveAirports();
}

searchAirportsBtn.addEventListener("click", findairports);


function flightQuotes(){
    errorMessageEl.style.display = "none";
    var fromInput = fromFlightEl.value;
    var toInput = toFlightEl.value;
    // $(function() {
    //     $(departureDateEl).datepicker();
    //   } );
    var departureDateInput = departureDateEl.value;


//    $(function(){ $("#from-date").datepicker()});
    // $(departureDateInput).datepicker({
    //     minDate: 1
    //   });
    var returnDateInput = returnDateEl.value;
    
    var passengerCount = passengerCountEl.value;
    console.log(passengerCount);

    var tripType;
    if (document.getElementById('ROUND_TRIP').checked) {
        tripType = "ROUND_TRIP";
    }
    else if (document.getElementById('ONE_WAY').checked) {
        tripType = "ONE_WAY";
    }
    console.log(tripType);

    fetch("https://priceline-com-provider.p.rapidapi.com/v1/flights/search?sort_order=PRICE&location_departure=" + fromInput
            +"&date_departure=" + departureDateInput + "&class_type=ECO&location_arrival=" + toInput 
            + "&itinerary_type=" + tripType + "&price_max=20000&date_departure_return=" + returnDateInput 
            + "&duration_max=2051&number_of_stops=0&price_min=100&number_of_passengers=" + passengerCount,{
	    method: "GET",
	    headers: {
		    "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
		    "x-rapidapi-key": "b2ee2a2fbdmsh548f57564d17ed2p16a25ejsnd697d752212c"
	    }
    })
    .then(function(response){
       return response.json()
    })
        .then(function(results){
            console.log(results);
            // function d(some){
            //     console.log("there")
            //     currentCountryCurrencyEl.innerHTML = "";
            //     resultingFlightEl.innerHTML = "";
            //     errorMessageEl.style.display = "block";
            //     errorMessageEl.textContent="Please try your request later";
            //     errorMessageEl.style.display = "block";
            // }
            // if( (results.code && results.code === 429)){
            //     console.log(results);

            //     let  myPromise =  new Promise(function(resolve, reject){
            //         resolve("")
            //         reject("there was an error")

            //         myPromise.then(
            //             function(value){d(value)},
            //             function(error){d(error)}

            //             )

            //         return myPromise
            //     })
            // }
             resultingFlightEl.innerHTML = "";
            for (let i = 0; i < results.Quotes.length; i++) {
                var ratesEl = results.Quotes[i].MinPrice;
                rates = document.createElement("li");
                rates.classList.add("has-background-black")
                rates.classList.add("is-size-5")
                // rates.classList.add("has-text-danger-dark")
                rates.classList.add("has-text-weight-semibold")
                rates.textContent = "Your trip will cost : "+ ratesEl + " $ ; through : " + results.Carriers[i].Name;
                resultingFlightEl.appendChild(rates);
            }
            // for (let i = 0; i < results.Places.length; i++) {
            for (let i = 0; i < results.Places.length; i++) {
                
            
            var destinationCountry = results.Places[1].CountryName;
            console.log(destinationCountry);
            var departureCountry = results.Places[0].CountryName;
            console.log(departureCountry);
            // var destinationCountry= "";
            // var departureCountry = "";



            function getCountryCurrency(){
                currentCountryCurrencyEl.innerHTML = "";
                for (var key of Object.keys(countriesCurrencies)) {
                    // if(countriesCurrencies[key] === destinationCountry || countriesCurrencies[key] === departureCountry){
                    if(countriesCurrencies[key] === destinationCountry || countriesCurrencies[key] === departureCountry){

                        var twoCurrencies1 = document.createElement("li");
                        var twoCurrencies2 = document.createElement("li");
                        twoCurrencies1.classList.add("has-background-black")
                        twoCurrencies1.classList.add("has-text-danger-dark")
                        twoCurrencies1.classList.add("has-text-weight-semibold")
                        twoCurrencies1.classList.add("is-size-6")
                        twoCurrencies2.classList.add("has-background-black")
                        twoCurrencies2.classList.add("has-text-danger-dark")
                        twoCurrencies2.classList.add("has-text-weight-semibold")
                        twoCurrencies2.classList.add("is-size-6")
                        // twoCurrencies1.textContent= key;
                        twoCurrencies2.textContent= "The currencies needed are: " + key;
                        currentCountryCurrencyEl.append(twoCurrencies1);
                        currentCountryCurrencyEl.append(twoCurrencies2);
                        // currentCountryCurrencyEl.textContent = key;
                        
                    }}
                    
                
             
            }
            }   
            getCountryCurrency();
            return destinationCountry;
        })
         
    .catch(err => {
	console.log(err);
    currentCountryCurrencyEl.innerHTML = "";
    resultingFlightEl.innerHTML = "";
    // errorMessageEl.classList.add("has-background-black")
    // errorMessageEl.classList.add("has-text-danger-dark")
    // errorMessageEl.classList.add("has-text-weight-light")
    // errorMessageEl.style.display = "block";
    errorMessageEl.style.display = "block"
    x.onclick = function() {
        errorMessageEl.style.display = "none"
      }
      
      window.onclick = function(event) {
        if (event.target == errorMessageEl) {
          errorMessageEl.style.display = "none";
        }
      }
    
    
    });
}

// var getCurrencyApiKey = "c2709f46f398d9368763b061a9735a35";
// var getCurrencyURL = "http://api.countrylayer.com/v2/all?access_key=" + getCurrencyApiKey ;


flightQuotesBtn.addEventListener("click", flightQuotes);



var searchedAirportsBtn = document.getElementById("searchedairbtn");
var deleteHistoryBtn = document.getElementById("deletehistorybtn");
var searchHistoryEl = document.getElementById("searchhistory");
var searchedAirports = JSON.parse(localStorage.getItem("airports")) || [];

function saveAirports(){
    searchHistoryEl.style.display = "none";
    var airportname = searchAirportsEl.value;
    if (searchedAirports.indexOf(airportname) === -1) {
        searchedAirports.push(airportname);
        localStorage.setItem("airports", JSON.stringify(searchedAirports));
    }
    loadAirports();
    return searchedAirports.value;
}

function loadAirports(){
    searchHistoryEl.style.display = "none";
    searchHistoryEl.innerHTML = "";
    var loadAirports =   JSON.parse(localStorage.getItem("airports")) || [];

    for (let i = 0; i < loadAirports.length; i++) {
        var airport = loadAirports[i];
       
        var searchedHistoryEl = document.createElement("li");
        searchedHistoryEl.setAttribute("value", loadAirports[i]);
        searchedHistoryEl.classList.add("has-background-black")
        searchedHistoryEl.classList.add("is-success")
        searchedHistoryEl.textContent = airport;
        // searchedHistoryEl.addEventListener("click", function(event){
        //     searchAirportsEl.innerHTML = "";
        //     findAirports(loadAirports[i]);
        //     event.preventDefault();
            
            
        // })

        searchHistoryEl.append(searchedHistoryEl);
    }
}

function deleteh(){
    localStorage.clear("airports")
}

searchedAirportsBtn.addEventListener("click", function(){
    loadAirports();
    airportSearchResultsEl.style.display = "none";
    searchHistoryEl.style.display = "block";
})

deleteHistoryBtn.addEventListener("click", deleteh)
