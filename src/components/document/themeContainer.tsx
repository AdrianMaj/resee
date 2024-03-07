'use client'
import React, { useCallback, useEffect, useState } from 'react'
import ThemeClassical from '../themes/themeClassical'
import classes from './themeContainer.module.scss'
import { UserDocument } from '@prisma/client'
import { usePDF } from '@react-pdf/renderer'
import { Document, Page } from 'react-pdf'
import _ from 'lodash'
import { pdfjs } from 'react-pdf'
import updatePDFUrl from '@/util/updatePDFUrl'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const ThemeContainer = ({ documentData }: { documentData: UserDocument }) => {
	const [currentDocument, setCurrentDocument] = useState<UserDocument>(documentData)
	const [instance] = usePDF({ document: <ThemeClassical documentData={currentDocument} /> })
	const [uploadedFile, setUploadedFile] = useState({ URL: '', publicId: '' })
	const [fileFromBlob, setFileFromBlob] = useState<File>()
	const [previousUploadedFile, setPreviousUploadedFile] = useState({ URL: '', publicId: '' })

	useEffect(() => {
		if (instance.blob) {
			const file = new File([instance.blob], `${documentData.name}.pdf`, {
				type: instance.blob.type,
			})
			setFileFromBlob(file)
		}
	}, [instance.blob, documentData.name])

	const handleChangePDF = useCallback(async () => {
		const document = await updatePDFUrl(documentData.id, uploadedFile.URL, previousUploadedFile.publicId)
		setCurrentDocument(document)
	}, [documentData.id, previousUploadedFile.publicId, uploadedFile.URL])

	useEffect(() => {
		if (!fileFromBlob) {
			return
		}
		const formData = new FormData()
		formData.append('file', fileFromBlob)
		formData.append('upload_preset', 'reseeFiles')
		if (uploadedFile) {
			setPreviousUploadedFile(uploadedFile)
		}
		const imageUpload = async () => {
			try {
				const response = await fetch(`https://api.cloudinary.com/v1_1/dcl15uhh0/raw/upload`, {
					method: 'POST',
					body: formData,
				})
				const res = await response.json()
				setUploadedFile({ URL: res.secure_url, publicId: res.public_id })
				await handleChangePDF()
			} catch (error) {
				console.error(error)
			}
		}
		imageUpload()
	}, [fileFromBlob, uploadedFile, handleChangePDF])

	return (
		<section className={classes.container}>
			<a href={uploadedFile.URL}>Test URL</a>
			<Document className={classes.documentContainer} file={fileFromBlob} renderMode="canvas">
				<Page
					key={1}
					className={classes.document}
					pageNumber={1}
					renderAnnotationLayer={false}
					renderTextLayer={false}
				/>
			</Document>
		</section>
	)
}

export default ThemeContainer
