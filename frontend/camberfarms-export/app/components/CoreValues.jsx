import "../globals.css";

const values = [
    {
        title: "Integrity",
        text: "We operate with honesty and accountability."
    },
    {
        title: "Quality",
        text: "Only the finest, certified products leave our hands."
    },
    {
        title: "Sustainability",
        text: "We empower local farmers while preserving our environment."
    },
    {
        title: "Partnership",
        text: "We build long-term, mutually beneficial relationships globally."
    }
];

export default function CoreValues() {
    return (
        <section className="core-values">
        <div className="cv-row">
            <div className="cv-title">
            <span className="mv-bar"></span>
            <h3>Core Values</h3>
            </div>

            <ul className="cv-list">
            {values.map((value, index) => (
                <li key={index}>
                <strong>{value.title}:</strong> {value.text}
                </li>
            ))}
            </ul>
        </div>
        </section>
    );
}
