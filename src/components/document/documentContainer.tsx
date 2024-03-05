'use client'
import React, { useState } from 'react'
import classes from './documentContainer.module.scss'
import ThemeContainer from '@/components/document/themeContainer'
import DocumentForm from '@/components/forms/document/documentForm'
import { Account, UserDocument } from '@prisma/client'

const DocumentContainer = ({
	documentWithAccount,
	account,
}: {
	documentWithAccount: UserDocument
	account: Account
}) => {
	const [newDocumentData, setNewDocumentData] = useState<UserDocument>()
	const handleSetDocumentData = (documentData: UserDocument) => {
		setNewDocumentData(documentData)
	}
	return (
		<main className={`${classes.mainContainer}`}>
			<DocumentForm
				handleSetDocumentData={handleSetDocumentData}
				userDocument={documentWithAccount}
				account={account}
			/>
			<ThemeContainer documentData={newDocumentData || documentWithAccount} />
		</main>
	)
}

export default DocumentContainer
