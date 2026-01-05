export default function HomePage() {
  const isPremiumUser = false; // keep false for now

  const earnings = [
    {
      title: "Basic Pay",
      amount: "₹35,400",
      explanationEn:
        "Basic Pay is the core component of salary. All allowances and most deductions are calculated based on it.",
      explanationHi:
        "बेसिक पे वेतन का मुख्य हिस्सा होता है, जिसके आधार पर सभी भत्ते और अधिकतर कटौतियाँ तय होती हैं।",
      appliesTo: "All Government Employees",
      calculation: "Fixed as per Pay Level under 7th Pay Commission",
      currentRate: "Pay Level based (7th CPC Pay Matrix)",
      lastRevised: "7th Pay Commission (2016)",
      arrears: "Yes, if revision is delayed",
      orderLink: null,
    },
    {
      title: "Dearness Allowance (DA)",
      amount: "₹17,346",
      explanationEn:
        "Dearness Allowance is paid to offset the impact of inflation and is revised twice every year.",
      explanationHi:
        "महंगाई भत्ता महंगाई के प्रभाव को कम करने के लिए दिया जाता है और साल में दो बार संशोधित किया जाता है।",
      appliesTo: "All Government Employees",
      calculation: "Percentage of Basic Pay",
      currentRate: "49% of Basic Pay",
      lastRevised: "Revised by Government (Jan / July)",
      arrears: "Yes, paid from effective date",
      orderLink: "https://egazette.nic.in/",
    },
    {
      title: "House Rent Allowance (HRA)",
      amount: "₹7,890",
      explanationEn:
        "HRA helps employees meet house rent expenses.",
      explanationHi:
        "एचआरए कर्मचारियों को घर का किराया चुकाने में मदद करता है।",
      appliesTo: "Employees not using government accommodation",
      calculation: "Percentage of Basic Pay (+ DA in some cases)",
      currentRate: "8% / 16% / 24% depending on city category",
      lastRevised: "7th Pay Commission",
      arrears: "Sometimes",
      orderLink: "https://egazette.nic.in/",
    },
    {
      title: "Transport Allowance",
      amount: "₹3,600",
      explanationEn:
        "Transport Allowance covers daily commuting expenses.",
      explanationHi:
        "ट्रांसपोर्ट अलाउंस रोज़ाना आने-जाने के खर्च के लिए दिया जाता है।",
      appliesTo: "Most Government Employees",
      calculation: "Fixed amount based on Pay Level",
      currentRate: "₹1,800 – ₹7,200 + DA",
      lastRevised: "7th Pay Commission",
      arrears: "Yes",
      orderLink: "https://egazette.nic.in/",
    },
  ];

  const deductions = [
    {
      title: "NPS Contribution",
      amount: "₹4,024",
      explanationEn:
        "National Pension System (NPS) is a mandatory retirement savings scheme for government employees appointed on or after 1 January 2004.",
      explanationHi:
        "नेशनल पेंशन सिस्टम (NPS) 1 जनवरी 2004 के बाद नियुक्त सरकारी कर्मचारियों के लिए अनिवार्य पेंशन योजना है।",
      appliesTo: "Central Government Employees (joined on or after 01-01-2004)",
      calculation:
        "Employee contributes 10% of (Basic Pay + DA). Government contributes 14% of (Basic Pay + DA).",
      lastRevised:
        "Government contribution increased to 14% w.e.f. 01 April 2019",
      arrears: "No (prospective)",
      orderLink: "https://egazette.nic.in/",
    },
    {
      title: "Professional Tax",
      amount: "₹200",
      explanationEn:
        "Professional tax is levied by state governments.",
      explanationHi:
        "प्रोफेशनल टैक्स राज्य सरकार द्वारा लगाया जाता है।",
      appliesTo: "State-specific",
      calculation: "Fixed slab as per state law",
      lastRevised: "State Government Notification",
      arrears: "No",
      orderLink: null,
    },
  ];

  // --- Step 11: Salary Calculations ---
  const parseAmount = (value: string) =>
    Number(value.replace(/[₹,]/g, ""));

  const grossSalary = earnings.reduce(
    (sum, item) => sum + parseAmount(item.amount),
    0
  );

  const totalDeductions = deductions.reduce(
    (sum, item) => sum + parseAmount(item.amount),
    0
  );

  const netSalary = grossSalary - totalDeductions;

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Salary Slip Explainer</h1>

      {/* SALARY SUMMARY */}
      <div
        style={{
          border: "2px solid #000",
          padding: "15px",
          marginBottom: "25px",
          borderRadius: "6px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Salary Summary</h2>

        <p><b>Gross Salary:</b> ₹{grossSalary.toLocaleString()}</p>
        <p><b>Total Deductions:</b> ₹{totalDeductions.toLocaleString()}</p>
        <p style={{ fontSize: "18px" }}>
          <b>Net (Take-Home) Salary:</b> ₹{netSalary.toLocaleString()}
        </p>

        <p>
          <b>English:</b> Net salary is the amount you actually receive after
          all deductions are subtracted from your gross salary.
        </p>
        <p>
          <b>हिंदी:</b> नेट सैलरी वह राशि होती है जो सभी कटौतियाँ हटाने के बाद
          आपको वास्तव में मिलती है।
        </p>
      </div>

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
          <h3>{item.title} – {item.amount}</h3>

          <p>{item.explanationEn}</p>
          <p>{item.explanationHi}</p>

          <p><b>Applies To:</b> {item.appliesTo}</p>
          <p><b>Calculation:</b> {item.calculation}</p>

          {item.currentRate && (
            <p><b>Current Rate:</b> {item.currentRate}</p>
          )}

          <p><b>Last Revised:</b> {item.lastRevised}</p>
          <p><b>Arrears Applicable:</b> {item.arrears}</p>

          {item.orderLink &&
            (isPremiumUser ? (
              <a href={item.orderLink} target="_blank">
                View Government Order
              </a>
            ) : (
              <span style={{ color: "gray" }}>🔒 Premium Only</span>
            ))}
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
          <h3>{item.title} – {item.amount}</h3>

          <p>{item.explanationEn}</p>
          <p>{item.explanationHi}</p>

          <p><b>Applies To:</b> {item.appliesTo}</p>
          <p><b>Calculation:</b> {item.calculation}</p>
          <p><b>Last Revised:</b> {item.lastRevised}</p>
          <p><b>Arrears:</b> {item.arrears}</p>

          {item.orderLink &&
            (isPremiumUser ? (
              <a href={item.orderLink} target="_blank">
                View Government Order
              </a>
            ) : (
              <span style={{ color: "gray" }}>🔒 Premium Only</span>
            ))}
        </div>
      ))}
    </main>
  );
}
