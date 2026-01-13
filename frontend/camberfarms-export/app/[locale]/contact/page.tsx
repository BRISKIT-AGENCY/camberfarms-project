import ContactInfo from './ContactInfo'
import Hero from './Hero'
import Map from './Map'
import MessageForm from './MessageForm'

export default function ContactPage() {
	return (
		<main className="w-full bg-light-grey text-grey relative font-inter">
			<Hero />
			<ContactInfo />
			<MessageForm />
			<Map />
		</main>
	)
}
