import Image from "next/image"
import "../globals.css"

export default function GlobalReach() {
    return (
        <section className="global-reach">
        <h2>Our Global Reach</h2>

        <p>
            With a growing network of logistics partners and export hubs,
            Camberfarm delivers agrictural products to clients across Asia, Europe, and the Americas.
            Our team manages every stage from sourcing to shipment, ensuring quality and compaliance at each step.
        </p>

        <Image
            src="/images/map.png"
            alt="Global reach map"
            width={3000}
            height={1500}
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
        />
        </section>
    );
}
