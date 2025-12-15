export default function Home() {
 const earnings = [
  {
    id: "basic_pay",
    title: "Basic Pay",
    amount: 26300,
    appliesTo: "Government Employees",
    calculation: "Fixed as per Pay Level in 7th Pay Commission",
    currentRate: "Level-based (not percentage)",
    lastRevised: "7th Pay Commission – 2016",
    incrementRule: "3% annual increment on 1st July every year",
    arrearsApplicable: "Yes, if increment or pay revision is delayed",
    orderLink: "https://7thpaycommission.gov.in/",
    explanation: {
      en: "Basic Pay is the core salary. All major allowances like DA and HRA are calculated based on this.",
      hi: "बेसिक पे वेतन का मुख्य हिस्सा होता है। डीए और एचआरए जैसे भत्ते इसी पर आधारित होते हैं।",
    },
  },

  {
    id: "da",
    title: "Dearness Allowance (DA)",
    amount: 13939,
    appliesTo: "Central & State Government Employees",
    calculation: "Percentage of Basic Pay",
    currentRate: "58% of Basic Pay",
    lastRevised: "July 2025",
    incrementRule: "Revised twice a year (Jan & July)",
    arrearsApplicable: "Yes, paid from effective date",
    orderLink: "https://finmin.gov.in/",
    explanation: {
      en: "DA is given to offset inflation. It is revised based on CPI data.",
      hi: "महंगाई भत्ता महंगाई के प्रभाव को कम करने के लिए दिया जाता है।",
    },
  },

  {
    id: "hra",
    title: "House Rent Allowance (HRA)",
    amount: 7890,
    appliesTo: "Employees not using government accommodation",
    calculation: "Percentage of Basic Pay (+ DA in some cases)",
    currentRate: "8% / 16% / 24% depending on city",
    lastRevised: "7th Pay Commission",
    incrementRule: "Changes when DA crosses 25% & 50%",
    arrearsApplicable: "Sometimes",
    orderLink: "https://doe.gov.in/",
    explanation: {
      en: "HRA helps employees pay house rent.",
      hi: "एचआरए कर्मचारियों को किराया चुकाने में सहायता करता है।",
    },
  },

  {
    id: "ta",
    title: "Transport Allowance",
    amount: 3600,
    appliesTo: "Most government employees",
    calculation: "Fixed amount by pay level",
    currentRate: "₹1,800 – ₹7,200 + DA",
    lastRevised: "7th Pay Commission",
    incrementRule: "DA applicable on TA",
    arrearsApplicable: "Yes",
    orderLink: "https://doe.gov.in/",
    explanation: {
      en: "Transport Allowance covers commuting expenses.",
      hi: "ट्रांसपोर्ट अलाउंस आने-जाने के खर्च के लिए दिया जाता है।",
    },
  },
];

  const deductions = [
  {
    id: "nps",
    title: "NPS Contribution",
    amount: 4024,
    appliesTo: "Government Employees (Joined after 2004)",
    calculation: "10% of Basic + DA",
    currentRate: "10% (Employee) + 14% (Govt)",
    lastRevised: "April 2019",
    arrearsApplicable: "No",
    legalBasis: "PFRDA Act",
    orderLink: "https://pfrda.org.in/",
    explanation: {
      en: "NPS is a retirement pension scheme.",
      hi: "एनपीएस एक पेंशन योजना है जो रिटायरमेंट के लिए होती है।",
    },
  },

  {
    id: "pt",
    title: "Professional Tax",
    amount: 200,
    appliesTo: "State-specific",
    calculation: "Fixed slab by state",
    currentRate: "₹200 (example)",
    lastRevised: "State Government Notification",
    arrearsApplicable: "No",
    legalBasis: "State Professional Tax Act",
    orderLink: "https://www.incometax.gov.in/",
    explanation: {
      en: "Professional tax is deducted by state law.",
      hi: "प्रोफेशनल टैक्स राज्य सरकार द्वारा लिया जाता है।",
    },
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
         <p>{item.explanation.en}</p>
<p>{item.explanation.hi}</p>

<p><b>Calculation:</b> {item.calculation}</p>
<p><b>Current Rate:</b> {item.currentRate}</p>
        </div>
      ))}

      <h2>Deductions</h2>
      {deductions.map((item, index) => (
        <div key={index}>
          <h3>
            {item.title} – ₹{item.amount}
          </h3>
         <p>{item.explanation.en}</p>
<p>{item.explanation.hi}</p>
        </div>
      ))}
    </div>
  );
}

