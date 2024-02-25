import HeroSection from '@/components/homepage/heroSection'
import InfoSection from '@/components/homepage/infoSection'
import Navbar from '@/components/navbar/navbar'

export default function Page() {
	return (
		<>
			<Navbar />
			<main>
				<HeroSection />
				<InfoSection />
			</main>
		</>
	)
}
