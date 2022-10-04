import { useState } from "react";
import "./styles.css";

const denominations = [2000, 500, 200, 100, 20, 10, 5, 1];

export default function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [cashGiven, setCashGiven] = useState(0);
  const [noteCount, setNoteCount] = useState(Array(denominations.length));
  const [error, setError] = useState("");

  const onBillAmountInput = (event) => {
    setBillAmount(event.target.value);
  };

  function onCashGivenInput(event) {
    setCashGiven(event.target.value);
  }

  function onCheck() {
    let cashToReturn = cashGiven - billAmount;
    const noteCount = Array(denominations.length);
    if (
      cashGiven === 0 ||
      billAmount === 0 ||
      isNaN(cashGiven) ||
      isNaN(billAmount)
    ) {
      setError("Please fill numerical values in both fields");
    } else if (cashToReturn < 0) {
      setError("Cash given less than bill amount");
    } else {
      setError("");
      for (let i = 0; i < denominations.length; i++) {
        if (cashToReturn >= denominations[i]) {
          noteCount[i] = Math.floor(cashToReturn / denominations[i]);
          cashToReturn = cashToReturn - noteCount[i] * denominations[i];
        } else noteCount[i] = 0;
      }
    }
    setNoteCount(noteCount);
  }

  return (
    <div className="App">
      <section>
        <h1> Cash register manager</h1>
        <p> Enter bill amount and cash given. Then press check for results</p>
      </section>
      <section className="calc-body">
        <label>Bill amount: </label>
        <input onChange={onBillAmountInput}></input>
        <label>Cash given: </label>
        <input onChange={onCashGivenInput}></input>
        <button onClick={() => onCheck()}>Check</button>
      </section>
      {/*conditional rendering*/}
      {error && <div>{error}</div>}
      {noteCount.filter((b) => b > 0).length > 0 && (
        <section className="result">
          <div>
            <label>return change</label>
            <table>
              <tbody>
                <tr>
                  <th>no. of notes</th>
                  {noteCount.map(function (item, index) {
                    return <td key={index + "deno"}>{item}</td>;
                  })}
                </tr>
                <tr>
                  <th>notes</th>
                  {denominations.map(function (item) {
                    return <td key={item}>{item}</td>;
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
