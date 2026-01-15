"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type ExtraItem = {
  name: string;
  amount: number;
};

export default function Home() {
  /* ===================== CONSTANTS ===================== */
  const DA_RATE = 0.58;
  const TA_AMOUNT = 3600;
  const DA_ON_TA_RATE = 0.58;
  const HRA_RATES: Record<string, number> = { X: 0.3, Y: 0.2, Z: 0.1 };

  /* ===================== STATES ===================== */
  const [basicPay, setBasicPay] = useState<number | "">("");
  const [city, setCity] = useState("X");
  const [npsApplicable, setNpsApplicable] = useState(true);
  const [cgeis, setCgeis] = useState<number | "">("");

  const [extraEarnings, setExtraEarnings] = useState<ExtraItem[]>([]);
  const [extraDeductions, setExtraDeductions] = useState<ExtraItem[]>([]);

  const [calculated, setCalculated] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);

  /* ===================== LOAD RAZORPAY ===================== */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayReady(true);
    document.body.appendChild(script);
  }, []);

  /* ===================== PAYMENT ===================== */
  const openPayment = () => {
    if (!razorpayReady || !window.Razorpay) {
      alert("Payment system not loaded. Please refresh.");
      return;
    }

    const options = {
      key: "rzp_test_REPLACE_WITH_YOUR_KEY", // 🔴 TEST KEY
      amount: 14900,
      currency: "INR",
      name: "Salary Slip Explainer",
      description: "Premium Access (Annual)",
      handler: function () {
        alert("Payment successful 🎉");
        setIsPremium(true);
      },
      modal: {
        ondismiss: function () {
          alert("Payment cancelled");
        },
      },
      theme: { color: "#1e40af" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  /* ===================== EXPLANATION ENGINE ===================== */
  const explain = (name: string, type: "earning" | "deduction") => {
    const n = name.toLowerCase();
    if (n.includes("ltc")) return { en: "Leave Travel Concession.", hi: "अवकाश यात्रा रियायत।" };
    if (n.includes("bonus")) return { en: "Performance-based bonus.", hi: "प्रदर्शन आधारित बोनस।" };
    if (n.includes("overtime")) return { en: "Overtime payment.", hi: "अतिरिक्त कार्य भुगतान।" };
    if (n === "pt" || n.includes("tax")) return { en: "Professional Tax.", hi: "प्रोफेशनल टैक्स।" };
    if (n.includes("loan") || n.includes("recovery"))
      return { en: "Loan recovery.", hi: "ऋण की वसूली।" };
    if (n.includes("union")) return { en: "Union fee.", hi: "यूनियन शुल्क।" };

    return {
      en: type === "earning" ? "Additional earning." : "Additional deduction.",
      hi: type === "earning" ? "अतिरिक्त आय।" : "अतिरिक्त कटौती।",
    };
  };

  /* ===================== RESET ===================== */
  const resetAll = () => {
    setBasicPay("");
    setCity("X");
    setNpsApplicable(true);
    setCgeis("");
    setExtraEarnings([]);
    setExtraDeductions([]);
    setCalculated(false);
  };

  /* ===================== INPUT SCREEN ===================== */
  if (!calculated) {
    return (
      <div style={{ padding: 24, maxWidth: 900, margin: "auto" }}>
        <h1>Salary Slip Explainer</h1>

        <label>Basic Pay (₹): </label>
        <input
          type="number"
          value={basicPay}
          onChange={(e) => setBasicPay(e.target.value === "" ? "" : Number(e.target.value))}
        />
        <br /><br />

        <label>City: </label>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="X">X City</option>
          <option value="Y">Y City</option>
          <option value="Z">Z City</option>
        </select>
        <br /><br />

        <label>
          <input
            type="checkbox"
            checked={npsApplicable}
            onChange={(e) => setNpsApplicable(e.target.checked)}
          />{" "}
          NPS Applicable
        </label>
        <br /><br />

        <label>CGEIS Amount (₹): </label>
        <input
          type="number"
          value={cgeis}
          onChange={(e) => setCgeis(e.target.value === "" ? "" : Number(e.target.value))}
        />
        <br /><br />

        <h3>Other Earnings (Optional)</h3>
        {extraEarnings.map((e, i) => (
          <div key={i}>
            <input
              placeholder="Name"
              value={e.name}
              onChange={(ev) => {
                const copy = [...extraEarnings];
                copy[i].name = ev.target.value;
                setExtraEarnings(copy);
              }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={e.amount}
              onChange={(ev) => {
                const copy = [...extraEarnings];
                copy[i].amount = Number(ev.target.value);
                setExtraEarnings(copy);
              }}
            />
          </div>
        ))}
        <button onClick={() => setExtraEarnings([...extraEarnings, { name: "", amount: 0 }])}>
          + Add Earning
        </button>

        <h3>Other Deductions (Optional)</h3>
        {extraDeductions.map((d, i) => (
          <div key={i}>
            <input
              placeholder="Name"
              value={d.name}
              onChange={(ev) => {
                const copy = [...extraDeductions];
                copy[i].name = ev.target.value;
                setExtraDeductions(copy);
              }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={d.amount}
              onChange={(ev) => {
                const copy = [...extraDeductions];
                copy[i].amount = Number(ev.target.value);
                setExtraDeductions(copy);
              }}
            />
          </div>
        ))}
        <button onClick={() => setExtraDeductions([...extraDeductions, { name: "", amount: 0 }])}>
          + Add Deduction
        </button>

        <br /><br />
        <button onClick={() => setCalculated(true)}>Calculate Salary</button>
      </div>
    );
  }

  /* ===================== CALCULATION ===================== */
  const bp = Number(basicPay);
  const da = bp * DA_RATE;
  const hra = bp * HRA_RATES[city];
  const daOnTA = TA_AMOUNT * DA_ON_TA_RATE;
  const nps = npsApplicable ? (bp + da) * 0.1 : 0;

  const earningsTotal =
    bp + da + hra + TA_AMOUNT + daOnTA + extraEarnings.reduce((a, b) => a + b.amount, 0);

  const deductionsTotal =
    nps + Number(cgeis || 0) + extraDeductions.reduce((a, b) => a + b.amount, 0);

  const netSalary = earningsTotal - deductionsTotal;

  /* ===================== RESULT SCREEN ===================== */
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "auto" }}>
      <h1>Salary Slip Explainer</h1>
      <h2>Net Salary: ₹{netSalary.toFixed(2)}</h2>

      {!isPremium && (
        <div style={{ border: "1px dashed red", padding: 15, marginBottom: 20 }}>
          <b>🔒 Premium Features Locked</b><br />
          Govt Orders, PDFs & history<br /><br />
          <button onClick={openPayment}>Unlock Premium ₹149/year</button>
        </div>
      )}

      {isPremium && <p style={{ color: "green" }}>✅ Premium Unlocked</p>}

      <h3>Other Earnings</h3>
      {extraEarnings.map((e, i) => {
        const exp = explain(e.name, "earning");
        return (
          <div key={i}>
            <b>{e.name}: ₹{e.amount}</b>
            <p>{exp.en}</p>
            <p>{exp.hi}</p>
          </div>
        );
      })}

      <h3>Other Deductions</h3>
      {extraDeductions.map((d, i) => {
        const exp = explain(d.name, "deduction");
        return (
          <div key={i}>
            <b>{d.name}: ₹{d.amount}</b>
            <p>{exp.en}</p>
            <p>{exp.hi}</p>
          </div>
        );
      })}

      <br />
      <button onClick={resetAll}>Reset</button>
    </div>
  );
}
