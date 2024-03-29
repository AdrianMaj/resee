'use client'
import React, { useEffect, useState } from 'react'
import ThemeClassical from '../themes/themeClassical'
import classes from './themeContainer.module.scss'
import { usePDF } from '@react-pdf/renderer'
import { Document, Page } from 'react-pdf'
import _ from 'lodash'
import { pdfjs } from 'react-pdf'
import { UserDocumentWithCareer } from '@/types/documentTypes'
import updatePDFUrl from '@/util/updatePDFUrl'
import deletePreviousDocument from '@/util/deletePreviousDocument'
import Spinner from '../ui/spinner'
import LinkButton from '../ui/linkButton'
import { useMediaQuery } from 'react-responsive'
import Button from '../ui/button'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const ThemeContainer = ({
	documentData,
	loadingValue,
}: {
	documentData: UserDocumentWithCareer
	loadingValue: boolean
}) => {
	const [instance, updateInstance] = usePDF({ document: <ThemeClassical documentData={documentData} /> })
	const [uploadedFile, setUploadedFile] = useState<{ URL: string; publicId: string }>({
		URL: documentData.pdfUrl || '',
		publicId: `reseeFiles/${documentData.name ? documentData.name.split(' ').join('_') : 'New_document'}_${
			documentData.id
		}.pdf`,
	})
	const [isOpened, setIsOpened] = useState(false)
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
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

	useEffect(() => {
		if (!isMobile) {
			document.body.style.height = 'auto'
			document.body.style.overflow = 'visible'
		} else if (isMobile && isOpened) {
			document.body.style.height = '100%'
			document.body.style.overflow = 'hidden'
		} else if (isMobile && !isOpened) {
			document.body.style.height = 'auto'
			document.body.style.overflow = 'visible'
		}
	}, [isMobile, isOpened])

	const handleOpenPreview = () => {
		setIsOpened(prevState => !prevState)
	}
	return (
		<>
			<section
				style={{
					display: (isMobile && isOpened) || !isMobile ? 'flex' : 'none',
				}}
				className={classes.container}>
				<div className={classes.topBar}>
					{loadingValue ? <Spinner className={classes.topBar__spinner} text="Loading..." /> : ''}
					<LinkButton
						style={{ fontSize: 'clamp(1.6rem, 1.4092rem + 0.9538vw, 2rem)' }}
						href={uploadedFile?.URL}
						target="blank">
						Download
					</LinkButton>
				</div>
				<div className={classes.documentContainer}>
					{loadingValue && <Spinner className={classes.fullSpinner} />}
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
					{/* <Spinner /> */}
				</div>
			</section>
			{isMobile && (
				<Button onClick={handleOpenPreview} filled className={classes.floatingBtn}>
					{isOpened ? 'Hide preview' : 'Show preview'}
				</Button>
			)}
		</>
	)
}

export default ThemeContainer
