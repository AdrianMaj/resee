'use client'
import React, { useState } from 'react'
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
	const handleSetDocumentData = (documentData: UserDocumentWithCareer) => {
		setNewDocumentData(documentData)
	}
	const handleUpdateCareers = (career: Career[]) => {
		setNewDocumentData(prevData => {
			if (!prevData) {
				return prevData
			}
			prevData.career = career
			return prevData
		})
	}
	return (
		<main className={`${classes.mainContainer}`}>
			<DocumentForm
				handleUpdateCareers={handleUpdateCareers}
				handleSetDocumentData={handleSetDocumentData}
				userDocument={documentWithAccount}
				account={account}
			/>
			<ThemeContainer documentData={newDocumentData || documentWithAccount} />
		</main>
	)
}

export default DocumentContainer
