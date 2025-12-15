export default function Home() {
  const earnings = [
    {
      name: "Basic Pay",
      amount: 26300,
      explanationEn:
        "Basic Pay is the core salary. All increments, DA, HRA are calculated based on this.",
      explanationHi:
        "बेसिक पे वेतन का मुख्य हिस्सा होता है। सभी बढ़ोतरी, डीए और एचआरए इसी पर आधारित होते हैं।",
    },
    {
      name: "Dearness Allowance (DA)",
      amount: 13939,
      explanationEn:
        "DA is given to reduce the impact of inflation and is calculated as a percentage of Basic Pay.",
      explanationHi:
        "महंगाई भत्ता (डीए) महंगाई के असर को कम करने के लिए दिया जाता है और यह बेसिक पे पर आधारित होता है।",
    },
    {
      name: "House Rent Allowance (HRA)",
      amount: 7890,
      explanationEn:
        "HRA is given to help employees pay house rent if they are not using government accommodation.",
      explanationHi:
        "हाउस रेंट अलाउंस (एचआरए) किराए के मकान के खर्च में मदद के लिए दिया जाता है।",
    },
  ];

  const deductions = [
    {
      name: "NPS Contribution",
      amount: 4024,
      explanationEn:
        "NPS is a retirement pension contribution deducted as per government rules.",
      explanationHi:
        "एनपीएस एक पेंशन योजना है जिसमें रिटायरमेंट के लिए वेतन से कटौती की जाती है।",
    },
    {
      name: "Professional Tax",
      amount: 200,
      explanationEn:
        "Professional tax is a state tax deducted from salary as per state law.",
      explanationHi:
        "प्रोफेशनल टैक्स राज्य सरकार द्वारा वेतन से काटा जाने वाला कर है।",
    },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Salary Slip Explainer</h1>

      <h2>Earnings</h2>
      {earnings.map((item, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <strong>
            {item.name} – ₹{item.amount}
          </strong>
          <p>{item.explanationEn}</p>
          <p>{item.explanationHi}</p>
        </div>
      ))}

      <h2>Deductions</h2>
      {deductions.map((item, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <strong>
            {item.name} – ₹{item.amount}
          </strong>
          <p>{item.explanationEn}</p>
          <p>{item.explanationHi}</p>
        </div>
      ))}
    </div>
  );
}
