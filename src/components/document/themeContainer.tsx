'use client'
import React, { useEffect, useState } from 'react'
import ThemeClassical from '../themes/themeClassical'
import classes from './themeContainer.module.scss'
import { UserDocument } from '@prisma/client'
import { usePDF } from '@react-pdf/renderer'
import { Document, Page } from 'react-pdf'
import _ from 'lodash'
import { pdfjs } from 'react-pdf'
import { UserDocumentWithCareer } from '@/types/documentTypes'
import updatePDFUrl from '@/util/updatePDFUrl'
import deletePreviousDocument from '@/util/deletePreviousDocument'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const ThemeContainer = ({ documentData }: { documentData: UserDocumentWithCareer }) => {
	const [instance, updateInstance] = usePDF({ document: <ThemeClassical documentData={documentData} /> })
	const [uploadedFile, setUploadedFile] = useState<{ URL: string; publicId: string }>({
		URL: documentData.pdfUrl || '',
		publicId: `reseeFiles/${documentData.name ? documentData.name.split(' ').join('_') : 'New_document'}_${
			documentData.id
		}.pdf`,
	})
	useEffect(() => {
		updateInstance(<ThemeClassical documentData={documentData} />)
	}, [documentData, updateInstance])
	useEffect(() => {
		const fileUpload = async () => {
			if (!instance.blob) {
				return
			}
			try {
				await deletePreviousDocument(
					`reseeFiles/${documentData.name ? documentData.name.split(' ').join('_') : 'New_document'}_${
						documentData.id
					}.pdf`
				)
			} catch (error) {
				console.error(error)
			}
			const file = new File(
				[instance.blob],
				`${documentData.name ? documentData.name.split(' ').join('_') : 'New_document'}_${documentData.id}.pdf`,
				{
					type: instance.blob.type,
				}
			)
			const formData = new FormData()
			formData.append('file', file)
			formData.append('upload_preset', 'reseeFiles')
			try {
				const response = await fetch(`https://api.cloudinary.com/v1_1/dcl15uhh0/raw/upload`, {
					method: 'POST',
					body: formData,
				})
				const res = await response.json()
				setUploadedFile({ URL: res.secure_url, publicId: res.public_id })
				await updatePDFUrl(documentData.id, res.secure_url)
			} catch (error) {
				console.error(error)
			}
		}
		fileUpload()
	}, [documentData.id, instance.blob, documentData.name])

	useEffect(() => {
		const updatePDF = async () => {
			if (!uploadedFile?.URL) {
				return
			}
			await updatePDFUrl(documentData.id, uploadedFile?.URL)
		}
		updatePDF()
	}, [uploadedFile?.URL, documentData.id])

	return (
		<section className={classes.container}>
			<a href={uploadedFile?.URL}>Test URL</a>
			<div className={classes.documentContainer}>
				<Document
					className={classes.document}
					file={instance.blob}
					renderMode="canvas"
					loading={<div />}
					noData={<div />}>
					<Page
						scale={96 / 72}
						key={1}
						className={classes.documentPage}
						pageNumber={1}
						renderAnnotationLayer={false}
						renderTextLayer={false}
						loading={<div />}
						noData={<div />}
					/>
				</Document>
				{/* add spinner */}
			</div>
		</section>
	)
}

export default ThemeContainer
