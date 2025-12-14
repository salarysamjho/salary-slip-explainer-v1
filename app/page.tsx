export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Salary Slip Explainer</h1>

      <label>Enter Monthly Salary:</label>
      <br />
      <input type="number" placeholder="e.g. 50000" />

      <p>
        English: Enter your salary to understand deductions.
      </p>
      <p>
        हिंदी: अपनी सैलरी डालें और कटौतियाँ समझें।
      </p>
    </div>
  );
}
