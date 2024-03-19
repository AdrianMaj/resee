/* eslint-disable jsx-a11y/alt-text */
'use client'
import React, { useEffect, useState } from 'react'
import { Career } from '@prisma/client'
import { Page, Text, View, Document, StyleSheet, Image, Font, Link } from '@react-pdf/renderer'
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
		height: '100%',
		fontFamily: 'Raleway',
		flex: 1,
	},
	section: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: 'auto',
		marginBottom: 35,
	},
	sectionHalf: {
		width: '47.5%',
	},
	sectionFull: {
		width: '100%',
		flex: 1,
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
		color: '#000',
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
		height: '60%',
		paddingTop: 15,
		paddingBottom: 15,
	},
	containerSmall: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		height: '15%',
		paddingTop: 15,
		paddingBottom: 15,
	},
	containerPreLast: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: '25%',
		width: '100%',
		paddingTop: 15,
		paddingBottom: 15,
	},
	containerLast: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		width: '100%',
		minHeight: '5%',
		maxHeight: '10%',
		marginTop: 'auto',
		paddingTop: 15,
	},
	sectionText: {
		fontSize: 18,
		fontWeight: 'medium',
		marginBottom: 5,
	},
	attribution: {
		fontSize: 11,
	},
	bodyText: {
		fontSize: 12,
		flex: 1,
	},
	mainText: {
		fontSize: 16,
	},
	career: {
		flexDirection: 'row',
		height: 'auto',
	},
	careerText: {
		width: '70%',
		flex: 1,
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
		width: 1,
		height: 16,
		marginVertical: '4px',
		backgroundColor: '#000',
	},
	columnLayout: {
		flexDirection: 'column',
	},
})
const ThemeClassical = ({ documentData }: { documentData: UserDocumentWithCareer }) => {
	const [education, setEducation] = useState<Career[]>()
	const [employment, setEmployment] = useState<Career[]>()

	useEffect(() => {
		const educationArr = documentData.career.filter(career => career.type === 'education')
		const employmentArr = documentData.career.filter(career => career.type === 'employment')
		setEducation(educationArr)
		setEmployment(employmentArr)
	}, [documentData])

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.section}>
					{documentData.photoUrl && documentData.photoUrl !== '' && (
						<Image style={styles.image} src={documentData.photoUrl} />
					)}
					<View style={styles.column}>
						<Text style={styles.name}>{documentData.firstName + ' ' + documentData.lastName}</Text>
						<Text style={styles.subtext}>{documentData.jobTitle}</Text>
						<View style={styles.row}>
							<Link style={styles.subtextWidth} href={`tel:${documentData.phone}`}>
								{documentData.phone}
							</Link>
							<Link style={styles.subtextWidth} href={`mailto:${documentData.email}`}>
								{documentData.email}
							</Link>
						</View>
						<View style={styles.row}>
							<Link style={styles.subtextWidth} href={`${documentData.link1}`}>
								{documentData.link1?.replace(/^\/\/|^.*?:(\/\/)?/, '')}
							</Link>
							<Link style={styles.subtextWidth} href={`${documentData.link2}`}>
								{documentData.link2?.replace(/^\/\/|^.*?:(\/\/)?/, '')}
							</Link>
						</View>
						<View style={styles.row}>
							<Text style={styles.subtext}>{documentData.city + ', ' + documentData.country || '[Your Address]'}</Text>
						</View>
					</View>
				</View>
				<View style={styles.columnLayout}>
					<View style={styles.containerSmall}>
						<View style={styles.sectionHalf}>
							<Text style={styles.sectionText}>Skills</Text>
							<Text style={styles.mainText}>{documentData.skills.join(', ')}</Text>
						</View>
						<View style={styles.sectionHalf}>
							<Text style={styles.sectionText}>Languages</Text>
							<Text style={styles.mainText}>{documentData.languages.join(', ')}</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.sectionHalf}>
							<Text style={styles.sectionText}>Education</Text>
							{education?.map(career => {
								return (
									<View style={styles.career} key={career.id}>
										<View style={styles.careerDate}>
											<Text style={styles.careerDateText}>{career.from}</Text>
											<View style={styles.yearLine} />
											<Text style={styles.careerDateTextLast}>{career.to}</Text>
										</View>
										<View style={styles.careerText}>
											<Text style={styles.mainText}>{career.title}</Text>
											<Text style={styles.bodyText}>{career.description}</Text>
										</View>
									</View>
								)
							})}
						</View>
						<View style={styles.sectionHalf}>
							<Text style={styles.sectionText}>Employment History</Text>
							{employment?.map(career => {
								return (
									<View style={styles.career} key={career.id}>
										<View style={styles.careerDate}>
											<Text style={styles.careerDateText}>{career.from}</Text>
											<View style={styles.yearLine} />
											<Text style={styles.careerDateTextLast}>{career.to}</Text>
										</View>
										<View style={styles.careerText}>
											<Text style={styles.mainText}>{career.title}</Text>
											<Text style={styles.bodyText}>{career.description}</Text>
										</View>
									</View>
								)
							})}
						</View>
					</View>
					<View style={styles.containerPreLast}>
						<View style={styles.sectionFull}>
							<Text style={styles.sectionText}>Summary</Text>
							<Text style={styles.bodyText}>{documentData.summary}</Text>
						</View>
					</View>
				</View>
				<View style={styles.containerLast}>
					<Text style={styles.attribution}>{documentData.attribution}</Text>
				</View>
			</Page>
		</Document>
	)
}

export default ThemeClassical
