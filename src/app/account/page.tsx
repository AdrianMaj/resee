import AccountForm from '@/components/account/accountFormSection'
import Navbar from '@/components/navbar/navbar'
import FooterSection from '@/components/ui/footerSection'
import { getServerSession } from 'next-auth'

const Page = async () => {
	const session = await getServerSession()
	return (
		<>
			<Navbar session={session} />
			<main>
				<AccountForm />
			</main>
			{/* <FooterSection /> */}
		</>
	)
}
export default Page
