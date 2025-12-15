export default function Home() {
  const salaryData = {
    earnings: {
      basicPay: 26300,
      da: 13939,
      hra: 7890,
    },
    deductions: {
      nps: 4024,
      professionalTax: 200,
    },
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Salary Slip Explainer</h1>

      <h2>Earnings</h2>

      <h3>Basic Pay – ₹{salaryData.earnings.basicPay}</h3>
      <p>
        Basic Pay is the core salary. All increments, DA, HRA are calculated based on this.
      </p>
      <p>
        बेसिक पे वेतन का मुख्य हिस्सा होता है। सभी बढ़ोतरी, डीए और एचआरए इसी पर आधारित होते हैं।
      </p>

      <h3>Dearness Allowance (DA) – ₹{salaryData.earnings.da}</h3>
      <p>
        DA is given to reduce the impact of inflation and is calculated as a percentage of Basic Pay.
      </p>
      <p>
        महंगाई भत्ता (डीए) महंगाई के असर को कम करने के लिए दिया जाता है और यह बेसिक पे पर आधारित होता है।
      </p>

      <h3>House Rent Allowance (HRA) – ₹{salaryData.earnings.hra}</h3>
      <p>
        HRA is given to help employees pay house rent if they are not using government accommodation.
      </p>
      <p>
        हाउस रेंट अलाउंस (एचआरए) किराए के मकान के खर्च में मदद के लिए दिया जाता है।
      </p>

      <h2>Deductions</h2>

      <h3>NPS Contribution – ₹{salaryData.deductions.nps}</h3>
      <p>
        NPS is a retirement pension contribution deducted as per government rules.
      </p>
      <p>
        एनपीएस एक पेंशन योजना है जिसमें रिटायरमेंट के लिए वेतन से कटौती की जाती है।
      </p>

      <h3>Professional Tax – ₹{salaryData.deductions.professionalTax}</h3>
      <p>
        Professional tax is a state tax deducted from salary as per state law.
      </p>
      <p>
        प्रोफेशनल टैक्स राज्य सरकार द्वारा वेतन से काटा जाने वाला कर है।
      </p>
    </div>
  );
}
