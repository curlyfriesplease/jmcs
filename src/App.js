import React from "react";
import { quoteList } from "./quotelist.js";
import "./App.css";
//Sweetalert for popup messages
import Swal from "sweetalert2";

//animation and images used by the start screen
import styled, { keyframes } from "styled-components";
//import { FadeInLeft } from "react-animations";
//import FadeInLeft from "@bit/formidablelabs.react-animations.fade-in-left";
import FadeInLeft from "react-animations";
import startImage from "./startScreenImage1.png";

//animation and images used by the main screen
import logo from "./playbutton.png";


//App
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstDivIsActive: true,
    };
  }
  handleSetFirstDivIsActive = () => {
    this.setState({ firstDivIsActive: false });
  };

  render() {
    let activeDiv;

    if (this.state.firstDivIsActive) {
      activeDiv = (
        <StartScreenCompo
          setFirstDivIsActive={this.handleSetFirstDivIsActive}
        />
      );
    } else {
      activeDiv = <MainScreenCompo />;
    }

    return <div>{activeDiv}</div>;
  }
}



//Start Screen component
class StartScreenCompo extends React.Component {

  
  render() {
    const FadeInLeftAnimation = keyframes`${FadeInLeft}`;
const FadeInLeftDiv = styled.div`
  animation: ${FadeInLeftAnimation} infinite 5s;
  padding: 50px;
`;

    return (
      <div id="StartScreen" onClick={this.props.setFirstDivIsActive}>
        <header className="App-header">
          <FadeInLeftDiv>
            
            <h1>This is meant to be animating in</h1><img src={startImage} alt="yo whaddup" id="startScreenImage"></img>
          </FadeInLeftDiv>
        </header>
      </div>
    );
  }
}

//Main Screen component
function MainScreenCompo() {
  return (
    <div id="MainScreen" className="App">
      <header className="App-header">
        <h1 id="displayedQuote">Let's look at some quotes</h1>

        <img
          src={logo}
          id="misterClicky"
          className="App-logo"
          alt="logo"
          onClick={clicky}
        />
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
if (hideNsfwSetting === true) {
  filteredQuotes = quoteList.filter(function (item) {
    return item[2] !== 1;
  });
} else {
  filteredQuotes = quoteList;
}

// Count remaining quotes
totalNumberOfQuotes = filteredQuotes.length;
console.log("There are " + totalNumberOfQuotes + " quotes to be displayed");

//Select a random quote, put it into variable quoteArray
function selectNewQuote() {
  newQuoteToSelect = Math.floor(Math.random() * filteredQuotes.length);
  console.log(
    "Selecting quote " + (newQuoteToSelect + 1) + " of " + filteredQuotes.length
  );
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
      title: "Happy now?",
      text: "You've clicked through all the bloody quotes!",
      icon: "success",
      confirmButtonText: "I'm greedy.",
    });
    document.getElementById("displayedQuote").innerHTML = "We're done here.";
  } else {
    document.getElementById("misterClicky").style.animation =
      "App-logo-spin 1s ease-out";
    selectNewQuote();
    changeDisplayedText();
    removeDisplayedQuote();
  }
}

export default App;
