import Image from "next/image";
import "../globals.css"
export default function AboutHero() {
    return (
        <section className="about-hero">
        <div className="about-hero-content">
            <h1>About Us</h1>

            <p>
            Connecting Africa’s finest agricultural produce to global markets
            through quality, integrity, and sustainable partnerships.
            </p>

            <button className="contact-btn">Contact Us</button>
        </div>

        <Image
        className="about-hero-image"
        src="/images/farm-produce.png"
        alt="Agricultural produce"
        width={3000}
        height={1500}
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
        />
        </section>
    );
}
