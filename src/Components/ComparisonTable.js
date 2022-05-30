import React, { useEffect, useState, useRef } from 'react';

// Styles
import "../Styles/table.css";

const CompareTable = ({ tableData }) => {
    const [tableTitle, setTableTitle] = useState("");
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
        setTableTitle(tableData.title);
    }, []);

    useEffect(() => setTableContainerHeight(tableRef.current.clientHeight + scrollBuffer));

    const handleToggle = (e) => {
        const { activeRow, activeCol } = grabActive(e.target);

        const highlightCol = document.getElementById(`col-${activeCol}`);
        const highlightRow = document.getElementById(`row-${activeRow}`);

        highlightCol.classList.toggle(hightlightClassName);
        highlightRow.classList.toggle(hightlightClassName);
    }

    const grabActive = (activeElement) => {
        const activeRow = Number(activeElement.id.split("row-")[1].split("-col")[0]);
        const activeCol = Number(activeElement.id.split("-col-")[1]);
        return { activeRow, activeCol };
    }

    return (
        <>
            <h2>{tableTitle}</h2>
            <div style={{ height: `${tableContainerHeight}px` }} className="tableContainer">
                <table ref={tableRef}>
                    <tbody>
                        <tr>
                            <th style={{ width: `${thWidth}%` }} className="noBorderTh"></th>
                            {allProducts.map((product, productIndex) => (
                                <th key={`col-${productIndex}`} id={`col-${productIndex}`} style={{ width: `${thWidth}%` }}>{product.title}</th>
                            ))}
                        </tr>
                        {featureTitles.map((feature, featureIndex) => (
                            <tr key={`tr-${featureIndex}`}>
                                <td key={`row-${featureIndex}`} id={`row-${featureIndex}`} className="featureTitle">{feature}</td>
                                {featureData.map((data, dataIndex) => (
                                    <td key={`row-${featureIndex}-col-${dataIndex}`} id={`row-${featureIndex}-col-${dataIndex}`} onMouseOver={handleToggle} onMouseOut={handleToggle}>{data.at(featureIndex).value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default CompareTable;