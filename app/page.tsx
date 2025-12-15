// ===== Salary Slip Sample Data (MVP v1) =====

const earnings = [
  {
    key: "basic_pay",
    name: "Basic Pay",
    amount: 26300,
    explanation_en: "Basic Pay is the main fixed part of your salary. Increments are usually added here.",
    explanation_hi: "बेसिक पे आपकी सैलरी का मुख्य हिस्सा होता है। इंक्रीमेंट आमतौर पर यहीं जुड़ता है।"
  },
  {
    key: "da",
    name: "Dearness Allowance (DA)",
    amount: 13939,
    explanation_en: "DA is given to reduce the impact of inflation. It is calculated as a percentage of Basic Pay.",
    explanation_hi: "महंगाई भत्ता (DA) महंगाई के प्रभाव को कम करने के लिए दिया जाता है।"
  },
  {
    key: "hra",
    name: "House Rent Allowance (HRA)",
    amount: 7890,
    explanation_en: "HRA is provided to help cover house rent expenses.",
    explanation_hi: "HRA घर के किराये के खर्च को पूरा करने के लिए दिया जाता है।"
  },
  {
    key: "ta",
    name: "Transport Allowance",
    amount: 3600,
    explanation_en: "Transport Allowance is given for daily travel expenses.",
    explanation_hi: "ट्रांसपोर्ट अलाउंस रोज़ाना आने-जाने के खर्च के लिए दिया जाता है।"
  }
];

const deductions = [
  {
    key: "nps",
    name: "NPS Contribution",
    amount: 4024,
    explanation_en: "NPS is a retirement pension scheme. This amount is deducted and invested for your future.",
    explanation_hi: "NPS एक पेंशन योजना है। यह राशि भविष्य के लिए निवेश की जाती है।"
  },
  {
    key: "pt",
    name: "Professional Tax",
    amount: 200,
    explanation_en: "Professional Tax is a state-level tax on salaried employees.",
    explanation_hi: "प्रोफेशनल टैक्स राज्य सरकार द्वारा लिया जाने वाला कर है।"
  }
];

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
