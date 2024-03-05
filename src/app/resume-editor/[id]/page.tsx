import DocumentContainer from '@/components/document/documentContainer'

import ThemeClassical from '@/components/themes/themeClassical'
import Wrapper from '@/components/ui/wrapper'
import fetchDocumentWithAccount from '@/util/fetchDocumentWithAccount'
import { notFound } from 'next/navigation'
import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'

const Page = async ({ params }: { params: { id: string } }) => {
	const documentWithAccount = await fetchDocumentWithAccount(params.id)
	if (documentWithAccount) {
		return <DocumentContainer documentWithAccount={documentWithAccount} account={documentWithAccount.account} />
	} else {
		notFound()
	}
}

export default Page
