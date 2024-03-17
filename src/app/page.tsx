import FeedbackSection from '@/components/homepage/feedbackSection'
import HeroSection from '@/components/homepage/heroSection'
import InfoSection from '@/components/homepage/infoSection'
import TemplateSection from '@/components/homepage/templateSection'
import Navbar from '@/components/navbar/navbar'
import FooterSection from '@/components/ui/footerSection'
import fetchAccount from '@/util/fetchAccount'

export default async function Page() {
	const account = await fetchAccount()
	return (
		<>
			<Navbar userAccount={account} />
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
