import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StartScreen from './StartScreen';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <StartScreen />
  </React.StrictMode>,
  document.getElementById('root')
);

//tap to move to the next screen with quotes
function clickToMoveOn(){
  ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
