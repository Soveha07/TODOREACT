import { useEffect, useState } from "react";
import React from "react";

function CalculatorHistory({ result }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (result !== null && result !== undefined && result !== "") {
      const updatedHistory = [...history, result];
      setHistory(updatedHistory);
      localStorage.setItem("history", JSON.stringify(updatedHistory));
    }
  }, [result]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  return (
    <div>
      <h2>History</h2>
      <ul>
        {history.map((calculation, index) => (
          <li key={index}>{calculation}</li>
        ))}
      </ul>
      {history.length > 0 && (
        <button className="btn btn-danger" onClick={clearHistory}>
          Clear History
        </button>
      )}
    </div>
  );
}

export default CalculatorHistory;
