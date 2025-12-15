export default function Home() {
  const earnings = [
    {
  title: "Basic Pay",
  amount: 26300,
  en: "Basic Pay is the core salary. All increments, DA, and HRA are calculated based on this. As per the 7th Pay Commission, annual increment is 3% of the Basic Pay.",
  hi: "बेसिक पे वेतन का मुख्य हिस्सा होता है। सभी बढ़ोतरी, डीए और एचआरए इसी पर आधारित होते हैं। 7वें वेतन आयोग के अनुसार हर साल बेसिक पे का 3% वार्षिक इंक्रीमेंट दिया जाता है।",
},
    {
      title: "Dearness Allowance (DA)",
      amount: 13939,
      en: "DA is given to reduce the impact of inflation and is calculated as a percentage of Basic Pay.",
      hi: "महंगाई भत्ता (डीए) महंगाई के असर को कम करने के लिए दिया जाता है और यह बेसिक पे पर आधारित होता है।",
    },
    {
      title: "House Rent Allowance (HRA)",
      amount: 7890,
      en: "HRA is given to help employees pay house rent if they are not using government accommodation.",
      hi: "हाउस रेंट अलाउंस (एचआरए) किराए के मकान के खर्च में मदद के लिए दिया जाता है।",
    },
    {
  title: "Transport Allowance",
  amount: 3600,
  en: "Transport allowance is given to cover daily commuting expenses.",
  hi: "ट्रांसपोर्ट अलाउंस रोज़ाना आने-जाने के खर्च के लिए दिया जाता है।"
},
  ];

  const deductions = [
    {
      title: "NPS Contribution",
      amount: 4024,
      en: "NPS is a retirement pension contribution deducted as per government rules.",
      hi: "एनपीएस एक पेंशन योजना है जिसमें रिटायरमेंट के लिए वेतन से कटौती की जाती है।",
    },
    {
      title: "Professional Tax",
      amount: 200,
      en: "Professional tax is a state tax deducted from salary as per state law.",
      hi: "प्रोफेशनल टैक्स राज्य सरकार द्वारा वेतन से काटा जाने वाला कर है।",
    },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Salary Slip Explainer</h1>

      <h2>Earnings</h2>
      {earnings.map((item, index) => (
        <div key={index}>
          <h3>
            {item.title} – ₹{item.amount}
          </h3>
          <p>{item.en}</p>
          <p>{item.hi}</p>
        </div>
      ))}

      <h2>Deductions</h2>
      {deductions.map((item, index) => (
        <div key={index}>
          <h3>
            {item.title} – ₹{item.amount}
          </h3>
          <p>{item.en}</p>
          <p>{item.hi}</p>
        </div>
      ))}
    </div>
  );
}

