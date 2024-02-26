import FeedbackSection from '@/components/homepage/feedbackSection'
import HeroSection from '@/components/homepage/heroSection'
import InfoSection from '@/components/homepage/infoSection'
import TemplateSection from '@/components/homepage/templateSection'
import Navbar from '@/components/navbar/navbar'
import FooterSection from '@/components/ui/footerSection'

export default function Page() {
	return (
		<>
			<Navbar />
			<main>
				<HeroSection />
				<InfoSection />
				<TemplateSection />
				<FeedbackSection />
			</main>
			<FooterSection />
		</>
	)
}
