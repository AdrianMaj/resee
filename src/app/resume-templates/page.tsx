import Navbar from '@/components/navbar/navbar'
import FooterSection from '@/components/ui/footerSection'
import { getServerSession } from 'next-auth'

const Page = async () => {
	const session = await getServerSession()
	return (
		<>
			<Navbar session={session} />
			<main>
                
            </main>
			<FooterSection />
		</>
	)
}
export default Page
