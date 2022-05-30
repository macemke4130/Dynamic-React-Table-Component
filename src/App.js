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
    startTransition(() => setTableData(newData));
  }

  return (
    <>
      <header>
        <h1>Dynamic Comparison Table Component</h1>
      </header>
      <main>
        <p>Click the buttons below to load new data</p>
        <div className="buttonContainer">
          <button onClick={handleClick}>Bicycle Data</button>
          <button onClick={handleClick}>Coffee Data</button>
          <button onClick={handleClick}>Auto Data</button>
        </div>
        {tableData && <CompareTable tableData={tableData} />}
        <div className="listContainer">
          <ul>
            <li>See <a href="https://github.com/macemke4130/Dynamic-React-Table-Component/blob/master/src/Components/ComparisonTable.js" target="_blank" rel="noreferrer">Table Logic here</a>.</li>
            <li>Table is rendered with a single prop object.</li>
            <li>Scales to full width of container with columns taking up equal available space.</li>
            <li>Roll over cell to highlight its row and column name.</li>
            <li>Data can be loaded in from JSON, GraphQL or a simple <a href="https://github.com/macemke4130/Dynamic-React-Table-Component/blob/2a7edd04a1d1f05db52b29fc55835102bad3e426/src/Data/Coffee.js#L1" target="_blank" rel="noreferrer">JavaScript Object</a>.</li>
            <li>Left column sticks to screen in mobile version.</li>
            <li>Makes use of React 18's useTransition() Hook.</li>
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;