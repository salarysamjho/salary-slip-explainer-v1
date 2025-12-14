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

      {show && salary && (() => {
  const monthlySalary = Number(salary);
  const basic = monthlySalary * 0.4;
  const pf = basic * 0.12;
  const inHand = monthlySalary - pf;

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Salary Breakdown</h2>

      <p><b>Monthly Salary:</b> ₹{monthlySalary.toFixed(0)}</p>
      <p><b>Basic Salary (40%):</b> ₹{basic.toFixed(0)}</p>
      <p><b>PF Deduction (12% of Basic):</b> ₹{pf.toFixed(0)}</p>
      <p><b>Approx In-Hand Salary:</b> ₹{inHand.toFixed(0)}</p>

      <hr />

      <p>
        <b>English:</b> Your employer calculates PF on basic salary.
        This amount is deducted every month to build your retirement savings.
      </p>

      <p>
        <b>हिंदी:</b> आपकी बेसिक सैलरी पर पीएफ की गणना होती है।
        यह राशि हर महीने काटी जाती है ताकि भविष्य के लिए बचत हो सके।
      </p>
    </div>
  );
})()}
