import React from "react";
import { quoteList } from "./quotelist.js";
import "./App.css";
//Sweetalert for popup messages
import Swal from "sweetalert2";

//animation and images used by the start screen
import styled, { keyframes } from "styled-components";
import { fadeInLeft , fadeInRight } from "react-animations";
import startImage1 from "./startScreenImage1.png";
import startImage2 from "./startScreenImage2.png";
import bigSoundsMate from "./WHIP.wav";

//animation and images used by the main screen
import logo4 from "./playbutton.png";
import logo2 from "./button2.png";
import logo3 from "./button3.png";
import logo from "./button4.png";
var buttonImagesArray = [logo, logo2, logo3, logo4]


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

//Start Screen

const fadeInLeftAnimation = keyframes`${fadeInLeft}`;
const FadeInLeftDiv = styled.div`
  animation: 2s ${fadeInLeftAnimation};
  z-index: 1;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const fadeInRightAnimation = keyframes`${fadeInRight}`;
const FadeInRightDiv = styled.div`
  animation: 2s ${fadeInRightAnimation};
  z-index: 2;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const startNoise = new Audio(bigSoundsMate)

class StartScreenCompo extends React.Component {
  render() {

    const strokeMyFace = () =>{
      this.props.setFirstDivIsActive();
      startNoise.play()
      console.log('noise played')
    }

    return (
      <div id="StartScreen" onClick={strokeMyFace}>
        <header className="App-header">
          <FadeInLeftDiv>
            <img
              src={startImage1}
              alt="look at this darling tiger"
              id="startScreenImage1"
            ></img>
          </FadeInLeftDiv>

          <FadeInRightDiv>
            <img
              src={startImage2}
              alt="and this superb bird"
              id="startScreenImage2"
            ></img>
          </FadeInRightDiv>
        </header>
      </div>
    );
  }
}

//Main Quotes Screen
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

//Change the clicky button to a random picture
function changeButtonToRandomImage(){
  var randomImageForButtonIndex = Math.floor(Math.random() * buttonImagesArray.length);
  var randomImageForButton = (buttonImagesArray[randomImageForButtonIndex])
  console.log(randomImageForButton)
  document.getElementById("misterClicky").src = randomImageForButton;
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
    changeButtonToRandomImage();

  }
}

export default App;
