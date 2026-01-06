'use client';

import { useState } from "react";

export default function HomePage() {
  // ===== PREMIUM FLAG =====
  const isPremiumUser = false;

  const [viewMode, setViewMode] = useState<"monthly" | "annual">("annual");

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

  // ===== CALCULATIONS =====
  const annualIncome =
    earnings.reduce((sum, e) => sum + e.amount, 0) * 12;

  // ===== STEP 21: OLD REGIME TAX =====
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

  const oldTax = calculateOldTax(oldRegimeTaxableIncome);

  // ===== STEP 21: NEW REGIME TAX =====
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

  const newTax = calculateNewTax(annualIncome);

  const betterRegime =
    oldTax < newTax ? "Old Regime" : "New Regime";

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Salary Slip Explainer</h1>

      {/* SUMMARY */}
      <div style={{ border: "2px solid #000", padding: "15px", marginBottom: "25px" }}>
        <h2>Annual Salary Summary</h2>
        <p><b>Annual Income:</b> ₹{annualIncome.toLocaleString()}</p>
      </div>

      {/* STEP 21: TAX COMPARISON */}
      <h2>Income Tax Comparison</h2>

      {!isPremiumUser ? (
        <p style={{ color: "gray" }}>
          🔒 Premium users can view detailed tax comparison.  
          <br />
          हिंदी: टैक्स तुलना देखने के लिए प्रीमियम आवश्यक है।
        </p>
      ) : (
        <>
          <div style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "12px" }}>
            <b>Old Regime</b>
            <p>Taxable Income: ₹{oldRegimeTaxableIncome.toLocaleString()}</p>
            <p>Estimated Tax: ₹{oldTax.toLocaleString()}</p>
          </div>

          <div style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "12px" }}>
            <b>New Regime</b>
            <p>Taxable Income: ₹{annualIncome.toLocaleString()}</p>
            <p>Estimated Tax: ₹{newTax.toLocaleString()}</p>
          </div>

          <div style={{ border: "2px solid green", padding: "12px" }}>
            <b>Better Option:</b> {betterRegime}
            <p>
              English: Based on your income and deductions, the{" "}
              <b>{betterRegime}</b> results in lower tax.
            </p>
            <p>
              हिंदी: आपकी आय और कटौतियों के आधार पर{" "}
              <b>{betterRegime}</b> टैक्स के लिए बेहतर है।
            </p>
          </div>
        </>
      )}

      <p style={{ fontSize: "12px", marginTop: "25px", color: "#555" }}>
        Note: This is an approximate calculation. Health & education cess
        and special cases are not included.
      </p>
    </main>
  );
}
