/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { UserDocument } from '@prisma/client'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer'
import { UserDocumentWithCareer } from '@/types/documentTypes'

Font.register({
	family: 'Raleway',
	fonts: [
		{ src: '/fonts/raleway/raleway-regular.woff' },
		{ src: '/fonts/raleway/raleway-medium.woff', fontWeight: 'medium' },
		{ src: '/fonts/raleway/raleway-semibold.woff', fontWeight: 'semibold' },
		{ src: '/fonts/raleway/raleway-bold.woff', fontWeight: 'bold' },
	],
})

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		padding: 20,
		fontFamily: 'Raleway',
	},
	section: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		marginBottom: 10,
	},
	sectionHalf: {
		width: '50%',
	},
	sectionFull: {
		width: '100%',
	},
	image: {
		width: '25%',
		aspectRatio: 1 / 1.2,
		objectFit: 'cover',
		borderRadius: 5,
	},
	text: {
		fontSize: 25,
		marginBottom: 5,
		fontWeight: 'bold',
	},
	subtext: {
		fontSize: 15,
	},
	subtextWidth: {
		fontSize: 15,
		width: '50%',
	},
	column: {
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		flexDirection: 'column',
		width: '75%',
	},
	row: {
		marginTop: 10,
		flexDirection: 'row',
		width: '100%',
	},
	container: {
		flexDirection: 'row',
		minHeight: 180,
		paddingTop: 15,
		paddingBottom: 15,
	},
	sectionText: {
		fontSize: 18,
		fontWeight: 'medium',
	},
	attribution: {
		fontSize: 11,
		marginTop: 'auto',
	},
	bodyText: {
		fontSize: 12,
	},
})
const ThemeClassical = ({ documentData }: { documentData: UserDocumentWithCareer }) => {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.section}>
					{documentData.photoUrl && documentData.photoUrl !== '' && (
						<Image style={styles.image} src={documentData.photoUrl} />
					)}
					<View style={styles.column}>
						<Text style={styles.text}>{documentData.firstName + ' ' + documentData.lastName || '[Your Name]'}</Text>
						<Text style={styles.subtext}>{documentData.jobTitle || '[Job Title]'}</Text>
						<View style={styles.row}>
							<Text style={styles.subtextWidth}>{documentData.phone || '[Phone number]'}</Text>
							<Text style={styles.subtextWidth}>{documentData.email || '[Your Email]'}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.subtextWidth}>{documentData.skills || '[Your Link 1]'}</Text>
							<Text style={styles.subtextWidth}>{documentData.languages || '[Your Link 2]'}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.subtext}>{documentData.city + ', ' + documentData.country || '[Your Address]'}</Text>
						</View>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.sectionHalf}>
						<Text style={styles.sectionText}>Education</Text>
						{documentData.career.length > 0 &&
							documentData.career.map(career => {
								if (career.type === 'education') {
									return (
										<View key={career.id}>
											<Text>{career.from}</Text>
											<Text>{career.to}</Text>
											<Text>{career.title}</Text>
											<Text>{career.description}</Text>
										</View>
									)
								}
							})}
					</View>
					<View style={styles.sectionHalf}>
						<Text style={styles.sectionText}>Employment History</Text>
						{documentData.career.length > 0 &&
							documentData.career.map(career => {
								if (career.type === 'employment') {
									return (
										<View key={career.id}>
											<Text>{career.from}</Text>
											<Text>{career.to}</Text>
											<Text>{career.title}</Text>
											<Text>{career.description}</Text>
										</View>
									)
								}
							})}
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.sectionHalf}>
						<Text style={styles.sectionText}>Skills</Text>
					</View>
					<View style={styles.sectionHalf}>
						<Text style={styles.sectionText}>Languages</Text>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.sectionFull}>
						<Text style={styles.sectionText}>Summary</Text>
						<Text style={styles.bodyText}>{documentData.summary}</Text>
					</View>
				</View>
				<Text style={styles.attribution}>
					I hereby consent to my personal data being processed by company name for the purpose of considering my
					application for the vacancy advertised under reference number 123XX6 etc.
				</Text>
			</Page>
		</Document>
	)
}

export default ThemeClassical
