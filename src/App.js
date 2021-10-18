import React, { useState } from 'react';
//test import { quoteList } from "./quotelist.js";
import { quoteList } from "./realQuotes.js";
import "./App.css";
//Sweetalert for popup messages
import Swal from "sweetalert2";

//animation and images used by the start screen
import styled, { keyframes } from "styled-components";
import { fadeInLeft, fadeInRight } from "react-animations";
/* test 
import startImage1 from "./startScreenImage1.png";
import startImage2 from "./startScreenImage2.png";
*/
import startImage1 from "./splashMe.png";
import startImage2 from "./splashLogo.png";
import bigSoundsMate from "./WHIP.wav";

//animation and images used by the main screen
import Sparkles from './Sparkles.js'
/* test
import logo4 from "./playbutton.png";
import logo2 from "./button2.png";
import logo3 from "./button3.png";
import logo from "./button4.png";
*/
import logo4 from "./jonface4PNG.png";
import logo2 from "./jonface2PNG.png";
import logo3 from "./jonface3PNG.png";
import logo from "./jonface1PNG.png";
import menuButton from "./menubutton.png";
import ReactModal from 'react-modal';
var buttonImagesArray = [logo, logo2, logo3, logo4];

//Declare variables
var quoteArray = "No quote selected yet";
var filteredQuotes = "Array not yet defined";
var quoteText = "No quote selected yet";
var quoteFavourite = 0;
var newQuoteToSelect = "No quote selected yet";
var hideNsfwSetting = false;
var totalNumberOfQuotes = 0;
//var clickyButton = document.getElementsByClassName('App-logo');

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
  height: 100%;
`;
const fadeInRightAnimation = keyframes`${fadeInRight}`;
const FadeInRightDiv = styled.div`
  animation: 2s ${fadeInRightAnimation};
  z-index: 2;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%;
`;

const startNoise = new Audio(bigSoundsMate);

class StartScreenCompo extends React.Component {
  render() {
    const strokeMyFace = () => {
      this.props.setFirstDivIsActive();
    //  startNoise.play();
      console.log("noise played");
    };
    return (
      <div id="StartScreen" onClick={strokeMyFace}>
        <header className="App-splash">
          <FadeInLeftDiv>
            <img
              class="Imagesize"
              src={startImage1}
              alt="look at this darling tiger"
              id="startScreenImage1"
            ></img>
          </FadeInLeftDiv>

          <FadeInRightDiv>
            <img
            class="Imagesize"
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
//To do: Within the MainbodyDiv, wrapped around displayedquote, either do maxwidth 80% or an absolute value as px maxwidth. Also add padding/margin like "margin:0px auto"

// Quotefave: Use hooks. Move global variable into state. In order to update that state you need to do it in react, do it inside the components 
// Clicky to return values. INside MainScreenCompo have state, with the return value of clicky update that state. All the global values should/could be 
//in mainscreencompo. Clicky should return all the things it wants. Inside MainScreenCompo you would have a function that calls clicky and calls setState
// on each of the bits of component state


function MainScreenCompo() {
// Declare state variable to track quote favouritism
const [fave, setFave] = useState(0);

// Function to call clicky
function isItFave(wellTellMeIsIt){
  clicky();
  console.log("isItFave called");
}

return (
    <div id="wholeThing" className="App-header">
      <div id="Banner" className="App-top-section">
        <div id="menuButtonContainer" className="App-menu-button">
          <img src={menuButton} id="menuButton" className="App-menu-button" alt="Click for options" />
        </div>
      </div>
      <div id="MainBody" className="App-middle-section">
        <div id="bitInsideMainBodyThatHoldsTheQuote" className="App-middle-section2">
          <Sparkles><h1 id="displayedQuote">Let's do this</h1></Sparkles>
      </div>
      </div>
      <div id="LowerSection" className="App-lower-section">
        <img
          src={logo}
          id="misterClicky"
          className="App-logo"
          alt="logo"
          onClick={isItFave}
        />
      </div>
    </div>
  );
}

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

//Spin the button and sparkle the text if it's a favourite quote
function spinTheButtonIfFavourite() {
  if (quoteFavourite === 1) {
    document.getElementById("misterClicky").style.animation =
      "App-logo-spin 1s ease-out";
    console.log("This is a favourite");
  } else {
    console.log("Not a favourite");
  }
}

//Change the text to display the new quote
function changeDisplayedText() {
  document.getElementById("displayedQuote").innerHTML = quoteText;
}

//Remove the quote from the list
function removeDisplayedQuote() {
  filteredQuotes.splice(newQuoteToSelect, 1);
}

//Change the clicky button to a random picture
function changeButtonToRandomImage() {
  var randomImageForButtonIndex = Math.floor(
    Math.random() * buttonImagesArray.length
  );
  var randomImageForButton = buttonImagesArray[randomImageForButtonIndex];
  console.log(randomImageForButton);
  document.getElementById("misterClicky").src = randomImageForButton;
}

//Change the font size of the quote depending on if it's short, medium or long in length
function changeQuoteFontSize() {
  if (quoteText.length > 20 && quoteText.length < 41) {
    console.log(
      "Quote is medium length at " + quoteText.length + " characters"
    );
     document.getElementById("displayedQuote").style.fontSize =  "70px";
  } else if (quoteText.length > 40) {
    console.log("Quote is long length at " + quoteText.length + " characters");
      document.getElementById("displayedQuote").style.fontSize = "50px";
  } else {
    console.log("Quote is short length at " + quoteText.length + " characters");
      document.getElementById("displayedQuote").style.fontSize = "90px";
  }
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
    document.getElementById("displayedQuote").innerHTML = "We're done here!";
  } else {
    selectNewQuote();
    spinTheButtonIfFavourite();
    changeDisplayedText();
    removeDisplayedQuote();
    changeButtonToRandomImage();
    changeQuoteFontSize();

  }
}

export default App;