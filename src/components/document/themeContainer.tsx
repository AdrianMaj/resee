'use client'
import React, { useEffect, useState } from 'react'
import ThemeClassical from '../themes/themeClassical'
import classes from './themeContainer.module.scss'
import { UserDocument } from '@prisma/client'
import { PDFViewer, usePDF } from '@react-pdf/renderer'
import { Document, Page } from 'react-pdf'
import _ from 'lodash'
import { pdfjs } from 'react-pdf'
import updatePDFUrl from '@/util/updatePDFUrl'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const ThemeContainer = ({ documentData }: { documentData: UserDocument }) => {
	const [instance] = usePDF({ document: <ThemeClassical documentData={documentData} /> })
	const [uploadedFile, setUploadedFile] = useState({ URL: '', publicId: '' })
	const [previousUploadedFile, setPreviousUploadedFile] = useState({ URL: '', publicId: '' })
	useEffect(() => {
		let isMounted = true
		const handleInstanceChange = async () => {
			if (instance.blob) {
				const file = new File([instance.blob], `${documentData.name}.pdf`, {
					type: instance.blob.type,
				})
				const formData = new FormData()
				formData.append('file', file)
				formData.append('upload_preset', 'reseeFiles')

				try {
					const response = await fetch(`https://api.cloudinary.com/v1_1/dcl15uhh0/raw/upload`, {
						method: 'POST',
						body: formData,
					})
					const res = await response.json()

					if (isMounted) {
						setPreviousUploadedFile(uploadedFile)
						if (previousUploadedFile.publicId) {
							await updatePDFUrl(documentData.id, res.secure_url, previousUploadedFile.publicId)
						}

						setUploadedFile({
							URL: res.secure_url,
							publicId: res.public_id,
						})
					}
				} catch (error) {
					console.error(error)
				}
			}
		}

		const debouncedHandleInstanceChange = _.debounce(handleInstanceChange, 1000)

		debouncedHandleInstanceChange()

		return () => {
			isMounted = false
		}
	}, [documentData.id, instance.blob, documentData.name, uploadedFile, previousUploadedFile.publicId])

	return (
		<section className={classes.container}>
			<a href={uploadedFile.URL}>Test URL</a>
			<Document className={classes.documentContainer} key={instance.url} file={instance.blob} renderMode="canvas">
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
