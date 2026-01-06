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
  const isPremiumUser = false; // toggle for testing

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

  const annualIncome =
    earnings.reduce((sum, e) => sum + e.amount, 0) * 12;

  // ===== TAX =====
  const oldTax = 85000;
  const newTax = 103000;
  const betterRegime = oldTax < newTax ? "Old Regime" : "New Regime";

  // ===== STORAGE =====
  useEffect(() => {
    const data = localStorage.getItem("savedSalaryData");
    if (data) setSavedData(JSON.parse(data));
  }, []);

  const saveSalary = () => {
    const entry: SavedSalary = {
      date: new Date().toLocaleString(),
      annualIncome,
      oldTax,
      newTax,
      betterRegime,
    };
    const updated = [entry, ...savedData];
    setSavedData(updated);
    localStorage.setItem("savedSalaryData", JSON.stringify(updated));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "20px",
        fontFamily: "system-ui, Arial",
      }}
    >
      {/* HEADER */}
      <header style={{ marginBottom: "20px" }}>
        <h1 style={{ marginBottom: "5px" }}>Salary Slip Explainer</h1>
        <p style={{ color: "#555" }}>
          Understand your salary, deductions & tax — clearly.
        </p>
      </header>

      {/* PREMIUM BANNER */}
      {!isPremiumUser && (
        <div
          style={{
            background: "#fff3cd",
            border: "1px solid #ffeeba",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <b>🔒 Premium Features</b>
          <p style={{ margin: "5px 0" }}>
            Unlock PDF downloads, tax comparison & saved history.
          </p>
          <p style={{ fontSize: "14px", color: "#555" }}>
            हिंदी: प्रीमियम में PDF, टैक्स तुलना और सेव की गई सैलरी उपलब्ध है।
          </p>
        </div>
      )}

      {/* SUMMARY CARD */}
      <section
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Annual Salary Summary</h2>
        <p><b>Annual Income:</b> ₹{annualIncome.toLocaleString()}</p>
        <p><b>Old Regime Tax:</b> ₹{oldTax.toLocaleString()}</p>
        <p><b>New Regime Tax:</b> ₹{newTax.toLocaleString()}</p>
        <p>
          <b>Better Option:</b>{" "}
          <span style={{ color: "green" }}>{betterRegime}</span>
        </p>
      </section>

      {/* EARNINGS */}
      <section
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Earnings</h2>
        {earnings.map((e, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{e.title}</span>
            <b>₹{e.amount.toLocaleString()}</b>
          </div>
        ))}
      </section>

      {/* SAVE BUTTON */}
      <section
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Save Salary</h2>

        {isPremiumUser ? (
          <button
            onClick={saveSalary}
            style={{
              padding: "10px 16px",
              background: "#000",
              color: "#fff",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            💾 Save This Salary
          </button>
        ) : (
          <p style={{ color: "#777" }}>
            🔒 Saving salary is a Premium feature.
          </p>
        )}
      </section>

      {/* SAVED HISTORY */}
      <section
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Saved Salary History</h2>

        {savedData.length === 0 ? (
          <p style={{ color: "#777" }}>No saved records yet.</p>
        ) : (
          savedData.map((s, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #eee",
                borderRadius: "6px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <b>Date:</b> {s.date}
              <br />
              Income: ₹{s.annualIncome.toLocaleString()}
              <br />
              Better: <b>{s.betterRegime}</b>
            </div>
          ))
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ marginTop: "30px", textAlign: "center", color: "#777" }}>
        <small>
          This is an informational tool. Tax values are approximate.
        </small>
      </footer>
    </main>
  );
}
