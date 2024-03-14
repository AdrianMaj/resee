'use client'
import React from 'react'
import classes from './editorSection.module.scss'
import { UserDocument } from '@prisma/client'
import createDocument from '@/util/createDocument'
import { useRouter } from 'next/navigation'
import { Document, Page, pdfjs } from 'react-pdf'
import Wrapper from '../ui/wrapper'
import { motion } from 'framer-motion'
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
					<motion.div
						onClick={handleNewDocument}
						className={`${classes.document} ${classes.addDocument}`}
						whileHover="hover"
						initial="initial">
						<div className={classes.addDocument__plus}></div>
						<motion.div
							variants={{
								hover: {
									opacity: 1,
								},
								initial: {
									opacity: 0,
								},
							}}
							className={`${classes.document__backdrop} ${classes.addDocument__backdrop}`}></motion.div>
					</motion.div>
					{documents.map(document => (
						<motion.div
							onClick={() => handleOpenDocument(document.id)}
							whileHover="hover"
							initial="initial"
							key={document.id}
							className={classes.document}>
							<Document
								className={classes.document__container}
								file={document.pdfUrl}
								renderMode="canvas"
								loading={<div className={classes.document__blank} />}
								noData={<div className={classes.document__blank} />}>
								<Page
									key={1}
									className={classes.document__page}
									pageNumber={1}
									renderAnnotationLayer={false}
									renderTextLayer={false}
									loading={<div className={classes.document__blank} />}
									noData={<div className={classes.document__blank} />}
								/>
							</Document>
							<div className={classes.document__borderFix}></div>
							<motion.div
								variants={{
									hover: {
										opacity: 1,
									},
									initial: {
										opacity: 0,
									},
								}}
								className={classes.document__backdrop}>
								<div className={classes.document__backdropContainer}>
									<p className={classes.document__backdropText}>{document.name}</p>
								</div>
							</motion.div>
						</motion.div>
					))}
				</section>
			</Wrapper>
		</main>
	)
}

export default EditorSection
