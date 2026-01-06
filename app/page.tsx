"use client";

import { useState } from "react";

/* ===============================
   SMART EXPLANATION ENGINE
=============================== */
function explainCustomItem(name: string, type: "earning" | "deduction") {
  const key = name.toLowerCase();

  if (key.includes("professional")) {
    return {
      en: "Professional Tax is a state-level tax deducted from salary as per state laws.",
      hi: "प्रोफेशनल टैक्स राज्य सरकार द्वारा लगाया जाने वाला कर है जो वेतन से काटा जाता है।",
    };
  }

  if (key.includes("special")) {
    return {
      en: "Special Allowance is an employer-specific allowance and is generally fully taxable.",
      hi: "स्पेशल अलाउंस नियोक्ता द्वारा दिया जाने वाला भत्ता है और सामान्यतः पूरी तरह टैक्सेबल होता है।",
    };
  }

  if (key.includes("overtime")) {
    return {
      en: "Overtime allowance is paid for work done beyond normal working hours.",
      hi: "ओवरटाइम भत्ता सामान्य कार्य समय से अधिक काम करने पर दिया जाता है।",
    };
  }

  if (key.includes("lic")) {
    return {
      en: "This deduction is usually an insurance premium paid towards LIC or similar policies.",
      hi: "यह कटौती सामान्यतः एलआईसी या अन्य बीमा पॉलिसी के प्रीमियम के लिए होती है।",
    };
  }

  if (key.includes("loan")) {
    return {
      en: "This deduction is towards repayment of a loan or salary advance taken by the employee.",
      hi: "यह कटौती कर्मचारी द्वारा लिए गए ऋण या वेतन अग्रिम की वापसी के लिए होती है।",
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

export default function Home() {
  /* ===============================
     INPUT STATES (DRAFT)
  =============================== */
  const [basicPay, setBasicPay] = useState<number | "">("");
  const [city, setCity] = useState("X");
  const [npsApplicable, setNpsApplicable] = useState(true);
  const [cgeisAmount, setCgeisAmount] = useState<number | "">("");

  const [otherEarnings, setOtherEarnings] = useState([{ name: "", amount: "" }]);
  const [otherDeductions, setOtherDeductions] = useState([{ name: "", amount: "" }]);

  const [result, setResult] = useState<any>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  /* ===============================
     CALCULATE (FINAL SNAPSHOT)
  =============================== */
  const calculateSalary = () => {
    if (!basicPay) {
      alert("Please enter Basic Pay");
      return;
    }

    const DA_RATE = 0.58;
    const TRANSPORT = 3600;
    const HRA_RATE = city === "X" ? 0.3 : city === "Y" ? 0.2 : 0.1;

    const basic = Number(basicPay);
    const da = Math.round(basic * DA_RATE);
    const hra = Math.round(basic * HRA_RATE);
    const daOnTA = Math.round(TRANSPORT * DA_RATE);

    const nps = npsApplicable ? Math.round((basic + da) * 0.1) : 0;

    const extraEarnings = otherEarnings.reduce(
      (s, e) => s + Number(e.amount || 0),
      0
    );

    const extraDeductions = otherDeductions.reduce(
      (s, d) => s + Number(d.amount || 0),
      0
    );

    const gross =
      basic + da + hra + TRANSPORT + daOnTA + extraEarnings;

    const totalDeductions =
      nps + Number(cgeisAmount || 0) + extraDeductions;

    setResult({
      basic,
      da,
      hra,
      transport: TRANSPORT,
      daOnTA,
      nps,
      cgeisAmount,
      otherEarnings,
      otherDeductions,
      gross,
      totalDeductions,
      net: gross - totalDeductions,
    });

    setIsCalculated(true);
  };

  const resetAll = () => {
    setBasicPay("");
    setCgeisAmount("");
    setOtherEarnings([{ name: "", amount: "" }]);
    setOtherDeductions([{ name: "", amount: "" }]);
    setResult(null);
    setIsCalculated(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", background: "#f4f6f8" }}>
      <h1>Salary Slip Explainer</h1>

      {/* INPUTS */}
      <div style={{ background: "#fff", padding: 15, borderRadius: 6 }}>
        <label>
          Basic Pay (₹):
          <input
            type="number"
            value={basicPay}
            disabled={isCalculated}
            onChange={(e) =>
              setBasicPay(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </label>

        <br /><br />

        <label>
          City:
          <select
            value={city}
            disabled={isCalculated}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="X">X City</option>
            <option value="Y">Y City</option>
            <option value="Z">Z City</option>
          </select>
        </label>

        <br /><br />

        <label>
          <input
            type="checkbox"
            checked={npsApplicable}
            disabled={isCalculated}
            onChange={() => setNpsApplicable(!npsApplicable)}
          />{" "}
          NPS Applicable
        </label>

        <br /><br />

        <label>
          CGEIS Amount (₹):
          <input
            type="number"
            value={cgeisAmount}
            disabled={isCalculated}
            onChange={(e) =>
              setCgeisAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </label>
      </div>

      <br />

      {!isCalculated ? (
        <button onClick={calculateSalary}>Calculate Salary</button>
      ) : (
        <button onClick={resetAll}>Reset</button>
      )}

      {/* ===============================
         RESULT + EXPLANATION UI
      =============================== */}
      {result && (
        <div style={{ marginTop: 20, background: "#fff", padding: 20, borderRadius: 6 }}>
          <h2>Net Salary: ₹{result.net.toLocaleString()}</h2>

          <h3>Earnings</h3>

          <p><b>Basic Pay:</b> ₹{result.basic}</p>
          <p>English: Fixed component of salary on which allowances are calculated.</p>
          <p>हिंदी: वेतन का मूल हिस्सा जिस पर भत्ते आधारित होते हैं।</p>

          <p><b>Dearness Allowance (58%):</b> ₹{result.da}</p>
          <p>English: Paid to offset inflation, revised periodically by government.</p>
          <p>हिंदी: महंगाई के प्रभाव को कम करने के लिए दिया जाता है।</p>

          <p><b>HRA:</b> ₹{result.hra}</p>
          <p>English: Helps meet house rent expenses based on city category.</p>
          <p>हिंदी: मकान किराए के खर्च में सहायता के लिए।</p>

          <p><b>Transport Allowance:</b> ₹{result.transport}</p>
          <p>English: Fixed allowance for commuting.</p>
          <p>हिंदी: दैनिक आवागमन के लिए निश्चित भत्ता।</p>

          <p><b>DA on Transport Allowance:</b> ₹{result.daOnTA}</p>
          <p>English: DA is also payable on transport allowance.</p>
          <p>हिंदी: ट्रांसपोर्ट भत्ते पर भी डीए लागू होता है।</p>

          {result.otherEarnings.map((e: any, i: number) =>
            e.amount ? (
              <div key={i}>
                <p><b>{e.name}:</b> ₹{e.amount}</p>
                <p>English: {explainCustomItem(e.name, "earning").en}</p>
                <p>हिंदी: {explainCustomItem(e.name, "earning").hi}</p>
              </div>
            ) : null
          )}

          <h3>Deductions</h3>

          <p><b>NPS:</b> ₹{result.nps}</p>
          <p>English: 10% of Basic Pay + DA deducted for retirement.</p>
          <p>हिंदी: सेवानिवृत्ति के लिए बेसिक और डीए का 10%।</p>

          {result.cgeisAmount ? (
            <>
              <p><b>CGEIS:</b> ₹{result.cgeisAmount}</p>
              <p>English: Group insurance contribution for government employees.</p>
              <p>हिंदी: सरकारी कर्मचारियों के लिए समूह बीमा योगदान।</p>
            </>
          ) : null}

          {result.otherDeductions.map((d: any, i: number) =>
            d.amount ? (
              <div key={i}>
                <p><b>{d.name}:</b> ₹{d.amount}</p>
                <p>English: {explainCustomItem(d.name, "deduction").en}</p>
                <p>हिंदी: {explainCustomItem(d.name, "deduction").hi}</p>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
