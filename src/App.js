import { quoteList } from "./quotelist.js";
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p id="displayedQuote">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <button id="clickybutton">Let's get this party started</button>
      </header>
    </div>
  );
}

//Declare variables
var quoteArray = "No quote selected yet";
var quoteText = "No quote selected yet";
var newQuoteToSelect = "No quote selected yet";

// Count remaining quotes
var remainingQuotes = quoteList.length;
console.log("There are " + remainingQuotes + " quotes remaining");

//Select a random quote
function selectNewQuote() {
  newQuoteToSelect = Math.floor(Math.random() * quoteList.length);
  console.log("Selecting array index " + newQuoteToSelect);
  quoteArray = quoteList[newQuoteToSelect];
  quoteText = quoteArray[0];
  console.log(quoteText);
}

//Change the text to display the new quote
function changeDisplayedText() {
  document.getElementById("displayedQuote").innerHTML = quoteText;
}

//Remove the quote from the list
function removeDisplayedQuote() {
  quoteList.splice(newQuoteToSelect, 1);
  console.log("There are now " + quoteList.length + " quotes remaining");
}

//Click button for magic to happen
window.onload=function(){
const buttonElement = document.getElementById("clickybutton");
buttonElement.addEventListener("click", () => {
  if (quoteList.length === 0) {
    console.log("outta quotes");
    document.getElementById("displayedQuote").innerHTML = "Out of quotes!";
  } else {
    selectNewQuote();
    changeDisplayedText();
    removeDisplayedQuote();
  }
});
}

export default App;


