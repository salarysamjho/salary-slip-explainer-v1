'use client';

import { useState } from "react";

export default function HomePage() {
  const isPremiumUser = false;

  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");
  const [cityType, setCityType] = useState<"X" | "Y" | "Z">("X");
  const [state, setState] = useState<string>("Maharashtra");

  // Step 15: Salary slip upload state
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

  // ===== FILE HANDLER =====
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Salary Slip Explainer</h1>

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
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={handleFileUpload}
        />

        {uploadedFile && (
          <p style={{ marginTop: "10px" }}>
            ✅ <b>{uploadedFile.name}</b> uploaded successfully.  
            <br />
            We will explain your salary components below.
          </p>
        )}

        <p style={{ fontSize: "13px", color: "#555" }}>
          English: For accuracy, salary slip details are explained manually in this version.  
          <br />
          हिंदी: सही जानकारी के लिए इस संस्करण में वेतन पर्ची की व्याख्या मैन्युअल रूप से की जाती है।
        </p>
      </div>

      {/* TOGGLES */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setViewMode("monthly")}>Monthly</button>
        <button onClick={() => setViewMode("annual")} style={{ marginLeft: "10px" }}>
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
    </main>
  );
}
