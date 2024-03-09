'use client'
import React, { useCallback, useEffect, useState } from 'react'
import ThemeClassical from '../themes/themeClassical'
import classes from './themeContainer.module.scss'
import { UserDocument } from '@prisma/client'
import ReactPDF, { usePDF } from '@react-pdf/renderer'
import { Document, Page } from 'react-pdf'
import _ from 'lodash'
import { pdfjs } from 'react-pdf'
import updatePDFUrl from '@/util/updatePDFUrl'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const ThemeContainer = ({ documentData }: { documentData: UserDocument }) => {
	const [instance, updateInstance] = usePDF({ document: <ThemeClassical documentData={documentData} /> })
	const [uploadedFile, setUploadedFile] = useState<{ URL: string; publicId: string }>()
	useEffect(() => {
		updateInstance(<ThemeClassical documentData={documentData} />)
	}, [documentData, updateInstance])
	useEffect(() => {
		const fileUpload = async () => {
			if (!instance.blob) {
				return
			}
			const formData = new FormData()
			const file = new File([instance.blob], `${documentData.name}_${documentData.id}.pdf`, {
				type: instance.blob.type,
			})
			formData.append('file', file)
			formData.append('upload_preset', 'reseeFiles')
			try {
				const response = await fetch(`https://api.cloudinary.com/v1_1/dcl15uhh0/raw/upload`, {
					method: 'POST',
					body: formData,
				})
				const res = await response.json()
				// await updatePDFUrl(documentData.id, uploadedFile?.URL)
				setUploadedFile({ URL: res.secure_url, publicId: res.public_id })
			} catch (error) {
				console.error(error)
			}
		}
		fileUpload()
	}, [documentData.id, instance.blob, documentData.name])

	return (
		<section className={classes.container}>
			{/* <a href={uploadedFile.URL}>Test URL</a> */}
			<Document
				className={classes.documentContainer}
				file={instance.blob}
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
		</section>
	)
}

export default ThemeContainer
