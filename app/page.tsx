export default function HomePage() {
  const isPremiumUser = false; // change to true later

  const salaryBasics = [
    {
      title: "Basic Pay",
      amount: "₹35,400",
      explanationEn:
        "Basic Pay is the core component of salary and forms the basis for most allowances and deductions.",
      explanationHi:
        "बेसिक पे वेतन का मुख्य हिस्सा होता है और इसी के आधार पर अधिकतर भत्ते और कटौतियाँ तय होती हैं।",
      appliesTo: "All Government Employees",
      calculation: "As per Pay Level under 7th Pay Commission",
      lastRevised: "7th Pay Commission",
    },
    {
      title: "Dearness Allowance (DA)",
      amount: "₹17,346",
      explanationEn:
        "Dearness Allowance is paid to offset the impact of inflation on employees.",
      explanationHi:
        "महंगाई भत्ता कर्मचारियों को महंगाई के प्रभाव से राहत देने के लिए दिया जाता है।",
      appliesTo: "All Government Employees",
      calculation: "Percentage of Basic Pay",
      currentRate: "49% of Basic Pay (as applicable)",
      lastRevised: "Revised periodically by Government",
      arrears: "Yes (whenever revised)",
    },
  ];

  const earnings = [
    {
      title: "House Rent Allowance (HRA)",
      amount: "₹7,890",
      explanationEn: "HRA helps employees pay house rent.",
      explanationHi: "एचआरए कर्मचारियों को किराया चुकाने में सहायता करता है।",
      appliesTo: "Employees not using government accommodation",
      calculation: "Percentage of Basic Pay (+ DA in some cases)",
      currentRate: "8% / 16% / 24% depending on city",
      lastRevised: "7th Pay Commission",
      arrears: "Sometimes",
      orderLink: "#",
    },
    {
      title: "Transport Allowance",
      amount: "₹3,600",
      explanationEn: "Transport Allowance covers commuting expenses.",
      explanationHi: "ट्रांसपोर्ट अलाउंस आने-जाने के खर्चों के लिए दिया जाता है।",
      appliesTo: "Most government employees",
      calculation: "Fixed amount by pay level",
      currentRate: "₹1,800 – ₹7,200 + DA",
      lastRevised: "7th Pay Commission",
      arrears: "Yes",
      orderLink: "#",
    },
  ];

  const deductions = [
    {
      title: "NPS Contribution",
      amount: "₹4,024",
      explanationEn:
        "The National Pension System (NPS) is a mandatory retirement savings scheme for Central Government employees joining service on or after 1 January 2004.",
      explanationHi:
        "नेशनल पेंशन सिस्टम (NPS) एक अनिवार्य रिटायरमेंट पेंशन योजना है जो 1 जनवरी 2004 के बाद नियुक्त कर्मचारियों पर लागू होती है।",
      appliesTo: "Central Government Employees (Joined on or after 01-01-2004)",
      calculation:
        "Employee contributes 10% of (Basic Pay + DA). Government contributes 14% of (Basic Pay + DA).",
      lastRevised:
        "Government contribution increased from 10% to 14% w.e.f. 01 April 2019",
      arrears: "No (prospective)",
      orderLink: "#",
    },
    {
      title: "Professional Tax",
      amount: "₹200",
      explanationEn: "Professional tax is deducted by state law.",
      explanationHi: "प्रोफेशनल टैक्स राज्य सरकार द्वारा लिया जाता है।",
      appliesTo: "State-specific",
      calculation: "Fixed slab by state",
      lastRevised: "State Government Notification",
      arrears: "No",
      orderLink: null,
    },
  ];

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Salary Slip Explainer</h1>

      {/* BASIC PAY & DA */}
      <h2>Basic Salary Components</h2>
      {salaryBasics.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "6px",
          }}
        >
          <h3>
            {item.title} – {item.amount}
          </h3>

          <p>{item.explanationEn}</p>
          <p>{item.explanationHi}</p>

          <p>
            <b>Applies To:</b> {item.appliesTo}
          </p>
          <p>
            <b>Calculation:</b> {item.calculation}
          </p>

          {item.currentRate && (
            <p>
              <b>Current Rate:</b> {item.currentRate}
            </p>
          )}

          <p>
            <b>Last Revised:</b> {item.lastRevised}
          </p>

          {item.arrears && (
            <p>
              <b>Arrears Applicable:</b> {item.arrears}
            </p>
          )}
        </div>
      ))}

      {/* EARNINGS */}
      <h2>Earnings</h2>
      {earnings.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "6px",
          }}
        >
          <h3>
            {item.title} – {item.amount}
          </h3>

          <p>{item.explanationEn}</p>
          <p>{item.explanationHi}</p>

          <p>
            <b>Applies To:</b> {item.appliesTo}
          </p>
          <p>
            <b>Calculation:</b> {item.calculation}
          </p>
          <p>
            <b>Current Rate:</b> {item.currentRate}
          </p>
          <p>
            <b>Last Revised:</b> {item.lastRevised}
          </p>
          <p>
            <b>Arrears Applicable:</b> {item.arrears}
          </p>

          {isPremiumUser ? (
            <a href={item.orderLink} target="_blank">
              View Government Order
            </a>
          ) : (
            <span style={{ color: "gray" }}>🔒 Premium Only</span>
          )}
        </div>
      ))}

      {/* DEDUCTIONS */}
      <h2>Deductions</h2>
      {deductions.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "6px",
          }}
        >
          <h3>
            {item.title} – {item.amount}
          </h3>

          <p>{item.explanationEn}</p>
          <p>{item.explanationHi}</p>

          <p>
            <b>Applies To:</b> {item.appliesTo}
          </p>
          <p>
            <b>Calculation:</b> {item.calculation}
          </p>
          <p>
            <b>Last Revised:</b> {item.lastRevised}
          </p>
          <p>
            <b>Arrears:</b> {item.arrears}
          </p>

          {item.orderLink ? (
            isPremiumUser ? (
              <a href={item.orderLink} target="_blank">
                View Government Order
              </a>
            ) : (
              <span style={{ color: "gray" }}>🔒 Premium Only</span>
            )
          ) : null}
        </div>
      ))}
    </main>
  );
}
