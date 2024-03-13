'use client'
import React from 'react'
import classes from './editorSection.module.scss'
import { UserDocument } from '@prisma/client'
import createDocument from '@/util/createDocument'
import { redirect, useRouter } from 'next/navigation'
import { Document, Page, pdfjs } from 'react-pdf'
import Wrapper from '../ui/wrapper'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const EditorSection = ({ documents, userId }: { documents: UserDocument[]; userId: string }) => {
	const router = useRouter()
	const handleNewDocument = async () => {
		const document = await createDocument(userId, 'cltbj89ew000311ewji5b1a6e', 'New Document')
		router.push(`/resume-editor/${document.id}`)
	}
	const handleOpenDocument = (documentId: string) => {
		router.push(`/resume-editor/${documentId}`)
	}
	return (
		<main className="section">
			<Wrapper>
				<header className={classes.header}>
					<h1 className={classes.header__headingH1}>Your documents</h1>
					<p className={classes.header__paragraph}>Select your document or create new one</p>
				</header>
				<section className={classes.documentSection}>
					{documents.map(document => (
						<>
							<Document
								onClick={() => handleOpenDocument(document.id)}
								key={document.id}
								className={classes.documentContainer}
								file={document.pdfUrl}
								renderMode="canvas"
								loading={<div className={classes.documentBlank} />}
								noData={<div className={classes.documentBlank} />}>
								<Page
									key={1}
									className={classes.document}
									pageNumber={1}
									renderAnnotationLayer={false}
									renderTextLayer={false}
									loading={<div className={classes.documentBlank} />}
									noData={<div className={classes.documentBlank} />}
								/>
							</Document>
						</>
					))}
					<p onClick={handleNewDocument}>Create new document</p>
				</section>
			</Wrapper>
		</main>
	)
}

export default EditorSection
