import Navbar from '@/components/navbar/navbar'
import EditorSection from '@/components/resume-editor/editorSection'
import FooterSection from '@/components/ui/footerSection'
import fetchAccountWithDocuments from '@/util/fetchAccountWithDocuments'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
	const account = await fetchAccountWithDocuments()
	const session = await getServerSession()
	if (account) {
		return (
			<>
				<Navbar session={session}></Navbar>
				<EditorSection documents={account.UserDocument} userId={account.id} />
				<FooterSection />
			</>
		)
	} else {
		redirect('/login')
	}
}

export default Page
