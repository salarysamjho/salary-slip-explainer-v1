'use client';

import { useState } from "react";

export default function HomePage() {
  // ===== PREMIUM FLAG (SINGLE SOURCE OF TRUTH) =====
  const isPremiumUser = false; // later controlled by login/payment

  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");
  const [cityType, setCityType] = useState<"X" | "Y" | "Z">("X");
  const [state, setState] = useState<string>("Maharashtra");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
    {
      title: "Basic Pay",
      amount: basicPay,
      explanationEn:
        "Basic Pay is the core component of salary. All allowances and most deductions are calculated based on it.",
      explanationHi:
        "बेसिक पे वेतन का मुख्य हिस्सा होता है, जिसके आधार पर सभी भत्ते और अधिकतर कटौतियाँ तय होती हैं।",
      orderLink: null,
    },
    {
      title: "Dearness Allowance (DA)",
      amount: daAmount,
      explanationEn:
        "Dearness Allowance offsets inflation and is revised twice every year.",
      explanationHi:
        "महंगाई भत्ता महंगाई के प्रभाव को कम करने के लिए दिया जाता है।",
      orderLink: "https://egazette.nic.in/",
    },
    {
      title: "House Rent Allowance (HRA)",
      amount: hraAmount,
      explanationEn:
        "HRA depends on city category (X / Y / Z).",
      explanationHi:
        "एचआरए शहर की श्रेणी (X / Y / Z) पर निर्भर करता है।",
      orderLink:
        "https://doe.gov.in/files/cenetral-pay_document/HRA_Eng_1.pdf",
    },
    {
      title: "Transport Allowance",
      amount: 3600,
      explanationEn: "Covers daily commuting expenses.",
      explanationHi: "आवागमन खर्च के लिए दिया जाता है।",
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
      orderLink: "https://egazette.nic.in/",
    },
    {
      title: "Professional Tax",
      amount: professionalTax,
      explanationEn:
        "Professional Tax varies by state.",
      explanationHi:
        "प्रोफेशनल टैक्स राज्य के अनुसार बदलता है।",
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

  // ===== FILE UPLOAD HANDLER =====
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Salary Slip Explainer</h1>

      {/* 🔒 PREMIUM BANNER */}
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
          <b>🔒 Premium Feature</b>
          <p>
            English: Unlock Government Orders, PDF downloads and revision
            history with Premium.
          </p>
          <p>
            हिंदी: प्रीमियम के साथ सरकारी आदेश, PDF डाउनलोड और संशोधन
            इतिहास अनलॉक करें।
          </p>
        </div>
      )}

      {/* STEP 15: UPLOAD */}
      <div
        style={{
          border: "2px dashed #666",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "6px",
        }}
      >
        <h2>Upload Your Salary Slip</h2>
        <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} />

        {uploadedFile && (
          <p>
            ✅ <b>{uploadedFile.name}</b> uploaded successfully.
          </p>
        )}
      </div>

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
        <div key={i} style={{ marginBottom: "10px" }}>
          <b>{e.title}:</b> ₹{e.amount.toLocaleString()}
          <p>{e.explanationEn}</p>
          <p>{e.explanationHi}</p>

          {e.orderLink &&
            (isPremiumUser ? (
              <a href={e.orderLink} target="_blank">View Government Order</a>
            ) : (
              <span style={{ color: "gray" }}>🔒 Premium</span>
            ))}
        </div>
      ))}

      {/* DEDUCTIONS */}
      <h2>Deductions</h2>
      {deductions.map((d, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <b>{d.title}:</b> ₹{d.amount.toLocaleString()}
          <p>{d.explanationEn}</p>
          <p>{d.explanationHi}</p>

          {d.orderLink &&
            (isPremiumUser ? (
              <a href={d.orderLink} target="_blank">View Government Order</a>
            ) : (
              <span style={{ color: "gray" }}>🔒 Premium</span>
            ))}
        </div>
      ))}
    </main>
  );
}
