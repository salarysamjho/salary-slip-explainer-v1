'use client';

import { useState } from "react";

export default function HomePage() {
  /* ===============================
     USER INPUT (PHASE 1)
  =============================== */
  const [basicPay, setBasicPay] = useState<number | null>(null);
  const [cityType, setCityType] = useState<"X" | "Y" | "Z">("X");
  const [npsEnabled, setNpsEnabled] = useState<boolean>(true);
  const [calculated, setCalculated] = useState<boolean>(false);

  /* ===============================
     GOVERNMENT RULES (CURRENT)
  =============================== */
  const DA_RATE = 0.58; // 58%
  const HRA_RATE = { X: 0.30, Y: 0.20, Z: 0.10 };

  /* ===============================
     CALCULATIONS
  =============================== */
  const daAmount = basicPay ? Math.round(basicPay * DA_RATE) : 0;
  const hraAmount = basicPay ? Math.round(basicPay * HRA_RATE[cityType]) : 0;

  const baseTA = cityType === "X" ? 3600 : 1800;
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
        Enter your salary details and understand each component clearly.
      </p>

      {/* ===============================
         MANUAL ENTRY
      =============================== */}
      <section style={{ background: "#fff", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h2>Manual Salary Entry</h2>

        <label>Basic Pay (₹)</label>
        <input
          type="number"
          value={basicPay ?? ""}
          onChange={(e) => setBasicPay(Number(e.target.value))}
          placeholder="Enter Basic Pay"
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
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Calculate Salary
        </button>
      </section>

      {/* ===============================
         RESULT + EXPLANATION
      =============================== */}
      {calculated && (
        <section style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}>
          <h2>Salary Breakdown & Explanation</h2>

          {/* BASIC PAY */}
          <h3>Basic Pay: ₹{basicPay?.toLocaleString()}</h3>
          <p>
            <b>English:</b> Basic Pay is the fixed part of your salary. Most allowances
            and deductions are calculated on this amount.
          </p>
          <p>
            <b>हिंदी:</b> बेसिक पे आपकी सैलरी का मुख्य हिस्सा होता है। अधिकतर भत्ते और
            कटौतियाँ इसी पर आधारित होती हैं।
          </p>

          {/* DA */}
          <h3>Dearness Allowance (58%): ₹{daAmount.toLocaleString()}</h3>
          <p>
            <b>English:</b> DA is given to reduce the impact of inflation. It is
            calculated as 58% of Basic Pay as per the latest government order.
          </p>
          <p>
            <b>हिंदी:</b> महंगाई भत्ता महंगाई के असर को कम करने के लिए दिया जाता है।
            वर्तमान में यह बेसिक पे का 58% है।
          </p>

          {/* HRA */}
          <h3>House Rent Allowance: ₹{hraAmount.toLocaleString()}</h3>
          <p>
            <b>English:</b> HRA helps employees meet house rent expenses. The rate
            depends on city category (X/Y/Z).
          </p>
          <p>
            <b>हिंदी:</b> एचआरए मकान किराए के खर्च में मदद के लिए दिया जाता है।
            यह शहर की श्रेणी पर निर्भर करता है।
          </p>

          {/* TA */}
          <h3>Transport Allowance (with DA): ₹{taWithDA.toLocaleString()}</h3>
          <p>
            <b>English:</b> Transport Allowance is provided for daily commuting.
            DA is also applicable on this allowance.
          </p>
          <p>
            <b>हिंदी:</b> ट्रांसपोर्ट भत्ता रोज़ाना आने-जाने के खर्च के लिए दिया जाता है।
            इस पर भी डीए लागू होता है।
          </p>

          {/* NPS */}
          <h3>NPS Deduction: ₹{npsAmount.toLocaleString()}</h3>
          <p>
            <b>English:</b> NPS is a retirement contribution. 10% of Basic Pay + DA
            is deducted every month.
          </p>
          <p>
            <b>हिंदी:</b> एनपीएस सेवानिवृत्ति के लिए योगदान है। इसमें बेसिक पे और डीए
            का 10% हर महीने काटा जाता है।
          </p>

          <hr />

          <p><b>Total Earnings:</b> ₹{totalEarnings.toLocaleString()}</p>
          <p><b>Total Deductions:</b> ₹{totalDeductions.toLocaleString()}</p>
          <p><b>Net Salary:</b> ₹{netSalary.toLocaleString()}</p>
        </section>
      )}
    </main>
  );
}
