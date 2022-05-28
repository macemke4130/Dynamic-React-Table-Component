import React from 'react';
import { useState, useTransition } from 'react';
import CompareTable from './Components/ComparisonTable';

import "./Styles/global.css";

import { bikeData } from './Data/Bike';
import { coffeeData } from './Data/Coffee';
import { carData } from './Data/Car';

function App() {
  const [tableData, setTableData] = useState(bikeData);
  const [isPending, startTransition] = useTransition();

  const handleClick = (e) => {
    const clicked = e.target.innerText;

    switch (clicked) {
      case "Bicycle Data":
        unmountToMount(bikeData);
        break;
      case "Coffee Data":
        unmountToMount(coffeeData);
        break;
      case "Auto Data":
        unmountToMount(carData);
        break;

      default:
        break;
    }
  }

  const unmountToMount = (newData) => {
    setTableData(undefined);
    startTransition(() => setTableData(newData))
  }

  return (
    <>
      <header>
        <h1>Dynamic Comparison Table Component</h1>
      </header>
      <main>
        <p>Table is rendered with a single prop object.<br></br>
          Click the buttons below to load new data.</p>
        <div className="buttonContainer">
          <button onClick={handleClick}>Bicycle Data</button>
          <button onClick={handleClick}>Coffee Data</button>
          <button onClick={handleClick}>Auto Data</button>
        </div>
        {tableData && <CompareTable tableData={tableData} />}
      </main>
    </>
  );
}

export default App;