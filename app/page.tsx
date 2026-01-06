'use client';

import { useState } from "react";

/* ===============================
   SMART EXPLANATION ENGINE
=============================== */
function getExplanation(name: string, type: "earning" | "deduction") {
  const key = name.toLowerCase();

  if (key.includes("professional")) {
    return {
      en: "Professional Tax is a state-level tax deducted from salary as per state laws.",
      hi: "प्रोफेशनल टैक्स राज्य सरकार द्वारा लगाया जाने वाला कर है जो वेतन से काटा जाता है।",
    };
  }

  if (key.includes("special")) {
    return {
      en: "Special Allowance is an employer-specific allowance and is usually fully taxable.",
      hi: "स्पेशल अलाउंस नियोक्ता द्वारा दिया जाने वाला भत्ता है और सामान्यतः पूरी तरह टैक्सेबल होता है।",
    };
  }

  if (key.includes("overtime")) {
    return {
      en: "Overtime allowance is paid for extra hours worked beyond regular duty hours.",
      hi: "ओवरटाइम भत्ता अतिरिक्त कार्य समय के लिए दिया जाता है।",
    };
  }

  if (key.includes("lic")) {
    return {
      en: "This deduction is usually an insurance premium paid towards LIC policies.",
      hi: "यह कटौती सामान्यतः एलआईसी बीमा प्रीमियम के लिए होती है।",
    };
  }

  if (key.includes("loan")) {
    return {
      en: "This deduction is towards repayment of a loan or advance taken by the employee.",
      hi: "यह कटौती कर्मचारी द्वारा लिए गए ऋण या अग्रिम की वापसी के लिए होती है।",
    };
  }

  if (key.includes("gpf") || key.includes("cpf")) {
    return {
      en: "This is a provident fund contribution deducted for retirement benefits.",
      hi: "यह भविष्य निधि में योगदान है जो सेवानिवृत्ति लाभ के लिए काटा जाता है।",
    };
  }

  if (key.includes("union")) {
    return {
      en: "Union fee is a voluntary contribution towards employee union activities.",
      hi: "यूनियन शुल्क कर्मचारी संघ की गतिविधियों के लिए स्वैच्छिक योगदान होता है।",
    };
  }

  return {
    en:
      type === "earning"
        ? "This is an additional earning entered by you from your salary slip."
        : "This is an additional deduction entered by you from your salary slip.",
    hi:
      type === "earning"
        ? "यह अतिरिक्त आय है जो आपने अपनी सैलरी स्लिप से जोड़ी है।"
        : "यह अतिरिक्त कटौती है जो आपने अपनी सैलरी स्लिप से जोड़ी है।",
  };
}

