import Image from "next/image";
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
        src="/images/farm-produce.jpg"
        alt="Agricultural produce"
        width={1100}
        height={600}
        priority
        />
        </section>
    );
}
