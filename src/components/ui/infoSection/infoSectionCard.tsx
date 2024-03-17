import React from 'react'
import classes from './infoSectionCard.module.scss'
import Image from 'next/image'
const InfoSectionCard = ({ src, number, text }: { src: string; number: string; text: string }) => {
	return (
		<div className={classes.card}>
			<Image
				src={src}
				alt={text}
				width={0}
				height={0}
				sizes="100vw"
				className={classes.cardImg}
			/>
			<div className={classes.cardTextContainer}>
				<p className={classes.cardNumber}>0{number}</p>
				<p className={classes.cardText}>{text}</p>
			</div>
		</div>
	)
}

export default InfoSectionCard
