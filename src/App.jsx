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
      <div>
        {/* Hier werden die Ziffern der Summanden angezeigt */}
        {[num1Digits, num2Digits, carry].map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginBottom: 5 }}>
            {row.map((value, i) => (
              rowIndex === 0 || rowIndex === 1 ? (
                <span key={i} style={{ width: 30, height: 40, fontSize: 24, textAlign: "center", color: "black" }}>{value}</span>
              ) : (
                <input
                  key={i}
                  style={{ width: 30, height: 40, fontSize: 24, textAlign: "center", border: "1px solid #ccc", borderRadius: 5, backgroundColor: "white", color: "black" }}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => {
                    let newValue = [...carry];
                    newValue[i] = e.target.value.replace(/\D/, "");
                    setCarry(newValue);
                  }}
                />
              )
            ))}
          </div>
        ))}
        <hr style={{ width: "100%", margin: "5px 0", border: "2px solid black" }} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginBottom: 5 }}>
          {result.map((value, i) => (
            <input
              key={i}
              style={{ width: 30, height: 40, fontSize: 24, textAlign: "center", border: "1px solid #ccc", borderRadius: 5, backgroundColor: "white", color: "black" }}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => {
                let newValue = [...result];
                newValue[i] = e.target.value.replace(/\D/, "");
                setResult(newValue);
              }}
            />
          ))}
        </div>
      </div>
      <button onClick={checkAnswer} style={{ backgroundColor: "#28a745", color: "white", border: "none", padding: 10, fontSize: 16, borderRadius: 5, cursor: "pointer", width: "100%", margin: "10px 0" }}>Überprüfen</button>
      <button onClick={newTask} style={{ backgroundColor: "#007bff", color: "white", border: "none", padding: 10, fontSize: 16, borderRadius: 5, cursor: "pointer", width: "100%" }}>Neue Aufgabe</button>
      <p style={{ fontSize: 18, marginTop: 10 }}>{message}</p>
    </div>
  );
}
