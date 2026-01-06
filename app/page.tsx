"use client";

import { useState } from "react";

export default function Home() {
  const [basicPay, setBasicPay] = useState(27100);
  const [city, setCity] = useState("X");
  const [npsApplicable, setNpsApplicable] = useState(true);
  const [cgeisAmount, setCgeisAmount] = useState(0);

  const [otherEarnings, setOtherEarnings] = useState([
    { name: "", amount: 0 },
  ]);
  const [otherDeductions, setOtherDeductions] = useState([
    { name: "", amount: 0 },
  ]);

  const [result, setResult] = useState<any>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  // -------- CALCULATE SALARY ----------
  const calculateSalary = () => {
    const DA_RATE = 0.58;
    const HRA_RATE = city === "X" ? 0.3 : city === "Y" ? 0.2 : 0.1;
    const TRANSPORT = 3600;

    const basic = basicPay;
    const da = Math.round(basic * DA_RATE);
    const hra = Math.round(basic * HRA_RATE);

    const nps = npsApplicable ? Math.round((basic + da) * 0.1) : 0;

    const extraEarnings = otherEarnings.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );

    const extraDeductions = otherDeductions.reduce(
      (sum, d) => sum + Number(d.amount || 0),
      0
    );

    const gross =
      basic + da + hra + TRANSPORT + extraEarnings;

    const totalDeductions =
      nps + Number(cgeisAmount || 0) + extraDeductions;

    const netSalary = gross - totalDeductions;

    setResult({
      basic,
      da,
      hra,
      transport: TRANSPORT,
      nps,
      cgeisAmount,
      extraEarnings,
      extraDeductions,
      gross,
      totalDeductions,
      netSalary,
    });

    setIsCalculated(true);
  };

  // -------- RESET ----------
  const resetAll = () => {
    setResult(null);
    setIsCalculated(false);
    setOtherEarnings([{ name: "", amount: 0 }]);
    setOtherDeductions([{ name: "", amount: 0 }]);
    setCgeisAmount(0);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Salary Slip Explainer</h1>

      {/* INPUT SECTION */}
      <div style={{ background: "#f5f5f5", padding: "15px", borderRadius: "6px" }}>
        <label>
          Basic Pay (₹):{" "}
          <input
            type="number"
            value={basicPay}
            disabled={isCalculated}
            onChange={(e) => setBasicPay(Number(e.target.value))}
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
            onChange={(e) => setCgeisAmount(Number(e.target.value))}
          />
        </label>
      </div>

      {/* OTHER EARNINGS */}
      <h3>Other Earnings (Optional)</h3>
      {otherEarnings.map((e, i) => (
        <div key={i}>
          <input
            placeholder="Name"
            disabled={isCalculated}
            onChange={(ev) => (e.name = ev.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            disabled={isCalculated}
            onChange={(ev) => (e.amount = Number(ev.target.value))}
          />
        </div>
      ))}

      {!isCalculated && (
        <button onClick={() => setOtherEarnings([...otherEarnings, { name: "", amount: 0 }])}>
          + Add Earning
        </button>
      )}

      {/* OTHER DEDUCTIONS */}
      <h3>Other Deductions (Optional)</h3>
      {otherDeductions.map((d, i) => (
        <div key={i}>
          <input
            placeholder="Name"
            disabled={isCalculated}
            onChange={(ev) => (d.name = ev.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            disabled={isCalculated}
            onChange={(ev) => (d.amount = Number(ev.target.value))}
          />
        </div>
      ))}

      {!isCalculated && (
        <button onClick={() => setOtherDeductions([...otherDeductions, { name: "", amount: 0 }])}>
          + Add Deduction
        </button>
      )}

      <br /><br />

      {/* ACTION BUTTONS */}
      {!isCalculated ? (
        <button onClick={calculateSalary}>Calculate Salary</button>
      ) : (
        <button onClick={resetAll}>Reset</button>
      )}

      {/* RESULT */}
      {result && (
        <>
          <h2>Net Salary: ₹{result.netSalary.toLocaleString()}</h2>

          <h3>Detailed Breakdown</h3>
          <ul>
            <li>Basic Pay: ₹{result.basic}</li>
            <li>Dearness Allowance (58%): ₹{result.da}</li>
            <li>HRA: ₹{result.hra}</li>
            <li>Transport Allowance: ₹{result.transport}</li>
            <li>Other Earnings: ₹{result.extraEarnings}</li>
            <li>NPS Deduction: ₹{result.nps}</li>
            <li>CGEIS: ₹{result.cgeisAmount}</li>
            <li>Other Deductions: ₹{result.extraDeductions}</li>
          </ul>
        </>
      )}
    </div>
  );
}
