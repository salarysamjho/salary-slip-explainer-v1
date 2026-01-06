'use client';

import { useState } from "react";

export default function HomePage() {
  // ===== PREMIUM FLAG =====
  const isPremiumUser = false;

  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");
  const [cityType, setCityType] = useState<"X" | "Y" | "Z">("X");
  const [state, setState] = useState<string>("Maharashtra");

  // ===== CORE VALUES =====
  const basicPay = 35400;
  const daRate = 0.49;
  const daAmount = Math.round(basicPay * daRate);

  const hraRateMap = { X: 0.30, Y: 0.20, Z: 0.10 };
  const hraAmount = Math.round(basicPay * hraRateMap[cityType]);

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
    { title: "Basic Pay", amount: basicPay },
    { title: "Dearness Allowance (DA)", amount: daAmount },
    { title: "House Rent Allowance (HRA)", amount: hraAmount },
    { title: "Transport Allowance", amount: 3600 },
  ];

  // ===== DEDUCTIONS =====
  const deductions = [
    {
      title: "NPS Contribution",
      amount: Math.round((basicPay + daAmount) * 0.10),
    },
    {
      title: "Professional Tax",
      amount: professionalTax,
    },
  ];

  // ===== CALCULATIONS =====
  const multiplier = viewMode === "monthly" ? 1 : 12;

  const grossSalary =
    earnings.reduce((sum, e) => sum + e.amount, 0) * multiplier;

  const totalDeductions =
    deductions.reduce((sum, d) => sum + d.amount, 0) * multiplier;

  const netSalary = grossSalary - totalDeductions;

  // ===== STEP 19: DA / HRA TIMELINE =====
  const daTimeline = [
    {
      period: "01 Jan 2023",
      oldRate: "38%",
      newRate: "42%",
      arrears: "Paid from Jan 2023",
    },
    {
      period: "01 Jul 2023",
      oldRate: "42%",
      newRate: "46%",
      arrears: "Paid from Jul 2023",
    },
    {
      period: "01 Jan 2024",
      oldRate: "46%",
      newRate: "49%",
      arrears: "Paid from Jan 2024",
    },
  ];

  const hraTimeline = [
    {
      period: "7th CPC Implementation",
      oldRate: "24 / 16 / 8",
      newRate: "30 / 20 / 10",
      note: "Revised based on DA threshold",
    },
  ];

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Salary Slip Explainer</h1>

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
        <p key={i}>{e.title}: ₹{e.amount.toLocaleString()}</p>
      ))}

      {/* DEDUCTIONS */}
      <h2>Deductions</h2>
      {deductions.map((d, i) => (
        <p key={i}>{d.title}: ₹{d.amount.toLocaleString()}</p>
      ))}

      {/* STEP 19: DA TIMELINE */}
      <h2>DA Revision Timeline</h2>

      {!isPremiumUser ? (
        <p style={{ color: "gray" }}>
          🔒 Premium users can view full DA revision history and arrears details.  
          <br />
          हिंदी: डीए संशोधन इतिहास देखने के लिए प्रीमियम आवश्यक है।
        </p>
      ) : (
        daTimeline.map((d, i) => (
          <div key={i} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <b>Effective From:</b> {d.period}  
            <br />
            Old Rate: {d.oldRate} → New Rate: {d.newRate}  
            <br />
            <b>Arrears:</b> {d.arrears}
          </div>
        ))
      )}

      {/* STEP 19: HRA TIMELINE */}
      <h2>HRA Revision Timeline</h2>

      {!isPremiumUser ? (
        <p style={{ color: "gray" }}>
          🔒 Premium users can view HRA revision details.  
          <br />
          हिंदी: एचआरए संशोधन विवरण देखने के लिए प्रीमियम आवश्यक है।
        </p>
      ) : (
        hraTimeline.map((h, i) => (
          <div key={i} style={{ border: "1px solid #ddd", padding: "10px" }}>
            <b>{h.period}</b>  
            <br />
            Old Rate: {h.oldRate}  
            <br />
            New Rate: {h.newRate}  
            <br />
            <i>{h.note}</i>
          </div>
        ))
      )}
    </main>
  );
}
