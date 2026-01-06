'use client';

import { useEffect, useState } from "react";

type SavedSalary = {
  date: string;
  annualIncome: number;
  oldTax: number;
  newTax: number;
  betterRegime: string;
};

export default function HomePage() {
  // ===== PREMIUM FLAG =====
  const isPremiumUser = false;

  const [savedData, setSavedData] = useState<SavedSalary[]>([]);

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

  // ===== ANNUAL INCOME =====
  const annualIncome =
    earnings.reduce((sum, e) => sum + e.amount, 0) * 12;

  // ===== TAX CALCULATION =====
  const standardDeduction = 50000;
  const deduction80C = 150000;
  const deduction80CCD = 50000;

  const oldRegimeTaxableIncome = Math.max(
    annualIncome - standardDeduction - deduction80C - deduction80CCD,
    0
  );

  const calculateOldTax = (income: number) => {
    let tax = 0;
    if (income > 1000000) {
      tax += (income - 1000000) * 0.30;
      income = 1000000;
    }
    if (income > 500000) {
      tax += (income - 500000) * 0.20;
      income = 500000;
    }
    if (income > 250000) {
      tax += (income - 250000) * 0.05;
    }
    return Math.round(tax);
  };

  const calculateNewTax = (income: number) => {
    let tax = 0;
    if (income > 1500000) {
      tax += (income - 1500000) * 0.30;
      income = 1500000;
    }
    if (income > 1200000) {
      tax += (income - 1200000) * 0.20;
      income = 1200000;
    }
    if (income > 900000) {
      tax += (income - 900000) * 0.15;
      income = 900000;
    }
    if (income > 600000) {
      tax += (income - 600000) * 0.10;
      income = 600000;
    }
    if (income > 300000) {
      tax += (income - 300000) * 0.05;
    }
    return Math.round(tax);
  };

  const oldTax = calculateOldTax(oldRegimeTaxableIncome);
  const newTax = calculateNewTax(annualIncome);
  const betterRegime = oldTax < newTax ? "Old Regime" : "New Regime";

  // ===== LOAD SAVED DATA =====
  useEffect(() => {
    const data = localStorage.getItem("savedSalaryData");
    if (data) {
      setSavedData(JSON.parse(data));
    }
  }, []);

  // ===== SAVE HANDLER =====
  const handleSave = () => {
    const newEntry: SavedSalary = {
      date: new Date().toLocaleString(),
      annualIncome,
      oldTax,
      newTax,
      betterRegime,
    };

    const updated = [newEntry, ...savedData];
    setSavedData(updated);
    localStorage.setItem("savedSalaryData", JSON.stringify(updated));
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Salary Slip Explainer</h1>

      {/* SUMMARY */}
      <div style={{ border: "2px solid #000", padding: "15px", marginBottom: "20px" }}>
        <h2>Annual Summary</h2>
        <p><b>Annual Income:</b> ₹{annualIncome.toLocaleString()}</p>
        <p><b>Old Regime Tax:</b> ₹{oldTax.toLocaleString()}</p>
        <p><b>New Regime Tax:</b> ₹{newTax.toLocaleString()}</p>
        <p><b>Better Option:</b> {betterRegime}</p>
      </div>

      {/* SAVE BUTTON */}
      {isPremiumUser ? (
        <button
          onClick={handleSave}
          style={{
            padding: "10px 15px",
            background: "#000",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          💾 Save This Salary
        </button>
      ) : (
        <p style={{ color: "gray" }}>
          🔒 Save salary feature is available for Premium users only.  
          <br />
          हिंदी: सैलरी सेव करने की सुविधा केवल प्रीमियम उपयोगकर्ताओं के लिए है।
        </p>
      )}

      {/* SAVED HISTORY */}
      <h2>Saved Salary History</h2>

      {savedData.length === 0 ? (
        <p>No saved records yet.</p>
      ) : (
        savedData.map((item, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <b>Date:</b> {item.date}
            <br />
            Annual Income: ₹{item.annualIncome.toLocaleString()}
            <br />
            Old Tax: ₹{item.oldTax.toLocaleString()}
            <br />
            New Tax: ₹{item.newTax.toLocaleString()}
            <br />
            Better: <b>{item.betterRegime}</b>
          </div>
        ))
      )}
    </main>
  );
}
