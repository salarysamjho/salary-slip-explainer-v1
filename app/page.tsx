'use client';

import { useState } from "react";

export default function HomePage() {
  const isPremiumUser = false;

  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");
  const [cityType, setCityType] = useState<"X" | "Y" | "Z">("X");

  // ===== CORE VALUES =====
  const basicPay = 35400;
  const daRate = 0.49; // current DA (example)
  const daAmount = Math.round(basicPay * daRate);

  // HRA rates as per your decision
  const hraRateMap = {
    X: 0.30,
    Y: 0.20,
    Z: 0.10,
  };

  const hraAmount = Math.round(basicPay * hraRateMap[cityType]);

  // ===== EARNINGS =====
  const earnings = [
    {
      title: "Basic Pay",
      amount: basicPay,
      explanationEn:
        "Basic Pay is the core component of salary. All allowances and most deductions are calculated based on it.",
      explanationHi:
        "बेसिक पे वेतन का मुख्य हिस्सा होता है, जिसके आधार पर सभी भत्ते और अधिकतर कटौतियाँ तय होती हैं।",
      appliesTo: "All Government Employees",
      calculation: "Fixed as per Pay Level under 7th Pay Commission",
      currentRate: "Pay Level based (7th CPC Pay Matrix)",
      lastRevised: "7th Pay Commission (2016)",
      arrears: "Yes, if revision is delayed",
      orderLink: null,
    },
    {
      title: "Dearness Allowance (DA)",
      amount: daAmount,
      explanationEn:
        "Dearness Allowance is paid to offset the impact of inflation and is revised twice every year.",
      explanationHi:
        "महंगाई भत्ता महंगाई के प्रभाव को कम करने के लिए दिया जाता है और साल में दो बार संशोधित किया जाता है।",
      appliesTo: "All Government Employees",
      calculation: "Percentage of Basic Pay",
      currentRate: "49% of Basic Pay",
      lastRevised: "Revised by Government (Jan / July)",
      arrears: "Yes, paid from effective date",
      orderLink: "https://egazette.nic.in/",
    },
    {
      title: "House Rent Allowance (HRA)",
      amount: hraAmount,
      explanationEn:
        "House Rent Allowance depends on the city of posting and is calculated as a percentage of Basic Pay.",
      explanationHi:
        "मकान किराया भत्ता कर्मचारी के कार्यस्थल के शहर पर निर्भर करता है और बेसिक पे के प्रतिशत के रूप में दिया जाता है।",
      appliesTo: "Employees not using government accommodation",
      calculation: "30% / 20% / 10% of Basic Pay (X / Y / Z City)",
      currentRate:
        cityType === "X"
          ? "30% (X City)"
          : cityType === "Y"
          ? "20% (Y City)"
          : "10% (Z City)",
      lastRevised: "As per applicable DA-based revision",
      arrears: "Yes, if notified",
      orderLink: "https://doe.gov.in/files/cenetral-pay_document/HRA_Eng_1.pdf",
    },
    {
      title: "Transport Allowance",
      amount: 3600,
      explanationEn:
        "Transport Allowance is paid to cover daily commuting expenses.",
      explanationHi:
        "ट्रांसपोर्ट अलाउंस रोज़ाना आने-जाने के खर्चों के लिए दिया जाता है।",
      appliesTo: "Most Government Employees",
      calculation: "Fixed amount based on Pay Level",
      currentRate: "₹1,800 – ₹7,200 + DA",
      lastRevised: "7th Pay Commission",
      arrears: "Yes",
      orderLink: "https://egazette.nic.in/",
    },
  ];

  // ===== DEDUCTIONS =====
  const deductions = [
    {
      title: "NPS Contribution",
      amount: Math.round((basicPay + daAmount) * 0.10),
      explanationEn:
        "National Pension System (NPS) is a mandatory retirement savings scheme for government employees.",
      explanationHi:
        "नेशनल पेंशन सिस्टम (NPS) सरकारी कर्मचारियों के लिए अनिवार्य रिटायरमेंट पेंशन योजना है।",
      appliesTo: "Government Employees (Joined on or after 01-01-2004)",
      calculation: "10% of (Basic Pay + DA)",
      lastRevised: "01 April 2019",
      arrears: "No (prospective)",
      orderLink: "https://egazette.nic.in/",
    },
    {
      title: "Professional Tax",
      amount: 200,
      explanationEn:
        "Professional tax is levied by state governments as per state laws.",
      explanationHi:
        "प्रोफेशनल टैक्स राज्य सरकार द्वारा राज्य कानूनों के अनुसार लिया जाता है।",
      appliesTo: "State-specific",
      calculation: "Fixed slab",
      lastRevised: "State Government Notification",
      arrears: "No",
      orderLink: null,
    },
  ];

  // ===== CALCULATIONS =====
  const multiplier = viewMode === "monthly" ? 1 : 12;

  const grossSalary =
    earnings.reduce((sum, item) => sum + item.amount, 0) * multiplier;

  const totalDeductions =
    deductions.reduce((sum, item) => sum + item.amount, 0) * multiplier;

  const netSalary = grossSalary - totalDeductions;

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Salary Slip Explainer</h1>

      {/* VIEW MODE */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setViewMode("monthly")}>Monthly</button>
        <button onClick={() => setViewMode("annual")} style={{ marginLeft: "10px" }}>
          Annual
        </button>
      </div>

      {/* CITY SELECT */}
      <div style={{ marginBottom: "20px" }}>
        <label><b>Select City Category:</b> </label>
        <select
          value={cityType}
          onChange={(e) => setCityType(e.target.value as "X" | "Y" | "Z")}
        >
          <option value="X">X City (Metro)</option>
          <option value="Y">Y City</option>
          <option value="Z">Z City</option>
        </select>
      </div>

      {/* SUMMARY */}
      <div
        style={{
          border: "2px solid #000",
          padding: "15px",
          marginBottom: "25px",
          borderRadius: "6px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Salary Summary ({viewMode === "monthly" ? "Monthly" : "Annual"})</h2>
        <p><b>Gross Salary:</b> ₹{grossSalary.toLocaleString()}</p>
        <p><b>Total Deductions:</b> ₹{totalDeductions.toLocaleString()}</p>
        <p style={{ fontSize: "18px" }}>
          <b>Net (Take-Home) Salary:</b> ₹{netSalary.toLocaleString()}
        </p>
      </div>

      {/* EARNINGS */}
      <h2>Earnings</h2>
      {earnings.map((item, index) => (
        <div key={index} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "15px" }}>
          <h3>{item.title} – ₹{item.amount.toLocaleString()}</h3>
          <p>{item.explanationEn}</p>
          <p>{item.explanationHi}</p>
          <p><b>Calculation:</b> {item.calculation}</p>
          <p><b>Current Rate:</b> {item.currentRate}</p>
          <p><b>Last Revised:</b> {item.lastRevised}</p>

          {item.orderLink &&
            (isPremiumUser ? (
              <a href={item.orderLink} target="_blank">View Government Order</a>
            ) : (
              <span style={{ color: "gray" }}>🔒 Premium Only</span>
            ))}
        </div>
      ))}

      {/* DEDUCTIONS */}
      <h2>Deductions</h2>
      {deductions.map((item, index) => (
        <div key={index} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "15px" }}>
          <h3>{item.title} – ₹{item.amount.toLocaleString()}</h3>
          <p>{item.explanationEn}</p>
          <p>{item.explanationHi}</p>
          <p><b>Calculation:</b> {item.calculation}</p>

          {item.orderLink &&
            (isPremiumUser ? (
              <a href={item.orderLink} target="_blank">View Government Order</a>
            ) : (
              <span style={{ color: "gray" }}>🔒 Premium Only</span>
            ))}
        </div>
      ))}
    </main>
  );
}
