"use client";

import { useState } from "react";

export default function Home() {
  const [salary, setSalary] = useState("");
  const [show, setShow] = useState(false);

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Salary Slip Explainer</h1>

      <p>
        Enter your monthly salary and understand your deductions in simple
        English & Hindi.
      </p>

      <input
        type="number"
        placeholder="Enter Monthly Salary (₹)"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        style={{ padding: "10px", marginTop: "10px" }}
      />

      <br /><br />

      <button
        onClick={() => setShow(true)}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Explain My Salary
      </button>

      {show && salary && (
        <div style={{ marginTop: "30px" }}>
          <h2>Explanation</h2>

          <p>
            <b>English:</b> From your salary, some amount is deducted for Provident
            Fund (PF) and other benefits. This helps you save money for the future.
          </p>

          <p>
            <b>हिंदी:</b> आपकी सैलरी से पीएफ (Provident Fund) और अन्य सुविधाओं के
            लिए कुछ पैसे काटे जाते हैं। यह भविष्य के लिए आपकी बचत होती है।
          </p>
        </div>
      )}
    </main>
  );
}
