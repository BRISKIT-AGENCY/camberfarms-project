import Image from "next/image"
import "../globals.css"

export default function Certifications() {
    return (
        <section className="certifications">
            <h2>Our Certifications & Partnerships</h2>
            <p>CamberFarm Export is fully registered and certified by recognized agrictural and trade authorities.
                Our operations meet both local and international quality control standards,
                ensuring seamless trade compliance for every shipment</p>
            <div className="cert-grid">
                <Image src="/images/cert.png" alt="Certification 1" width={800} height={800} sizes="340px"/>
                <Image src="/images/cert.png" alt="Certification 2" width={800} height={800} sizes="340px"/>
                <Image src="/images/cert.png" alt="Certification 3" width={800} height={800} sizes="340px"/>
                <Image src="/images/cert.png" alt="Certification 4" width={800} height={800} sizes="340px"/>
                <Image src="/images/cert.png" alt="Certification 3" width={800} height={800} sizes="340px"/>
                <Image src="/images/cert.png" alt="Certification 4" width={800} height={800} sizes="340px"/>
            </div>
        </section>
    );
}
