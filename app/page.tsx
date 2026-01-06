'use client';

import { useState } from "react";

export default function HomePage() {
  // ===== PREMIUM FLAG =====
  const isPremiumUser = false;

  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");

  // ===== CORE VALUES =====
  const basicPay = 35400;
  const daRate = 0.49;
  const daAmount = Math.round(basicPay * daRate);

  const earnings = [
    { title: "Basic Pay", amount: basicPay },
    { title: "Dearness Allowance (DA)", amount: daAmount },
    { title: "House Rent Allowance (HRA)", amount: 10620 },
    { title: "Transport Allowance", amount: 3600 },
  ];

  const deductions = [
    { title: "NPS Contribution", amount: Math.round((basicPay + daAmount) * 0.10) },
    { title: "Professional Tax", amount: 200 },
  ];

  // ===== CALCULATIONS =====
  const multiplier = viewMode === "monthly" ? 1 : 12;

  const grossSalary =
    earnings.reduce((sum, e) => sum + e.amount, 0) * multiplier;

  const totalDeductions =
    deductions.reduce((sum, d) => sum + d.amount, 0) * multiplier;

  const netSalary = grossSalary - totalDeductions;

  // ===== STEP 20: TAX DEDUCTIONS DATA =====
  const taxDeductions = [
    {
      section: "Standard Deduction",
      limit: "₹50,000 per year",
      en:
        "Standard deduction is a flat deduction available to salaried employees without any investment proof.",
      hi:
        "स्टैंडर्ड डिडक्शन वेतनभोगी कर्मचारियों को बिना किसी निवेश प्रमाण के मिलने वाली सीधी छूट है।",
    },
    {
      section: "Section 80C",
      limit: "Up to ₹1,50,000 per year",
      en:
        "Section 80C allows deduction for investments like PF, PPF, LIC, ELSS, NSC, and tuition fees.",
      hi:
        "धारा 80C के अंतर्गत PF, PPF, LIC, ELSS, NSC और बच्चों की ट्यूशन फीस पर टैक्स छूट मिलती है।",
    },
    {
      section: "Section 80CCD (NPS)",
      limit: "₹50,000 (80CCD(1B))",
      en:
        "Additional tax benefit is available for NPS contributions over and above Section 80C.",
      hi:
        "एनपीएस में निवेश पर धारा 80C से अतिरिक्त ₹50,000 तक की टैक्स छूट मिलती है।",
    },
  ];

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Salary Slip Explainer</h1>

      {/* VIEW MODE */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setViewMode("monthly")}>Monthly</button>
        <button
          onClick={() => setViewMode("annual")}
          style={{ marginLeft: "10px" }}
        >
          Annual
        </button>
      </div>

      {/* SUMMARY */}
      <div style={{ border: "2px solid #000", padding: "15px", marginBottom: "25px" }}>
        <h2>Salary Summary ({viewMode})</h2>
        <p><b>Gross Salary:</b> ₹{grossSalary.toLocaleString()}</p>
        <p><b>Total Deductions:</b> ₹{totalDeductions.toLocaleString()}</p>
        <p><b>Net Salary:</b> ₹{netSalary.toLocaleString()}</p>
      </div>

      {/* STEP 20: TAX DEDUCTIONS */}
      <h2>Income Tax Deductions (India)</h2>

      {!isPremiumUser ? (
        <p style={{ color: "gray" }}>
          🔒 Premium users can see detailed tax deduction explanations.  
          <br />
          हिंदी: टैक्स कटौती का पूरा विवरण देखने के लिए प्रीमियम आवश्यक है।
        </p>
      ) : (
        taxDeductions.map((t, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <b>{t.section}</b>  
            <br />
            <b>Limit:</b> {t.limit}
            <p>{t.en}</p>
            <p>{t.hi}</p>
          </div>
        ))
      )}
    </main>
  );
}
