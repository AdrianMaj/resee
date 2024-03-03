'use client'
import React from 'react'
import classes from './editorSection.module.scss'
import { UserDocument } from '@prisma/client'
import createDocument from '@/util/createDocument'
import { redirect, useRouter } from 'next/navigation'

const EditorSection = ({ documents, userId }: { documents: UserDocument[]; userId: string }) => {
	const router = useRouter()
	const handleNewDocument = async () => {
		const document = await createDocument(userId, 'cltbj89ew000311ewji5b1a6e', 'New Document')
		router.push(`/resume-editor/${document.id}`)
	}
	return (
		<main className="section">
			<header className={classes.header}>
				<h1 className={classes.headingH1}>Your documents</h1>
				<p className={classes.paragraph}>Select your document or create new one</p>
			</header>
			<section className={classes.documentSection}>
				{documents.map(document => (
					<p key={document.id}>{document.name}</p>
				))}
				<p onClick={handleNewDocument}>Create new document</p>
			</section>
		</main>
	)
}

export default EditorSection
