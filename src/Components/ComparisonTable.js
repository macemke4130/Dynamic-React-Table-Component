import React, { useEffect, useState, useRef } from 'react';

// Styles
import "../Styles/table.css";

const CompareTable = ({ tableData }) => {
    const [featureTitles, setFeatureTitles] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [featureData, setFeatureData] = useState([]);
    const [thWidth, setThWidth] = useState(0);
    const [tableContainerHeight, setTableContainerHeight] = useState(0);

    const tableRef = useRef();

    const hightlightClassName = "highlight";
    const scrollBuffer = 25;

    useEffect(() => {
        const featureTitleTemp = [];
        const featureValuesTemp = [];

        tableData.products[0].features.forEach(feature => featureTitleTemp.push(feature.feature));
        tableData.products.forEach(product => featureValuesTemp.push(product.features));

        setFeatureData(featureValuesTemp);
        setFeatureTitles(featureTitleTemp);
        setAllProducts(tableData.products);
        setThWidth(100 / (tableData.products.length + 1));
    }, []);

    useEffect(() => setTableContainerHeight(tableRef.current.clientHeight + scrollBuffer));

    const handleToggle = (e) => {
        const { activeRow, activeCol } = grabActive(e.target);

        const redCol = document.getElementById(`col-${activeCol}`);
        const redRow = document.getElementById(`row-${activeRow}`);

        redCol.classList.toggle(hightlightClassName);
        redRow.classList.toggle(hightlightClassName);
    }

    const grabActive = (activeElement) => {
        const activeRow = Number(activeElement.id.split("row-")[1].split("-cell")[0]);
        const activeCol = Number(activeElement.id.split("-cell-")[1]);
        return { activeRow, activeCol };
    }

    return (
        <div style={{ height: `${tableContainerHeight}px` }} className="tableContainer">
            <table ref={tableRef}>
                <tbody>
                    <tr>
                        <th style={{ width: `${thWidth}%` }} className="noBorderTh"></th>
                        {allProducts.map((product, index) => (
                            <th key={`col-${index}`} id={`col-${index}`} style={{ width: `${thWidth}%` }}>{product.title}</th>
                        ))}
                    </tr>
                    {featureTitles.map((feature, index) => (
                        <tr key={`tr-${index}`}>
                            <td key={`row-${index}`} id={`row-${index}`} className="featureTitle">{feature}</td>
                            {featureData.map((data, featureIndex) => (
                                <td key={`row-${index}-cell-${featureIndex}`} id={`row-${index}-cell-${featureIndex}`} onMouseOver={handleToggle} onMouseOut={handleToggle}>{data.at(index).value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default CompareTable;