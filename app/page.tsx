"use client";

import { useState } from "react";

export default function Home() {
  const DA_RATE = 0.58;
  const TA_AMOUNT = 3600;
  const DA_ON_TA_RATE = 0.58;

  const HRA_RATES: Record<string, number> = {
    X: 0.3,
    Y: 0.2,
    Z: 0.1,
  };

  const [basicPay, setBasicPay] = useState<number | "">("");
  const [city, setCity] = useState("X");
  const [npsApplicable, setNpsApplicable] = useState(true);
  const [cgeis, setCgeis] = useState<number | "">("");
  const [calculated, setCalculated] = useState(false);

  const resetAll = () => {
    setBasicPay("");
    setCity("X");
    setNpsApplicable(true);
    setCgeis("");
    setCalculated(false);
  };

  if (!calculated) {
    return (
      <div style={{ padding: 24, maxWidth: 900, margin: "auto" }}>
        <h1>Salary Slip Explainer</h1>

        <label>Basic Pay (₹): </label>
        <input
          type="number"
          value={basicPay}
          onChange={(e) => setBasicPay(Number(e.target.value))}
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
          onChange={(e) => setCgeis(Number(e.target.value))}
        />
        <br /><br />

        <button onClick={() => setCalculated(true)}>Calculate Salary</button>
      </div>
    );
  }

  const bp = Number(basicPay);
  const da = bp * DA_RATE;
  const hra = bp * HRA_RATES[city];
  const daOnTA = TA_AMOUNT * DA_ON_TA_RATE;
  const nps = npsApplicable ? (bp + da) * 0.1 : 0;
  const cgeisAmt = Number(cgeis) || 0;

  const earnings = [
    {
      title: "Basic Pay",
      amount: bp,
      en: "Fixed component of salary on which all allowances are calculated.",
      hi: "वेतन का मुख्य भाग जिस पर सभी भत्ते आधारित होते हैं।",
    },
    {
      title: "Dearness Allowance (58%)",
      amount: da,
      en: "Paid to offset inflation, revised periodically by the Government.",
      hi: "महंगाई के प्रभाव को कम करने हेतु दिया जाता है।",
    },
    {
      title: "House Rent Allowance (HRA)",
      amount: hra,
      en: `Calculated as ${HRA_RATES[city] * 100}% of Basic Pay based on city category.`,
      hi: "शहर श्रेणी के अनुसार मूल वेतन का प्रतिशत।",
    },
    {
      title: "Transport Allowance",
      amount: TA_AMOUNT,
      en: "Fixed allowance for commuting expenses.",
      hi: "आवागमन के लिए निश्चित भत्ता।",
    },
    {
      title: "DA on Transport Allowance",
      amount: daOnTA,
      en: "DA is also applicable on Transport Allowance.",
      hi: "परिवहन भत्ते पर भी डीए लागू होता है।",
    },
  ];

  const deductions = [
    ...(npsApplicable
      ? [
          {
            title: "NPS Contribution",
            amount: nps,
            en: "10% of (Basic Pay + DA) deducted for retirement savings.",
            hi: "सेवानिवृत्ति के लिए मूल वेतन और डीए का 10% योगदान।",
          },
        ]
      : []),
    ...(cgeisAmt > 0
      ? [
          {
            title: "CGEIS",
            amount: cgeisAmt,
            en: "Group insurance contribution for government employees.",
            hi: "सरकारी कर्मचारियों के लिए समूह बीमा योगदान।",
          },
        ]
      : []),
  ];

  const totalEarnings = earnings.reduce((a, b) => a + b.amount, 0);
  const totalDeductions = deductions.reduce((a, b) => a + b.amount, 0);
  const netSalary = totalEarnings - totalDeductions;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "auto" }}>
      <h1>Salary Slip Explainer</h1>

      <h2>Net Salary: ₹{netSalary.toFixed(2)}</h2>

      <h3>Earnings</h3>
      {earnings.map((e, i) => (
        <div key={i} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 10 }}>
          <strong>{e.title}: ₹{e.amount.toFixed(2)}</strong>
          <p>English: {e.en}</p>
          <p>हिंदी: {e.hi}</p>
        </div>
      ))}

      <h3>Deductions</h3>
      {deductions.length === 0 && <p>No deductions applicable.</p>}
      {deductions.map((d, i) => (
        <div key={i} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 10 }}>
          <strong>{d.title}: ₹{d.amount.toFixed(2)}</strong>
          <p>English: {d.en}</p>
          <p>हिंदी: {d.hi}</p>
        </div>
      ))}

      <button onClick={resetAll}>Reset</button>
    </div>
  );
}
