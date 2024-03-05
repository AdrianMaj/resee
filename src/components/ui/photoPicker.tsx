'use client'
import React, { useState, ChangeEvent } from 'react'
import classes from './photoPicker.module.scss'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'

const PhotoPicker = ({
	photoUrl,
	id,
	handleUpdatePhoto,
}: {
	photoUrl: string
	id: string
	handleUpdatePhoto: (files: FileList) => void
}) => {
	const { register } = useFormContext()
	const { onChange, onBlur, name, ref } = register(id)
	const [isDragging, setIsDragging] = useState(false)
	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
		const files = e.dataTransfer.files
		handleUpdatePhoto(files)
	}
	const handleDragover = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}
	return (
		<div className={classes.input}>
			<motion.label
				onDragOver={handleDragover}
				onDrop={handleDrop}
				whileHover="animate"
				animate={isDragging ? 'animate' : 'default'}
				initial="default"
				htmlFor={id}
				className={classes.imageLabel}>
				<p className={classes.imageLabelText}>Document Photo</p>
				{photoUrl ? (
					<Image
						width={0}
						height={0}
						sizes="100vw"
						src={photoUrl}
						alt="Your resume photo"
						className={classes.documentImage}
					/>
				) : (
					<div className={classes.imageLabelImagePreview}></div>
				)}
				<motion.div
					className={classes.labelAnimation}
					variants={{
						animate: {
							opacity: 1,
						},
						default: {
							opacity: 0,
						},
					}}></motion.div>
			</motion.label>
			<input
				type="file"
				accept="image/*"
				id={id}
				onChange={event => {
					if (event.target.files) {
						handleUpdatePhoto(event.target.files)
					}
				}}
				ref={ref}
				onBlur={onBlur}
				name={name}
				className={classes.fileInput}
			/>
			<p className={classes.inputNote}>Note: You can upload image files up to 10MB.</p>
		</div>
	)
}

export default PhotoPicker
