import "../globals.css";
import AboutHero from "../components/AboutHero";
import MissionVision from "../components/MissionVision";
import CoreValues from "../components/CoreValues";
import GlobalReach from "../components/GlobalReach";
import Certifications from "../components/Certifications";

export default function AboutPage() {
    return (
        <main>
        <AboutHero />
        <MissionVision />
        <CoreValues />
        <GlobalReach />
        <Certifications />
        </main>
    );
}
