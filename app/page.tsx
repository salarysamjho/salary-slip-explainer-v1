"use client";

import { useState } from "react";

type ExtraItem = {
  name: string;
  amount: number;
};

export default function Home() {
  const DA_RATE = 0.58;
  const TA_AMOUNT = 3600;
  const DA_ON_TA_RATE = 0.58;

  const HRA_RATES: Record<string, number> = { X: 0.3, Y: 0.2, Z: 0.1 };

  const [basicPay, setBasicPay] = useState<number | "">("");
  const [city, setCity] = useState("X");
  const [npsApplicable, setNpsApplicable] = useState(true);
  const [cgeis, setCgeis] = useState<number | "">("");

  const [extraEarnings, setExtraEarnings] = useState<ExtraItem[]>([]);
  const [extraDeductions, setExtraDeductions] = useState<ExtraItem[]>([]);

  const [calcDone, setCalcDone] = useState(false);

  const resetAll = () => {
    setBasicPay("");
    setCity("X");
    setNpsApplicable(true);
    setCgeis("");
    setExtraEarnings([]);
    setExtraDeductions([]);
    setCalcDone(false);
  };

  const explain = (name: string, type: "earning" | "deduction") => {
    const n = name.toLowerCase();
    if (n.includes("ltc"))
      return {
        en: "Leave Travel Concession provided for travel expenses.",
        hi: "यात्रा व्यय के लिए दिया जाने वाला अवकाश यात्रा रियायत।",
      };
    if (n.includes("bonus"))
      return {
        en: "Performance-based incentive paid by employer.",
        hi: "नियोक्ता द्वारा दिया गया प्रदर्शन आधारित प्रोत्साहन।",
      };
    if (n.includes("overtime"))
      return {
        en: "Payment for extra working hours.",
        hi: "अतिरिक्त कार्य घंटों के लिए भुगतान।",
      };
    if (n.includes("tax"))
      return {
        en: "Tax deducted as per state law.",
        hi: "राज्य कानून के अनुसार काटा गया कर।",
      };
    if (n.includes("loan"))
      return {
        en: "Salary recovery towards loan repayment.",
        hi: "ऋण चुकौती हेतु वेतन से कटौती।",
      };
    if (n.includes("union"))
      return {
        en: "Employee union membership contribution.",
        hi: "कर्मचारी यूनियन सदस्यता शुल्क।",
      };

    return {
      en:
        type === "earning"
          ? "Additional earning declared by employee."
          : "Additional deduction declared by employee.",
      hi:
        type === "earning"
          ? "कर्मचारी द्वारा घोषित अतिरिक्त आय।"
          : "कर्मचारी द्वारा घोषित अतिरिक्त कटौती।",
    };
  };

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

        <h3>Other Earnings (Optional)</h3>
        {extraEarnings.map((e, i) => (
          <div key={i}>
            <input placeholder="Name" value={e.name} onChange={(ev) => {
              const copy = [...extraEarnings];
              copy[i].name = ev.target.value;
              setExtraEarnings(copy);
            }} />
            <input type="number" placeholder="Amount" value={e.amount} onChange={(ev) => {
              const copy = [...extraEarnings];
              copy[i].amount = Number(ev.target.value);
              setExtraEarnings(copy);
            }} />
          </div>
        ))}
        <button onClick={() => setExtraEarnings([...extraEarnings, { name: "", amount: 0 }])}>+ Add Earning</button>

        <h3>Other Deductions (Optional)</h3>
        {extraDeductions.map((d, i) => (
          <div key={i}>
            <input placeholder="Name" value={d.name} onChange={(ev) => {
              const copy = [...extraDeductions];
              copy[i].name = ev.target.value;
              setExtraDeductions(copy);
            }} />
            <input type="number" placeholder="Amount" value={d.amount} onChange={(ev) => {
              const copy = [...extraDeductions];
              copy[i].amount = Number(ev.target.value);
              setExtraDeductions(copy);
            }} />
          </div>
        ))}
        <button onClick={() => setExtraDeductions([...extraDeductions, { name: "", amount: 0 }])}>+ Add Deduction</button>

        <br /><br />
        <button onClick={() => setCalcDone(true)}>Calculate Salary</button>
      </div>
    );
  }

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

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "auto" }}>
      <h1>Salary Slip Explainer</h1>
      <h2>Net Salary: ₹{netSalary.toFixed(2)}</h2>

      <h3>Other Earnings</h3>
      {extraEarnings.map((e, i) => {
        const exp = explain(e.name, "earning");
        return (
          <div key={i}>
            <b>{e.name}: ₹{e.amount}</b>
            <p>English: {exp.en}</p>
            <p>हिंदी: {exp.hi}</p>
          </div>
        );
      })}

      <h3>Other Deductions</h3>
      {extraDeductions.map((d, i) => {
        const exp = explain(d.name, "deduction");
        return (
          <div key={i}>
            <b>{d.name}: ₹{d.amount}</b>
            <p>English: {exp.en}</p>
            <p>हिंदी: {exp.hi}</p>
          </div>
        );
      })}

      <button onClick={resetAll}>Reset</button>
    </div>
  );
}
