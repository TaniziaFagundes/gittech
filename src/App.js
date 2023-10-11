import logo from './logo.svg';
import './App.css';
import { useState } from "react";

/* TESTANDO DISPARO DE JOB A PARTIR DE UM COMMIT: JENKINS CONFIGURADO PARA CONSULTAR O SCM A CADA 5MIN*/

export const fahrenheitToCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

function App() {
  const [grausF, setGrausF] = useState();
  const [grausC, setGrausC] = useState();
  const [celsius, setCelsius] = useState();
  const [fahrenheit, setFahrenheit] = useState();

  const handleFahrenheitClick = () => {
    const celsiusValue = fahrenheitToCelsius(grausF);
    setCelsius(celsiusValue);
  };

  const handleCelsiusClick = () => {
    const fahrenheitValue = celsiusToFahrenheit(grausC);
    setFahrenheit(fahrenheitValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ display: "flex" }}>
          <div>
            <input value={grausF} onChange={(e) => setGrausF(e.target.value)} />
            <button onClick={handleFahrenheitClick}>ver em celsius</button>
            <p>{celsius && `${celsius} °C`}</p>
          </div>
          <div>
            <input value={grausC} onChange={(e) => setGrausC(e.target.value)} />
            <button onClick={handleCelsiusClick}>ver em fahrenheit</button>
            <p>{fahrenheit && `${fahrenheit} °F`}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
