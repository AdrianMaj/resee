'use client'
import Button from '@/components/ui/button'
import FormInput from '@/components/ui/formInput'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import classes from './documentForm.module.scss'
import { Account, Employment, UserDocument } from '@prisma/client'
import FormTextArea from '@/components/ui/formTextArea'
import _ from 'lodash'
import * as z from 'zod'
import updateDocument from '@/util/updateDocument'
import PhotoPicker from '@/components/ui/photoPicker'
import { documentFormSchema } from './documentForm.data'
import InfoInput from '@/components/ui/infoInput'
import createEmployment from '@/util/employment/createEmployment'
import { UserDocumentWithEmployment } from '@/types/documentTypes'
import { infoInputFormSchema } from '@/components/ui/infoInput.data'
import updateEmployment from '@/util/employment/updateEmployment'
import removeEmployment from '@/util/employment/removeEmployment'

const DocumentForm = ({
	userDocument,
	account,
	handleSetDocumentData,
}: {
	userDocument: UserDocumentWithEmployment
	account: Account
	handleSetDocumentData: (documentData: UserDocument) => void
}) => {
	const [errorMsg, setErrorMsg] = useState('')
	const [employmentArray, setEmploymentArray] = useState<Employment[]>(userDocument.employment)
	const form = useForm({
		resolver: zodResolver(documentFormSchema),
		defaultValues: {
			jobTitle: userDocument.jobTitle || '',
			photoUrl: userDocument.photoUrl || '',
			firstName: userDocument.firstName || account.name.split(' ')[0],
			lastName: userDocument.lastName || account.name.split(' ')[1],
			email: userDocument.email || account.email,
			phone: userDocument.phone || '',
			country: userDocument.country || '',
			city: userDocument.city || '',
			summary: userDocument.summary || '',
			employment: employmentArray,
		},
	})

	const handleChangeEmployment = async (values: z.infer<typeof infoInputFormSchema>) => {
		const employment = await updateEmployment(values)
		console.log(employment)
		setEmploymentArray(prevState => {
			const index = prevState.findIndex(item => {
				return item.id === employment.id
			})
			if (index) {
				prevState[index] = employment
			}
			return prevState
		})
	}

	const handleAddEmployment = async () => {
		const employment = await createEmployment(userDocument.id)
		setEmploymentArray(prevState => [...prevState, employment])
	}
	const handleRemoveEmployment = async (id: string) => {
		setEmploymentArray(prevState => {
			const newState = prevState.filter(item => {
				return item.id !== id
			})
			return newState
		})
		await removeEmployment(id)
	}

	useEffect(() => {
		form.setValue('employment', employmentArray)
		console.log(form.getValues('employment'))
	}, [employmentArray, form])

	useEffect(() => {
		const debouncedLogValues = _.debounce(async values => {
			const result = await updateDocument(userDocument.id, values)
			handleSetDocumentData(result)
		}, 1000)

		const subscription = form.watch(values => {
			debouncedLogValues(values)
		})

		return () => {
			subscription.unsubscribe()
			debouncedLogValues.cancel()
		}
	}, [form, form.watch, handleSetDocumentData, userDocument.id])

	const handleUpdatePhoto = (files: FileList) => {
		if (files && files[0] && files[0].type.startsWith('image') && files[0].size < 10485760) {
			handleUploadPhoto(files[0])
			const url = URL.createObjectURL(files[0])
			form.setValue('photoUrl', url)
		} else if (files && files[0] && files[0].type.startsWith('image') && files[0].size > 10485760) {
			alert('File is too big to be uploaded. (Max size is 10 MB)')
		} else {
			return
		}
	}
	const handleUploadPhoto = async (file: File) => {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'reseePhotos')
		try {
			const response = await fetch(`https://api.cloudinary.com/v1_1/dcl15uhh0/image/upload`, {
				method: 'POST',
				body: formData,
			})
			const res = await response.json()
			form.setValue('photoUrl', res.secure_url)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<section className={classes.formSection}>
			<h1 className="headingH1">{userDocument.name}</h1>
			<FormProvider {...form}>
				<form className={classes.formSection__form}>
					<h2 className={classes.formSection__headingH2}>Personal info</h2>
					<PhotoPicker id="photoUrl" photoUrl={form.getValues('photoUrl')} handleUpdatePhoto={handleUpdatePhoto} />
					<FormInput type="text" id="jobTitle" label="Job Title" defaultValue={userDocument.jobTitle || undefined} />
					<FormInput
						type="text"
						id="firstName"
						label="First Name"
						defaultValue={userDocument.firstName || account.name.split(' ')[0]}
					/>
					<FormInput
						type="text"
						id="lastName"
						label="Last Name"
						defaultValue={userDocument.lastName || account.name.split(' ')[1]}
					/>
					<FormInput type="email" id="email" label="Email" defaultValue={userDocument.email || account.email} />
					<FormInput type="tel" id="phone" label="Phone number" defaultValue={userDocument.phone || undefined} />
					<FormInput type="country" id="country" label="Country" defaultValue={userDocument.country || undefined} />
					<FormInput type="city" id="city" label="City" defaultValue={userDocument.city || undefined} />
					<div className={classes.formSection__summary}>
						<h2 className={classes.formSection__headingH2}>Professional Summary</h2>
						<p className={classes.formSection__paragraphSmall}>
							Write from 2 to 4 sentences to interest recruiter. Mention your experience and biggest achievments. You
							can also mention your skills and roles in previous work.
						</p>
						<FormTextArea type="text" id="summary" label="Summary" defaultValue={userDocument.summary || undefined} />
					</div>
				</form>
				<p>{errorMsg}</p>
			</FormProvider>
			<h2 className={classes.formSection__headingH2}>Employment History</h2>
			{employmentArray.map(employment => (
				<InfoInput key={employment.id} defaultValues={employment} setArray={handleChangeEmployment} handleRemove={handleRemoveEmployment} />
			))}
			<Button
				onClick={handleAddEmployment}
				whileHover={{ backgroundColor: '#7527f1' }}
				className={classes.formSection__button}>
				+ Add Field
			</Button>
			<h2 className={classes.formSection__headingH2}>Education</h2>
			{/* <InfoInput />
			<Button whileHover={{ backgroundColor: '#7527f1' }} className={classes.formSection__button}>
				+ Add Field
			</Button> */}
			<h2 className={classes.formSection__headingH2}>Skills</h2>
			<p>To be filled.</p>
			<h2 className={classes.formSection__headingH2}>Languages</h2>
			<p>To be filled.</p>
		</section>
	)
}

export default DocumentForm
