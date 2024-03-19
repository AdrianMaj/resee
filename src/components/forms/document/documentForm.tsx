'use client'
import Button from '@/components/ui/button'
import FormInput from '@/components/ui/formInput'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import classes from './documentForm.module.scss'
import { Account, Career, UserDocument } from '@prisma/client'
import FormTextArea from '@/components/ui/formTextArea'
import _ from 'lodash'
import * as z from 'zod'
import updateDocument from '@/util/updateDocument'
import PhotoPicker from '@/components/ui/photoPicker'
import { documentFormSchema } from './documentForm.data'
import InfoInput from '@/components/ui/infoInput'
import { UserDocumentWithCareer } from '@/types/documentTypes'
import { infoInputFormSchema } from '@/components/ui/infoInput.data'
import createCareer from '@/util/career/createCareer'
import updateCareer from '@/util/career/updateCareer'
import removeCareer from '@/util/career/removeCareer'
import MultiSelect from '@/components/ui/multiSelect'

const DocumentForm = ({
	userDocument,
	account,
	handleSetDocumentData,
	setIsLoading,
}: {
	userDocument: UserDocumentWithCareer
	account: Account
	setIsLoading: (value: boolean) => void
	handleSetDocumentData: (documentData: UserDocumentWithCareer) => void
}) => {
	const [careerArray, setCareerArray] = useState<Career[]>(userDocument.career)
	const [skillsArray, setSkillsArray] = useState<string[]>(userDocument.skills || [])
	const [languagesArray, setLanguagesArray] = useState<string[]>(userDocument.languages || [])
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
			link1: userDocument.link1 || '',
			link2: userDocument.link2 || '',
			summary: userDocument.summary || '',
			career: careerArray,
			skills: skillsArray,
			languages: languagesArray,
			attribution: userDocument.attribution || '',
		},
	})

	const handleChangeCareer = async (values: z.infer<typeof infoInputFormSchema>) => {
		setIsLoading(true)
		const career = await updateCareer(values)
		setCareerArray(prevState => {
			const index = prevState.findIndex(item => {
				return item.id === career.id
			})
			const newArray = [...prevState]
			if (index) {
				newArray[index] = career
			}
			return newArray
		})
		setIsLoading(false)
	}

	useEffect(() => {
		setIsLoading(true)
		const updateCareer = async () => {
			const result = await updateDocument(userDocument.id, { ...form.getValues(), career: careerArray })
			handleSetDocumentData(result)
		}
		updateCareer()
		setIsLoading(false)
	}, [careerArray, form, handleSetDocumentData, userDocument.id, setIsLoading])

	const handleAddSkill = (value: string) => {
		setSkillsArray(prevArr => [...prevArr, value])
	}
	const handleRemoveSkill = (value: string) => {
		setSkillsArray(prevArr => {
			const newArr = prevArr.filter((skill, skillIndex) => {
				return `${skill}_${skillIndex}` !== value
			})
			return newArr
		})
	}

	useEffect(() => {
		form.setValue('skills', skillsArray)
	}, [skillsArray, form])

	const handleAddLanguage = (value: string) => {
		setLanguagesArray(prevArr => [...prevArr, value])
	}
	const handleRemoveLanguage = (value: string) => {
		setLanguagesArray(prevArr => {
			const newArr = prevArr.filter((language, languageIndex) => {
				return `${language}_${languageIndex}` !== value
			})
			return newArr
		})
	}

	useEffect(() => {
		form.setValue('languages', languagesArray)
	}, [languagesArray, form])

	const handleAddEmployment = async () => {
		const career = await createCareer(userDocument.id, 'employment')
		setCareerArray(prevState => [...prevState, career])
	}
	const handleAddEducation = async () => {
		const career = await createCareer(userDocument.id, 'education')
		setCareerArray(prevState => [...prevState, career])
	}
	const handleRemoveCareer = async (id: string) => {
		setCareerArray(prevState => {
			const newState = prevState.filter(item => {
				return item.id !== id
			})
			return newState
		})
		await removeCareer(id)
	}

	useEffect(() => {
		const debouncedLogValues = _.debounce(async values => {
			setIsLoading(true)
			const result = await updateDocument(userDocument.id, { ...values, career: careerArray })
			handleSetDocumentData(result)
			setTimeout(() => {
				setIsLoading(false)
			}, 3000)
		}, 1000)

		const subscription = form.watch(values => {
			debouncedLogValues(values)
		})

		return () => {
			subscription.unsubscribe()
			debouncedLogValues.cancel()
		}
	}, [form, form.watch, handleSetDocumentData, userDocument.id, careerArray, setIsLoading])

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
					<FormInput type="text" id="link1" label="Link 1" defaultValue={userDocument.link1 || undefined} />
					<FormInput type="text" id="link2" label="Link 2" defaultValue={userDocument.link2 || undefined} />
					<div className={classes.formSection__gapProvider}>
						<h2 className={classes.formSection__headingH2}>Attribution</h2>
						<FormTextArea
							minHeight="90px"
							type="text"
							id="attribution"
							label="Attribution"
							defaultValue={userDocument.attribution || undefined}
						/>
					</div>
					<div className={classes.formSection__summary}>
						<h2 className={classes.formSection__headingH2}>Professional Summary</h2>
						<p className={classes.formSection__paragraphSmall}>
							Write from 2 to 4 sentences to interest recruiter. Mention your experience and biggest achievments. You
							can also mention your skills and roles in previous work.
						</p>
						<FormTextArea
							minHeight="180px"
							type="text"
							id="summary"
							label="Summary"
							defaultValue={userDocument.summary || undefined}
						/>
					</div>
				</form>
			</FormProvider>
			<h2 className={classes.formSection__headingH2}>Employment History</h2>
			{careerArray.map(career => {
				if (career.type !== 'employment') {
					return
				}
				return (
					<InfoInput
						key={career.id}
						defaultValues={career}
						setArray={handleChangeCareer}
						handleRemove={handleRemoveCareer}
					/>
				)
			})}
			<Button
				onClick={handleAddEmployment}
				whileHover={{ backgroundColor: '#7527f1' }}
				className={classes.formSection__button}>
				+ Add Field
			</Button>
			<h2 className={classes.formSection__headingH2}>Education</h2>
			{careerArray.map(career => {
				if (career.type !== 'education') {
					return
				}
				return (
					<InfoInput
						key={career.id}
						defaultValues={career}
						setArray={handleChangeCareer}
						handleRemove={handleRemoveCareer}
					/>
				)
			})}
			<Button
				onClick={handleAddEducation}
				whileHover={{ backgroundColor: '#7527f1' }}
				className={classes.formSection__button}>
				+ Add Field
			</Button>
			<h2 className={classes.formSection__headingH2}>Skills</h2>
			<MultiSelect
				setStateFn={handleAddSkill}
				deleteElementFn={handleRemoveSkill}
				defaultValue={skillsArray}
				type="text"
				label="Skills"
			/>
			<h2 className={classes.formSection__headingH2}>Languages</h2>
			<MultiSelect
				setStateFn={handleAddLanguage}
				deleteElementFn={handleRemoveLanguage}
				defaultValue={languagesArray}
				type="text"
				label="Languages"
			/>
		</section>
	)
}

export default DocumentForm
