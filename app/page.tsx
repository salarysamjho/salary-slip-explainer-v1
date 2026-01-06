'use client';

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function HomePage() {
  // ===== PREMIUM STATE (NOW DYNAMIC) =====
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");
  const [cityType, setCityType] = useState<"X" | "Y" | "Z">("X");
  const [state, setState] = useState<string>("Maharashtra");

  // ===== LOAD RAZORPAY SCRIPT =====
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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

  // ===== RAZORPAY HANDLER =====
  const handleUpgrade = () => {
    if (!window.Razorpay) {
      alert("Razorpay not loaded yet");
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Razorpay TEST key
      amount: 9900, // ₹99 in paise
      currency: "INR",
      name: "Salary Slip Explainer",
      description: "Premium Access (Test Mode)",
      handler: function () {
        alert("Payment successful (Test Mode)");
        setIsPremiumUser(true);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Salary Slip Explainer</h1>

      {/* 🔒 PREMIUM CTA */}
      {!isPremiumUser && (
        <div
          style={{
            border: "2px solid #f39c12",
            padding: "12px",
            marginBottom: "20px",
            backgroundColor: "#fff8e1",
            borderRadius: "6px",
          }}
        >
          <b>🔒 Premium Access</b>
          <p>
            English: Unlock Government Orders, PDFs and advanced explanations.
          </p>
          <p>
            हिंदी: प्रीमियम लेकर सरकारी आदेश, PDF और एडवांस जानकारी अनलॉक करें।
          </p>

          <button
            onClick={handleUpgrade}
            style={{
              padding: "8px 14px",
              background: "#000",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Upgrade to Premium (₹99)
          </button>
        </div>
      )}

      {/* TOGGLES */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setViewMode("monthly")}>Monthly</button>
        <button
          onClick={() => setViewMode("annual")}
          style={{ marginLeft: "10px" }}
        >
          Annual
        </button>
      </div>

      {/* CITY & STATE */}
      <div style={{ marginBottom: "10px" }}>
        <label>City: </label>
        <select value={cityType} onChange={(e) => setCityType(e.target.value as any)}>
          <option value="X">X City</option>
          <option value="Y">Y City</option>
          <option value="Z">Z City</option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>State: </label>
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
        <p key={i}>{e.title}: ₹{e.amount.toLocaleString()}</p>
      ))}

      {/* DEDUCTIONS */}
      <h2>Deductions</h2>
      {deductions.map((d, i) => (
        <p key={i}>{d.title}: ₹{d.amount.toLocaleString()}</p>
      ))}

      {/* PREMIUM CONFIRMATION */}
      {isPremiumUser && (
        <div style={{ marginTop: "30px", color: "green" }}>
          ✅ Premium Activated. Government Orders are now unlocked.
        </div>
      )}
    </main>
  );
}
