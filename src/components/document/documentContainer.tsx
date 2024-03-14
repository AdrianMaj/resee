'use client'
import React, { useCallback, useEffect, useState } from 'react'
import classes from './documentContainer.module.scss'
import ThemeContainer from '@/components/document/themeContainer'
import DocumentForm from '@/components/forms/document/documentForm'
import { Account, Career, UserDocument } from '@prisma/client'
import { UserDocumentWithCareer } from '@/types/documentTypes'

const DocumentContainer = ({
	documentWithAccount,
	account,
}: {
	documentWithAccount: UserDocumentWithCareer
	account: Account
}) => {
	const [newDocumentData, setNewDocumentData] = useState<UserDocumentWithCareer>()
	const handleSetDocumentData = useCallback((documentData: UserDocumentWithCareer) => {
		setNewDocumentData(documentData)
	}, [])

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
