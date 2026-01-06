'use client';

import { useState } from "react";

export default function HomePage() {
  /* ===============================
     PHASE 1: USER INPUT STATE
  =============================== */
  const [basicPay, setBasicPay] = useState<number | null>(null);
  const [cityType, setCityType] = useState<"X" | "Y" | "Z">("X");
  const [transportBase, setTransportBase] = useState<number>(0);
  const [npsEnabled, setNpsEnabled] = useState<boolean>(true);
  const [calculated, setCalculated] = useState<boolean>(false);

  /* ===============================
     GOVERNMENT RULES (LOCKED)
  =============================== */
  const DA_RATE = 0.58; // 58%
  const HRA_RATE = {
    X: 0.30,
    Y: 0.20,
    Z: 0.10,
  };

  /* ===============================
     DERIVED CALCULATIONS
  =============================== */
  const daAmount = basicPay ? Math.round(basicPay * DA_RATE) : 0;
  const hraAmount = basicPay
    ? Math.round(basicPay * HRA_RATE[cityType])
    : 0;

  // Transport Allowance base by city
  const baseTA =
    cityType === "X" ? 3600 : 1800;

  const taWithDA = Math.round(baseTA + baseTA * DA_RATE);

  const npsAmount =
    basicPay && npsEnabled
      ? Math.round((basicPay + daAmount) * 0.10)
      : 0;

  const totalEarnings =
    (basicPay ?? 0) + daAmount + hraAmount + taWithDA;

  const totalDeductions = npsAmount;

  const netSalary = totalEarnings - totalDeductions;

  /* ===============================
     HANDLER
  =============================== */
  const handleCalculate = () => {
    if (!basicPay || basicPay <= 0) {
      alert("Please enter a valid Basic Pay.");
      return;
    }
    setCalculated(true);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "system-ui, Arial",
        background: "#f4f6f8",
      }}
    >
      <h1>Salary Slip Explainer</h1>
      <p style={{ color: "#555" }}>
        Enter your salary details to get a clear explanation of earnings and deductions.
      </p>

      {/* ===============================
         MANUAL ENTRY SECTION
      =============================== */}
      <section
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>Manual Salary Entry</h2>

        <label>Basic Pay (₹)</label>
        <input
          type="number"
          placeholder="Enter Basic Pay"
          value={basicPay ?? ""}
          onChange={(e) => setBasicPay(Number(e.target.value))}
          style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
        />

        <label>City Category (for HRA)</label>
        <select
          value={cityType}
          onChange={(e) => setCityType(e.target.value as any)}
          style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
        >
          <option value="X">X City (Metro)</option>
          <option value="Y">Y City</option>
          <option value="Z">Z City</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={npsEnabled}
            onChange={() => setNpsEnabled(!npsEnabled)}
          />{" "}
          NPS applicable (10% of Basic + DA)
        </label>

        <br /><br />

        <button
          onClick={handleCalculate}
          style={{
            padding: "10px 16px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Calculate Salary
        </button>
      </section>

      {/* ===============================
         UPLOAD (LOCKED – PHASE 2)
      =============================== */}
      <section
        style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          opacity: 0.6,
        }}
      >
        <h3>Upload Salary Slip (PDF / Image)</h3>
        <p>🔒 Coming Soon (Premium Feature)</p>
        <p style={{ fontSize: "14px", color: "#555" }}>
          Manual entry gives 100% accurate results at present.
        </p>
      </section>

      {/* ===============================
         RESULT SECTION
      =============================== */}
      {calculated && (
        <section
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>Salary Breakdown</h2>

          <h3>Earnings</h3>
          <p>Basic Pay: ₹{basicPay?.toLocaleString()}</p>
          <p>Dearness Allowance (58%): ₹{daAmount.toLocaleString()}</p>
          <p>House Rent Allowance: ₹{hraAmount.toLocaleString()}</p>
          <p>
            Transport Allowance (with DA): ₹{taWithDA.toLocaleString()}
          </p>

          <h3>Deductions</h3>
          <p>NPS Contribution: ₹{npsAmount.toLocaleString()}</p>

          <hr />

          <p><b>Total Earnings:</b> ₹{totalEarnings.toLocaleString()}</p>
          <p><b>Total Deductions:</b> ₹{totalDeductions.toLocaleString()}</p>
          <p><b>Net Salary:</b> ₹{netSalary.toLocaleString()}</p>
        </section>
      )}
    </main>
  );
}
