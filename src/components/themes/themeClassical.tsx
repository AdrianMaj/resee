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
		marginBottom: 35,
	},
	sectionHalf: {
		width: '47.5%',
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
	name: {
		fontSize: 25,
		marginBottom: 15,
		fontWeight: 'bold',
	},
	subtext: {
		fontSize: 15,
		marginBottom: 10,
	},
	subtextWidth: {
		fontSize: 15,
		marginBottom: 10,
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
		justifyContent: 'space-between',
		width: '100%',
		minHeight: 180,
		paddingTop: 15,
		paddingBottom: 15,
	},
	sectionText: {
		fontSize: 18,
		fontWeight: 'medium',
		marginBottom: 5,
	},
	attribution: {
		fontSize: 11,
		marginTop: 'auto',
	},
	bodyText: {
		fontSize: 12,
	},
	career: {
		flexDirection: 'row',
	},
	careerText: {
		width: '70%',
	},
	careerDate: {
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
		width: '17%',
		marginRight: 10,
	},
	careerDateText: {
		fontSize: 12,
	},
	careerDateTextLast: {
		fontSize: 12,
	},
	yearLine: {
		width: 3,
		height: '25%',
		marginVertical: '4px',
		backgroundColor: '#000',
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
						<Text style={styles.name}>{documentData.firstName + ' ' + documentData.lastName || '[Your Name]'}</Text>
						<Text style={styles.subtext}>{documentData.jobTitle || '[Job Title]'}</Text>
						<View style={styles.row}>
							<Text style={styles.subtextWidth}>{documentData.phone || '[Phone number]'}</Text>
							<Text style={styles.subtextWidth}>{documentData.email || '[Your Email]'}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.subtextWidth}>{'[Your Link 1]'}</Text>
							<Text style={styles.subtextWidth}>{'[Your Link 2]'}</Text>
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
										<View style={styles.career} key={career.id}>
											<View style={styles.careerDate}>
												<Text style={styles.careerDateText}>{career.from}</Text>
												<View style={styles.yearLine} />
												<Text style={styles.careerDateTextLast}>{career.to}</Text>
											</View>
											<View style={styles.careerText}>
												<Text>{career.title}</Text>
												<Text style={styles.bodyText}>{career.description}</Text>
											</View>
										</View>
									)
								}
							})}
					</View>
					<View style={styles.sectionHalf}>
						<Text style={styles.sectionText}>Skills</Text>
						<Text>{documentData.skills.join(', ')}</Text>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.sectionHalf}>
						<Text style={styles.sectionText}>Employment History</Text>
						{documentData.career.length > 0 &&
							documentData.career.map(career => {
								if (career.type === 'employment') {
									return (
										<View style={styles.career} key={career.id}>
											<View style={styles.careerDate}>
												<Text style={styles.careerDateText}>{career.from}</Text>
												<View style={styles.yearLine} />
												<Text style={styles.careerDateTextLast}>{career.to}</Text>
											</View>
											<View style={styles.careerText}>
												<Text>{career.title}</Text>
												<Text style={styles.bodyText}>{career.description}</Text>
											</View>
										</View>
									)
								}
							})}
					</View>
					<View style={styles.sectionHalf}>
						<Text style={styles.sectionText}>Languages</Text>
						<Text>{documentData.languages.join(', ')}</Text>
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
