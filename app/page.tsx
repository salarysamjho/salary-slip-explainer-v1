"use client";

import { useState } from "react";

export default function Home() {
  const [basicPay, setBasicPay] = useState<number | "">(27100);
  const [city, setCity] = useState("X");
  const [npsApplicable, setNpsApplicable] = useState(true);
  const [cgeis, setCgeis] = useState<number | "">("");
  const [locked, setLocked] = useState(false);

  const [otherEarnings, setOtherEarnings] = useState<
    { name: string; amount: number | "" }[]
  >([]);

  const [otherDeductions, setOtherDeductions] = useState<
    { name: string; amount: number | "" }[]
  >([]);

  const DA_RATE = 0.58;
  const TA = 3600;
  const DA_ON_TA_RATE = 0.58;

  const hraRate = city === "X" ? 0.3 : city === "Y" ? 0.2 : 0.1;

  const da = typeof basicPay === "number" ? basicPay * DA_RATE : 0;
  const hra = typeof basicPay === "number" ? basicPay * hraRate : 0;
  const daOnTA = TA * DA_ON_TA_RATE;

  const nps = npsApplicable
    ? ((typeof basicPay === "number" ? basicPay : 0) + da) * 0.1
    : 0;

  const totalOtherEarnings = otherEarnings.reduce(
    (sum, e) => sum + (typeof e.amount === "number" ? e.amount : 0),
    0
  );

  const totalOtherDeductions = otherDeductions.reduce(
    (sum, d) => sum + (typeof d.amount === "number" ? d.amount : 0),
    0
  );

  const gross =
    (typeof basicPay === "number" ? basicPay : 0) +
    da +
    hra +
    TA +
    daOnTA +
    totalOtherEarnings;

  const totalDeductions =
    nps +
    (typeof cgeis === "number" ? cgeis : 0) +
    totalOtherDeductions;

  const netSalary = gross - totalDeductions;

  const explanationForCustom = (name: string) => ({
    en: `${name} is an additional component added by the employee as per salary slip.`,
    hi: `${name} कर्मचारी द्वारा वेतन पर्ची के अनुसार जोड़ा गया अतिरिक्त घटक है।`,
  });

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 900, margin: "auto" }}>
      <h1>Salary Slip Explainer</h1>

      {/* INPUT SECTION */}
      <div style={{ border: "1px solid #ddd", padding: 15, borderRadius: 8 }}>
        <label>Basic Pay (₹): </label>
        <input
          disabled={locked}
          value={basicPay}
          onChange={(e) =>
            setBasicPay(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <br /><br />

        <label>City: </label>
        <select disabled={locked} value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="X">X City</option>
          <option value="Y">Y City</option>
          <option value="Z">Z City</option>
        </select>

        <br /><br />

        <label>
          <input
            type="checkbox"
            disabled={locked}
            checked={npsApplicable}
            onChange={() => setNpsApplicable(!npsApplicable)}
          />{" "}
          NPS Applicable
        </label>

        <br /><br />

        <label>CGEIS Amount (₹): </label>
        <input
          disabled={locked}
          value={cgeis}
          onChange={(e) =>
            setCgeis(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <br /><br />

        <button onClick={() => setLocked(true)}>Calculate Salary</button>
        <button
          style={{ marginLeft: 10 }}
          onClick={() => window.location.reload()}
        >
          Reset
        </button>
      </div>

      {/* RESULT */}
      {locked && (
        <>
          <h2 style={{ marginTop: 30 }}>Net Salary: ₹{netSalary.toFixed(2)}</h2>

          {/* EARNINGS */}
          <div style={{ background: "#f9fff9", padding: 15, borderRadius: 8 }}>
            <h3>Earnings</h3>

            <p><b>Basic Pay:</b> ₹{basicPay}</p>
            <p>English: Fixed component on which allowances are calculated.</p>
            <p>हिंदी: वेतन का मुख्य भाग जिस पर भत्ते आधारित होते हैं।</p>

            <p><b>Dearness Allowance (58%):</b> ₹{da.toFixed(0)}</p>
            <p>English: Paid to offset inflation.</p>
            <p>हिंदी: महंगाई के प्रभाव को कम करने हेतु।</p>

            <p><b>HRA:</b> ₹{hra.toFixed(0)}</p>
            <p>English: Based on city category.</p>
            <p>हिंदी: शहर श्रेणी पर आधारित।</p>

            <p><b>Transport Allowance:</b> ₹{TA}</p>
            <p><b>DA on Transport Allowance:</b> ₹{daOnTA.toFixed(0)}</p>

            {otherEarnings.map((e, i) => (
              <div key={i}>
                <p><b>{e.name}:</b> ₹{e.amount}</p>
                <p>{explanationForCustom(e.name).en}</p>
                <p>{explanationForCustom(e.name).hi}</p>
              </div>
            ))}
          </div>

          {/* DEDUCTIONS */}
          <div style={{ background: "#fff6f6", padding: 15, borderRadius: 8, marginTop: 20 }}>
            <h3>Deductions</h3>

            {npsApplicable && (
              <>
                <p><b>NPS:</b> ₹{nps.toFixed(0)}</p>
                <p>English: 10% of Basic + DA.</p>
                <p>हिंदी: बेसिक व डीए का 10%।</p>
              </>
            )}

            {typeof cgeis === "number" && (
              <>
                <p><b>CGEIS:</b> ₹{cgeis}</p>
                <p>English: Group insurance contribution.</p>
                <p>हिंदी: समूह बीमा योगदान।</p>
              </>
            )}

            {otherDeductions.map((d, i) => (
              <div key={i}>
                <p><b>{d.name}:</b> ₹{d.amount}</p>
                <p>{explanationForCustom(d.name).en}</p>
                <p>{explanationForCustom(d.name).hi}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
