import { quoteList } from "./quotelist.js";
import logo from "./playbutton.png";
import "./App.css";
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" integrity="sha256-qM7QTJSlvtPSxVRjVWNM2OfTAz/3k5ovHOKmKXuYMO4=" crossorigin="anonymous"></script>


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="displayedQuote">Let's look at some quotes</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        <img src={logo} id="misterClicky" className="App-logo" alt="logo" onClick={clicky} />
      </header>
    </div>
  );
}

//Declare variables
var quoteArray = "No quote selected yet";
var filteredQuotes = "Array not yet defined";
var quoteText = "No quote selected yet";
var quoteFavourite = false;
var newQuoteToSelect = "No quote selected yet";
var hideNsfwSetting = true;
var totalNumberOfQuotes = 0;
//var clickyButton = document.getElementsByClassName('App-logo');

//Remove any NSFW quotes from the array if they are disabled
if ((hideNsfwSetting === true)) {
  filteredQuotes = quoteList.filter(function(item){return item[2] !== 1 })  
} else {
  filteredQuotes = quoteList
}

// Count remaining quotes
totalNumberOfQuotes = filteredQuotes.length;
console.log("There are " + totalNumberOfQuotes + " quotes to be displayed");

//Select a random quote, put it into variable quoteArray
function selectNewQuote() {
  newQuoteToSelect = Math.floor(Math.random() * filteredQuotes.length);
  console.log("Selecting quote " + (newQuoteToSelect+1) + " of " + filteredQuotes.length);
  quoteArray = filteredQuotes[newQuoteToSelect];
  quoteText = quoteArray[0];
  quoteFavourite = quoteArray[1];
//  console.log("selected quote is: " + quoteArray);
}

//Change the text to display the new quote, so long as it's allowed
function changeDisplayedText() {
  document.getElementById("displayedQuote").innerHTML = quoteText;
}

//Remove the quote from the list
function removeDisplayedQuote() {
  filteredQuotes.splice(newQuoteToSelect, 1);
//console.log("There are now " + filteredQuotes.length + " quotes remaining");
}

function clicky() {
  if (filteredQuotes.length === 0) {
    console.log("outta quotes");
    document.getElementById("displayedQuote").innerHTML = "Out of quotes!";
  } else {
    document.getElementById('misterClicky').style.animation="App-logo-spin 1s ease-out";
    selectNewQuote();
    changeDisplayedText();
    removeDisplayedQuote();
  }
}

export default App;
