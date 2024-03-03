import DocumentContainer from '@/components/document/documentContainer'
import DocumentForm from '@/components/forms/document/documentForm'
import Wrapper from '@/components/ui/wrapper'
import fetchAccountByDocument from '@/util/fetchAccountByDocument'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
	const accountWithDocument = await fetchAccountByDocument(params.id)
	if (accountWithDocument) {
		return (
			<DocumentContainer>
				<DocumentForm userDocument={accountWithDocument.UserDocument} account={accountWithDocument} />
			</DocumentContainer>
		)
	} else {
		notFound()
	}
}

export default Page
