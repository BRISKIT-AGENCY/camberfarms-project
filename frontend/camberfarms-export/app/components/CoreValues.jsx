const values = [
    {
        title: "Integrity",
        text: "We operate with honesty, transparency, and accountability."
    },
    {
        title: "Quality First",
        text: "We prioritize excellence from sourcing to delivery."
    },
    {
        title: "Sustainability",
        text: "We support environmentally responsible farming practices."
    },
    {
        title: "Community Impact",
        text: "We believe growth is strongest when shared."
    }
    ];

    export default function CoreValues() {
    return (
        <section className="core-values">
        <h2>Core Values</h2>

        <div className="values-grid">
            {values.map((value, index) => (
            <div key={index} className="value-card">
                <h4>{value.title}</h4>
                <p>{value.text}</p>
            </div>
            ))}
        </div>
        </section>
    );
}