export default function HomePage() {
  /* ===============================
     INPUT STATES
  =============================== */
  const [basicPay, setBasicPay] = useState<number | null>(null);
  const [cityType, setCityType] = useState<"X" | "Y" | "Z">("X");
  const [npsEnabled, setNpsEnabled] = useState(true);

  const [cgeisEnabled, setCgeisEnabled] = useState(false);
  const [cgeisGroup, setCgeisGroup] = useState<"A" | "B" | "C" | "D">("C");

  const [otherEarnings, setOtherEarnings] = useState<{ name: string; amount: number }[]>([]);
  const [otherDeductions, setOtherDeductions] = useState<{ name: string; amount: number }[]>([]);

  const [calculated, setCalculated] = useState(false);

  /* ===============================
     GOVERNMENT RULES
  =============================== */
  const DA_RATE = 0.58;
  const HRA_RATE = { X: 0.30, Y: 0.20, Z: 0.10 };
  const CGEIS_MAP = { A: 30, B: 15, C: 7.5, D: 4 };

  /* ===============================
     CALCULATIONS
  =============================== */
  const daAmount = basicPay ? Math.round(basicPay * DA_RATE) : 0;
  const hraAmount = basicPay ? Math.round(basicPay * HRA_RATE[cityType]) : 0;

  const baseTA = cityType === "X" ? 3600 : 1800;
  const taWithDA = Math.round(baseTA + baseTA * DA_RATE);

  const npsAmount =
    basicPay && npsEnabled ? Math.round((basicPay + daAmount) * 0.1) : 0;

  const cgeisAmount = cgeisEnabled ? CGEIS_MAP[cgeisGroup] : 0;

  const otherEarningsTotal = otherEarnings.reduce((s, e) => s + e.amount, 0);
  const otherDeductionsTotal = otherDeductions.reduce((s, d) => s + d.amount, 0);

  const totalEarnings =
    (basicPay ?? 0) +
    daAmount +
    hraAmount +
    taWithDA +
    otherEarningsTotal;

  const totalDeductions =
    npsAmount + cgeisAmount + otherDeductionsTotal;

  const netSalary = totalEarnings - totalDeductions;

  /* ===============================
     HANDLERS
  =============================== */
  const handleCalculate = () => {
    if (!basicPay || basicPay <= 0) {
      alert("Please enter a valid Basic Pay.");
      return;
    }
    setCalculated(true);
  };

  const addItem = (
    setter: any,
    list: any[]
  ) => setter([...list, { name: "", amount: 0 }]);

  const updateItem = (
    setter: any,
    list: any[],
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [...list];
    updated[index][field] = field === "amount" ? Number(value) : value;
    setter(updated);
  };

  return (
    <main style={{ padding: 20, fontFamily: "system-ui", background: "#f4f6f8" }}>
      <h1>Salary Slip Explainer</h1>

      {/* BASIC INPUT */}
      <section style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
        <label>Basic Pay (₹)</label>
        <input type="number" value={basicPay ?? ""} onChange={e => setBasicPay(Number(e.target.value))} />

        <label>City</label>
        <select value={cityType} onChange={e => setCityType(e.target.value as any)}>
          <option value="X">X City</option>
          <option value="Y">Y City</option>
          <option value="Z">Z City</option>
        </select>

        <label>
          <input type="checkbox" checked={npsEnabled} onChange={() => setNpsEnabled(!npsEnabled)} />
          NPS applicable
        </label>

        <label>
          <input type="checkbox" checked={cgeisEnabled} onChange={() => setCgeisEnabled(!cgeisEnabled)} />
          CGEIS applicable
        </label>

        {cgeisEnabled && (
          <select value={cgeisGroup} onChange={e => setCgeisGroup(e.target.value as any)}>
            <option value="A">Group A</option>
            <option value="B">Group B</option>
            <option value="C">Group C</option>
            <option value="D">Group D</option>
          </select>
        )}

        <button onClick={handleCalculate}>Calculate Salary</button>
      </section>

      {/* OTHER EARNINGS */}
      <section>
        <h3>Other Earnings (Optional)</h3>
        {otherEarnings.map((e, i) => (
          <div key={i}>
            <input placeholder="Name" onChange={v => updateItem(setOtherEarnings, otherEarnings, i, "name", v.target.value)} />
            <input type="number" placeholder="Amount" onChange={v => updateItem(setOtherEarnings, otherEarnings, i, "amount", v.target.value)} />
          </div>
        ))}
        <button onClick={() => addItem(setOtherEarnings, otherEarnings)}>+ Add Earning</button>
      </section>

      {/* OTHER DEDUCTIONS */}
      <section>
        <h3>Other Deductions (Optional)</h3>
        {otherDeductions.map((d, i) => (
          <div key={i}>
            <input placeholder="Name" onChange={v => updateItem(setOtherDeductions, otherDeductions, i, "name", v.target.value)} />
            <input type="number" placeholder="Amount" onChange={v => updateItem(setOtherDeductions, otherDeductions, i, "amount", v.target.value)} />
          </div>
        ))}
        <button onClick={() => addItem(setOtherDeductions, otherDeductions)}>+ Add Deduction</button>
      </section>

      {/* RESULT */}
      {calculated && (
        <section style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
          <h2>Net Salary: ₹{netSalary.toLocaleString()}</h2>
        </section>
      )}
    </main>
  );
}
