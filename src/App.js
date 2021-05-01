import { quoteList } from "./quotelist.js";
import logo from "./playbutton.png";
import "./App.css";
//Sweetalert for popup messages
import Swal from 'sweetalert2'

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
var hideNsfwSetting = false;
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
}

//Change the text to display the new quote, so long as it's allowed
function changeDisplayedText() {
  document.getElementById("displayedQuote").innerHTML = quoteText;
}

//Remove the quote from the list
function removeDisplayedQuote() {
  filteredQuotes.splice(newQuoteToSelect, 1);
}

//Check there's quotes left, display a message if none left. If quotes remain, call functions for new quote
function clicky() {
  if (filteredQuotes.length === 0) {
    console.log("outta quotes");
    Swal.fire({
      title: 'Happy now?',
      text: "You've clicked through all the bloody quotes!",
      icon: 'success',
      confirmButtonText: "I'm greedy.",
    });
    document.getElementById("displayedQuote").innerHTML = "We're done here.";
  } else {
    document.getElementById('misterClicky').style.animation="App-logo-spin 1s ease-out";
    selectNewQuote();
    changeDisplayedText();
    removeDisplayedQuote();
  }
}

export default App;
