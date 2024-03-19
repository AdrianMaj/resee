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
	const [loadingValue, setLoadingValue] = useState(false)
	const [newDocumentData, setNewDocumentData] = useState<UserDocumentWithCareer>()
	const handleSetDocumentData = useCallback((documentData: UserDocumentWithCareer) => {
		setNewDocumentData(documentData)
	}, [])
	const setIsLoading = useCallback((value: boolean) => {
		setLoadingValue(value)
	}, [])

	return (
		<main className={`${classes.mainContainer}`}>
			<DocumentForm
				setIsLoading={setIsLoading}
				handleSetDocumentData={handleSetDocumentData}
				userDocument={documentWithAccount}
				account={account}
			/>
			<ThemeContainer loadingValue={loadingValue} documentData={newDocumentData || documentWithAccount} />
		</main>
	)
}

export default DocumentContainer
