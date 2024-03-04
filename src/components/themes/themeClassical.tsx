import React from 'react'
import { UserDocument } from '@prisma/client'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
// import classes from './themeClassical.module.scss'
// import Image from 'next/image'

// const ThemeClassical = ({ documentData }: { documentData: UserDocument }) => {
// 	return (
// 		<div className={classes.container}>
// 			<div className={classes.firstLineContainer}>
// 				<Image src="/avatar.jpg" alt="Your resume photo" width={0} height={0} sizes="100vw" className={classes.image} />
// 				<p className={classes.textBold}>
// 					{documentData.firstName || 'Name'} {documentData.lastName || 'Surname'}
// 				</p>
// 			</div>
// 		</div>
// 	)
// }

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#fff',
	},
	section: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		margin: 10,
		padding: 10,
	},
	image: {
		width: '25%',
		height: 160,
		objectFit: 'cover',
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
})
const ThemeClassical = ({ documentData }: { documentData: UserDocument }) => {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.section}>
					<Image
						style={styles.image}
						src="https://res.cloudinary.com/dcl15uhh0/image/upload/v1708338946/pumpfit/qc1nvmjz3961axwxgxse.png"
					/>
					<View style={styles.column}>
						<Text style={styles.text}>Name Surname</Text>
						<Text style={styles.subtext}>Frontend Developer</Text>
						<View style={styles.row}>
							<Text style={styles.subtextWidth}>+48 123 456 789</Text>
							<Text style={styles.subtextWidth}>email@example.com</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.subtextWidth}>github.com</Text>
							<Text style={styles.subtextWidth}>linkedin.com/in/abc</Text>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	)
}

export default ThemeClassical
