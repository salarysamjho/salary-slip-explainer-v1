'use client';

import { useState } from "react";

export default function HomePage() {
  const isPremiumUser = false;

  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");
  const [cityType, setCityType] = useState<"X" | "Y" | "Z">("X");
  const [state, setState] = useState<string>("Maharashtra");

  // ===== CORE VALUES =====
  const basicPay = 35400;
  const daRate = 0.49;
  const daAmount = Math.round(basicPay * daRate);

  // ===== HRA (30/20/10) =====
  const hraRateMap: Record<string, number> = {
    X: 0.30,
    Y: 0.20,
    Z: 0.10,
  };
  const hraAmount = Math.round(basicPay * hraRateMap[cityType]);

  // ===== PROFESSIONAL TAX (STATE-WISE) =====
  const professionalTaxMap: Record<string, number> = {
    Maharashtra: 200,
    Karnataka: 200,
    "Tamil Nadu": 208,
    "West Bengal": 200,
    Delhi: 0,
  };
  const professionalTax = professionalTaxMap[state] ?? 0;

  // ===== EARNINGS =====
  const earnings = [
    {
      title: "Basic Pay",
      amount: basicPay,
      explanationEn:
        "Basic Pay is the core component of salary. All allowances and most deductions are calculated based on it.",
      explanationHi:
        "बेसिक पे वेतन का मुख्य हिस्सा होता है, जिसके आधार पर सभी भत्ते और अधिकतर कटौतियाँ तय होती हैं।",
      calculation: "As per Pay Matrix (7th CPC)",
      currentRate: "Pay Level based",
      lastRevised: "7th Pay Commission",
      orderLink: null,
    },
    {
      title: "Dearness Allowance (DA)",
      amount: daAmount,
      explanationEn:
        "Dearness Allowance offsets inflation and is revised twice a year.",
      explanationHi:
        "महंगाई भत्ता मुद्रास्फीति के प्रभाव को कम करने के लिए दिया जाता है।",
      calculation: "49% of Basic Pay",
      currentRate: "49%",
      lastRevised: "Govt. Notification",
      orderLink: "https://egazette.nic.in/",
    },
    {
      title: "House Rent Allowance (HRA)",
      amount: hraAmount,
      explanationEn:
        "HRA depends on city classification (X, Y, Z).",
      explanationHi:
        "एचआरए शहर की श्रेणी (X, Y, Z) पर निर्भर करता है।",
      calculation: "30% / 20% / 10% of Basic Pay",
      currentRate:
        cityType === "X" ? "30%" : cityType === "Y" ? "20%" : "10%",
      lastRevised: "DA based revision",
      orderLink:
        "https://doe.gov.in/files/cenetral-pay_document/HRA_Eng_1.pdf",
    },
    {
      title: "Transport Allowance",
      amount: 3600,
      explanationEn: "Covers daily commuting expenses.",
      explanationHi: "आवागमन खर्च के लिए दिया जाता है।",
      calculation: "Fixed",
      currentRate: "₹3,600",
      lastRevised: "7th CPC",
      orderLink: "https://egazette.nic.in/",
    },
  ];

  // ===== DEDUCTIONS =====
  const deductions = [
    {
      title: "NPS Contribution",
      amount: Math.round((basicPay + daAmount) * 0.10),
      explanationEn:
        "Mandatory retirement contribution under NPS.",
      explanationHi:
        "एनपीएस के तहत अनिवार्य पेंशन योगदान।",
      calculation: "10% of (Basic + DA)",
      orderLink: "https://egazette.nic.in/",
    },
    {
      title: "Professional Tax",
      amount: professionalTax,
      explanationEn:
        "Professional Tax is levied by state governments and varies by state.",
      explanationHi:
        "प्रोफेशनल टैक्स राज्य सरकार द्वारा लगाया जाता है और राज्य के अनुसार बदलता है।",
      calculation: `As per ${state} State rules`,
      orderLink: null,
    },
  ];

  // ===== CALCULATIONS =====
  const multiplier = viewMode === "monthly" ? 1 : 12;

  const grossSalary =
    earnings.reduce((sum, e) => sum + e.amount, 0) * multiplier;

  const totalDeductions =
    deductions.reduce((sum, d) => sum + d.amount, 0) * multiplier;

  const netSalary = grossSalary - totalDeductions;

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Salary Slip Explainer</h1>

      {/* TOGGLES */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setViewMode("monthly")}>Monthly</button>
        <button onClick={() => setViewMode("annual")} style={{ marginLeft: "10px" }}>
          Annual
        </button>
      </div>

      {/* CITY */}
      <div style={{ marginBottom: "10px" }}>
        <label><b>City Category:</b> </label>
        <select value={cityType} onChange={(e) => setCityType(e.target.value as any)}>
          <option value="X">X City</option>
          <option value="Y">Y City</option>
          <option value="Z">Z City</option>
        </select>
      </div>

      {/* STATE */}
      <div style={{ marginBottom: "20px" }}>
        <label><b>State:</b> </label>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option>Maharashtra</option>
          <option>Karnataka</option>
          <option>Tamil Nadu</option>
          <option>West Bengal</option>
          <option>Delhi</option>
        </select>
      </div>

      {/* SUMMARY */}
      <div style={{ border: "2px solid #000", padding: "15px", marginBottom: "25px" }}>
        <h2>Salary Summary ({viewMode})</h2>
        <p><b>Gross Salary:</b> ₹{grossSalary.toLocaleString()}</p>
        <p><b>Total Deductions:</b> ₹{totalDeductions.toLocaleString()}</p>
        <p><b>Net Salary:</b> ₹{netSalary.toLocaleString()}</p>
      </div>

      {/* EARNINGS */}
      <h2>Earnings</h2>
      {earnings.map((e, i) => (
        <div key={i} style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "10px" }}>
          <h3>{e.title} – ₹{e.amount.toLocaleString()}</h3>
          <p>{e.explanationEn}</p>
          <p>{e.explanationHi}</p>
          <p><b>Calculation:</b> {e.calculation}</p>
          <p><b>Current Rate:</b> {e.currentRate}</p>
        </div>
      ))}

      {/* DEDUCTIONS */}
      <h2>Deductions</h2>
      {deductions.map((d, i) => (
        <div key={i} style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "10px" }}>
          <h3>{d.title} – ₹{d.amount.toLocaleString()}</h3>
          <p>{d.explanationEn}</p>
          <p>{d.explanationHi}</p>
          <p><b>Calculation:</b> {d.calculation}</p>
        </div>
      ))}
    </main>
  );
}
