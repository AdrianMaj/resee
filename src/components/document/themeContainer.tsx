'use client'
import React from 'react'
import ThemeClassical from '../themes/themeClassical'
import classes from './themeContainer.module.scss'
import { UserDocument } from '@prisma/client'
import { PDFViewer } from '@react-pdf/renderer'

const ThemeContainer = ({ documentData }: { documentData: UserDocument }) => {
	return (
		<section className={classes.container}>
			<PDFViewer className={classes.document}>
				<ThemeClassical documentData={documentData} />
			</PDFViewer>
		</section>
	)
}

export default ThemeContainer
