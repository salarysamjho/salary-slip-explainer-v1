"use client";

import { useState } from "react";

type ExtraItem = {
  name: string;
  amount: number;
};

type UserPlan = "free" | "monthly" | "annual";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Home() {
  // ================= CONSTANTS =================
  const DA_RATE = 0.58;
  const TA_AMOUNT = 3600;
  const DA_ON_TA_RATE = 0.58;
  const HRA_RATES: Record<string, number> = { X: 0.3, Y: 0.2, Z: 0.1 };

  // ================= STATES =================
  const [basicPay, setBasicPay] = useState<number | "">("");
  const [city, setCity] = useState("X");
  const [npsApplicable, setNpsApplicable] = useState(true);
  const [cgeis, setCgeis] = useState<number | "">("");

  const [extraEarnings, setExtraEarnings] = useState<ExtraItem[]>([]);
  const [extraDeductions, setExtraDeductions] = useState<ExtraItem[]>([]);

  const [calcDone, setCalcDone] = useState(false);
  const [userPlan, setUserPlan] = useState<UserPlan>("free");

  // ================= HELPERS =================
  const explain = (name: string, type: "earning" | "deduction") => {
    const n = name.toLowerCase();
    if (n.includes("ltc")) return { en: "Leave Travel Concession.", hi: "अवकाश यात्रा रियायत।" };
    if (n.includes("bonus")) return { en: "Performance bonus.", hi: "प्रदर्शन आधारित बोनस।" };
    if (n.includes("overtime")) return { en: "Overtime payment.", hi: "अतिरिक्त कार्य भुगतान।" };
    if (n === "pt" || n.includes("tax")) return { en: "Professional Tax.", hi: "प्रोफेशनल टैक्स।" };
    if (n.includes("union")) return { en: "Union fee.", hi: "यूनियन शुल्क।" };

    return {
      en: type === "earning" ? "Additional earning." : "Additional deduction.",
      hi: type === "earning" ? "अतिरिक्त आय।" : "अतिरिक्त कटौती।",
    };
  };

  const resetAll = () => {
    setBasicPay("");
    setCity("X");
    setNpsApplicable(true);
    setCgeis("");
    setExtraEarnings([]);
    setExtraDeductions([]);
    setCalcDone(false);
  };

  // ================= RAZORPAY =================
  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const pay = async (amount: number, plan: UserPlan) => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_test_REPLACE_WITH_YOUR_KEY",
      amount: amount * 100,
      currency: "INR",
      name: "Salary Slip Explainer",
      description: "Premium Access",
      handler: function () {
        alert("Payment Successful (Test Mode)");
        setUserPlan(plan);
      },
      theme: { color: "#1976d2" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ================= INPUT SCREEN =================
  if (!calcDone) {
    return (
      <div style={{ padding: 24, maxWidth: 900, margin: "auto" }}>
        <h1>Salary Slip Explainer</h1>

        <label>Basic Pay (₹): </label>
        <input type="number" value={basicPay} onChange={(e) => setBasicPay(Number(e.target.value))} />
        <br /><br />

        <label>City: </label>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="X">X City</option>
          <option value="Y">Y City</option>
          <option value="Z">Z City</option>
        </select>
        <br /><br />

        <label>
          <input type="checkbox" checked={npsApplicable} onChange={(e) => setNpsApplicable(e.target.checked)} /> NPS Applicable
        </label>
        <br /><br />

        <label>CGEIS Amount (₹): </label>
        <input type="number" value={cgeis} onChange={(e) => setCgeis(Number(e.target.value))} />
        <br /><br />

        <button onClick={() => setCalcDone(true)}>Calculate Salary</button>
      </div>
    );
  }

  // ================= CALCULATION =================
  const bp = Number(basicPay);
  const da = bp * DA_RATE;
  const hra = bp * HRA_RATES[city];
  const daOnTA = TA_AMOUNT * DA_ON_TA_RATE;
  const nps = npsApplicable ? (bp + da) * 0.1 : 0;

  const earningsTotal = bp + da + hra + TA_AMOUNT + daOnTA;
  const deductionsTotal = nps + Number(cgeis || 0);
  const netSalary = earningsTotal - deductionsTotal;

  // ================= RESULT SCREEN =================
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "auto" }}>
      <h1>Salary Slip Explainer</h1>
      <h2>Net Salary: ₹{netSalary.toFixed(2)}</h2>

      <div style={{ border: "1px dashed red", padding: 15, marginTop: 20 }}>
        <h3>🔒 Premium Features</h3>

        {userPlan === "free" && (
          <>
            <button onClick={() => pay(149, "annual")}>₹149 / Year</button>
            <button onClick={() => pay(49, "monthly")} style={{ marginLeft: 10 }}>
              ₹49 / Month
            </button>
            <button onClick={() => pay(10, "free")} style={{ marginLeft: 10 }}>
              ₹10 / PDF
            </button>
          </>
        )}

        {userPlan !== "free" && <p>✅ Premium Unlocked</p>}
      </div>

      <br />
      <button onClick={resetAll}>Reset</button>
    </div>
  );
}
