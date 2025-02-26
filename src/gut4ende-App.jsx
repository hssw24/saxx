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
  const [overlay, setOverlay] = useState(null);

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

  function openOverlay(index, type) {
    setOverlay({ index, type });
  }

  function selectNumber(num) {
    if (overlay) {
      let newValues = overlay.type === "carry" ? [...carry] : [...result];
      newValues[overlay.index] = num.toString();
      overlay.type === "carry" ? setCarry(newValues) : setResult(newValues);
      setOverlay(null);
    }
  }

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#fff", color: "black" }}>
      <h3 style={{ color: "black" }}>Schriftliche Addition</h3>
      <div style={{ width: "90%", maxWidth: 400 }}>
        {[num1Digits, num2Digits, carry].map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 5 }}>
            {row.map((value, i) => (
              rowIndex === 0 || rowIndex === 1 ? (
                <span key={i} style={{ width: 36, height: 40, fontSize: 24, textAlign: "center", color: "black" }}>{value}</span>
              ) : (
                <input
                  key={i}
                  style={{ width: 30, height: 20, fontSize: 16, textAlign: "center", border: "1px solid #ccc", borderRadius: 5, backgroundColor: "#fffacd", color: "black" }}
                  type="text"
                  maxLength="1"
                  value={value}
                  inputMode="none"
                  readOnly
                  onFocus={() => openOverlay(i, "carry")}
                />
              )
            ))}
          </div>
        ))}
        <hr style={{ width: "100%", margin: "5px 0", border: "2px solid black" }} />
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 5 }}>
          {result.map((value, i) => (
            <input
              key={i}
              style={{ width: 30, height: 40, fontSize: 24, textAlign: "center", border: "1px solid #ccc", borderRadius: 5, backgroundColor: "#d4f8c4", color: "black" }}
              type="text"
              maxLength="1"
              value={value}
              inputMode="none"
              readOnly
              onFocus={() => openOverlay(i, "result")}
            />
          ))}
        </div>
      </div>
      <button onClick={checkAnswer} style={{ backgroundColor: "#28a745", color: "white", border: "none", padding: 15, fontSize: 18, borderRadius: 5, cursor: "pointer", width: "90%", maxWidth: 400, margin: "10px 0" }}>Überprüfen</button>
      <button onClick={newTask} style={{ backgroundColor: "#007bff", color: "white", border: "none", padding: 15, fontSize: 18, borderRadius: 5, cursor: "pointer", width: "90%", maxWidth: 400 }}>Neue Aufgabe</button>
      <p style={{ fontSize: 18, marginTop: 10 }}>{message}</p>
      {overlay && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: 20, boxShadow: "0 4px 8px rgba(0,0,0,0.2)", borderRadius: 10, width: "80vw", maxWidth: 300 }}>
          <h4>Zahl auswählen</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5 }}>
            {[...Array(10).keys()].map(num => (
              <button key={num} style={{ fontSize: 20, padding: 15 }} onClick={() => selectNumber(num)}>{num}</button>
            ))}
          </div>
          <button onClick={() => setOverlay(null)} style={{ marginTop: 10, width: "100%" }}>Schließen</button>
        </div>
      )}
    </div>
  );
}
