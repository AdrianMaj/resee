import DocumentForm from '@/components/forms/document/documentForm'
import fetchAccountByDocument from '@/util/fetchAccountByDocument'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
	const accountWithDocument = await fetchAccountByDocument(params.id)
	if (accountWithDocument) {
		return (
			<>
				<DocumentForm document={accountWithDocument.UserDocument} account={accountWithDocument} />
			</>
		)
	} else {
		notFound()
	}
}

export default Page
