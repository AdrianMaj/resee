import DocumentForm from '@/components/forms/document/documentForm'
import fetchAccountByDocument from '@/util/fetchAccountByDocument'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
	const accountWithDocument = await fetchAccountByDocument(params.id)
	return (
		<>
			<DocumentForm />
		</>
	)
}

export default Page
