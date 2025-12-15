export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Salary Slip Explainer</h1>

      <label>Enter Monthly Salary:</label>
      <br />
      <input type="number" placeholder="e.g. 50000" />
      
      <hr />

      <h2>Earnings (कमाई)</h2>

      <ul>
        <li>
          <strong>Basic Pay</strong><br />
          English: Fixed base salary decided by pay level.<br />
          हिंदी: मूल वेतन जो पे लेवल के अनुसार तय होता है।
        </li>

        <li>
          <strong>Dearness Allowance (DA)</strong><br />
          English: Compensation for inflation, revised periodically.<br />
          हिंदी: महंगाई से निपटने के लिए दिया जाने वाला भत्ता।
        </li>

        <li>
          <strong>House Rent Allowance (HRA)</strong><br />
          English: Given if employee lives in rented house.<br />
          हिंदी: किराए के घर में रहने पर मिलने वाला भत्ता।
        </li>

        <li>
          <strong>Transport Allowance</strong><br />
          English: Helps cover daily travel expenses.<br />
          हिंदी: रोज़ाना यात्रा खर्च के लिए दिया जाता है।
        </li>
      </ul>

      <hr />

      <h2>Deductions (कटौती)</h2>

      <ul>
        <li>
          <strong>NPS Contribution</strong><br />
          English: Pension contribution deducted monthly.<br />
          हिंदी: पेंशन के लिए हर महीने की जाने वाली कटौती।
        </li>

        <li>
          <strong>CGEGIS</strong><br />
          English: Government insurance and savings scheme.<br />
          हिंदी: सरकारी बीमा और बचत योजना।
        </li>

        <li>
          <strong>Professional Tax</strong><br />
          English: State tax on profession or employment.<br />
          हिंदी: राज्य सरकार द्वारा लगाया गया कर।
        </li>
      </ul>
    </div>
  );
}
