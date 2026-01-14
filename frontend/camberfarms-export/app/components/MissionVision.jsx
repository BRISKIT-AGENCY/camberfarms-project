import "../globals.css"

export default function MissionVision() {
    return (
        <section className="mission-vision">
        {/* Mission */}
        <div className="mv-row">
            <div className="mv-title">
            <span className="mv-bar"></span>
            <h3>Mission</h3>
            </div>
            <p>
            To promote Africa&apos;s agricultural excellence by providing global access to high-quality,
            export-ready produce through reliable and ethical trade practices.
            </p>
        </div>

        {/* Vision */}
        <div className="mv-row">
            <div className="mv-title">
            <span className="mv-bar"></span>
            <h3>Vision</h3>
            </div>
            <p>
            To be Africa&apos;s most trusted name in agricultural exports, connecting local farmers
            to the world with efficiency, sustainability, and transparency.
            </p>
        </div>
        </section>
    );
}
