import { useState } from "react";

function generateNumbers() {
  let num1 = Math.floor(Math.random() * 900) + 100;
  let num2 = Math.floor(Math.random() * 900) + 100;
  return [num1, num2];
}

function splitNumber(num, length = 4) {
  return String(num).padStart(length, " ").split("").map(char => (char === " " ? "" : Number(char)));
}

export default function App() {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [carry, setCarry] = useState(["", "", "", ""]);
  const [result, setResult] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");

  const num1Digits = splitNumber(numbers[0]);
  const num2Digits = splitNumber(numbers[1]);
  const correctSum = numbers[0] + numbers[1];
  const correctDigits = splitNumber(correctSum);

  function checkAnswer() {
    let correctCarry = ["", "", "", ""];
    let carryOver = 0;

    for (let i = num1Digits.length - 1; i >= 0; i--) {
      let sum = (num1Digits[i] || 0) + (num2Digits[i] || 0) + carryOver;
      if (sum >= 10) {
        carryOver = Math.floor(sum / 10);
        if (i > 0) correctCarry[i - 1] = carryOver.toString();
      } else {
        carryOver = 0;
      }
    }

    const carryCorrect = carry.every((c, i) => c === (correctCarry[i] || "").toString());
    const resultCorrect = result.every((r, i) => r === correctDigits[i].toString());

    setMessage(carryCorrect && resultCorrect ? "✅ Richtig!" : "❌ Leider falsch. Versuche es nochmal!");
  }

  function newTask() {
    setNumbers(generateNumbers());
    setCarry(["", "", "", ""]);
    setResult(["", "", "", ""]);
    setMessage("");
  }

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", maxWidth: 400, margin: "20px auto", padding: 20, background: "#fff", borderRadius: 10, boxShadow: "0 4px 8px rgba(0,0,0,0.1)", color: "black" }}>
      <h1 style={{ color: "black" }}>Schriftliche Addition</h1>
      <table style={{ margin: "0 auto", borderCollapse: "collapse", fontSize: 24 }}>
        <tbody>
          <tr>
            {carry.map((c, i) => (
              <td key={i} style={{ width: 30, textAlign: "center" }}>
                <input
                  style={{ width: 20, fontSize: 16, textAlign: "center" }}
                  type="text"
                  maxLength="1"
                  value={c}
                  onChange={(e) => {
                    let newCarry = [...carry];
                    newCarry[i] = e.target.value.replace(/\D/, "");
                    setCarry(newCarry);
                  }}
                />
              </td>
            ))}
          </tr>
          <tr>
            {num1Digits.map((digit, i) => (
              <td key={i} style={{ textAlign: "center" }}>{digit}</td>
            ))}
          </tr>
          <tr>
            {num2Digits.map((digit, i) => (
              <td key={i} style={{ textAlign: "center" }}>{digit}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <hr style={{ width: "100%", margin: "5px 0", border: "2px solid black" }} />
      <table style={{ margin: "0 auto", borderCollapse: "collapse", fontSize: 24 }}>
        <tbody>
          <tr>
            {result.map((value, i) => (
              <td key={i} style={{ width: 30, textAlign: "center" }}>
                <input
                  style={{ width: 30, fontSize: 24, textAlign: "center" }}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => {
                    let newResult = [...result];
                    newResult[i] = e.target.value.replace(/\D/, "");
                    setResult(newResult);
                  }}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <button onClick={checkAnswer} style={{ backgroundColor: "#28a745", color: "white", border: "none", padding: 10, fontSize: 16, borderRadius: 5, cursor: "pointer", width: "100%", margin: "10px 0" }}>Überprüfen</button>
      <button onClick={newTask} style={{ backgroundColor: "#007bff", color: "white", border: "none", padding: 10, fontSize: 16, borderRadius: 5, cursor: "pointer", width: "100%" }}>Neue Aufgabe</button>
      <p style={{ fontSize: 18, marginTop: 10 }}>{message}</p>
    </div>
  );
}
