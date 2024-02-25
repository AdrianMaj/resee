import React from 'react'
import SectionHeading from '../ui/sectionHeading'
import Wrapper from '../ui/wrapper'
import InfoSectionCard from '../ui/infoSection/infoSectionCard'
import classes from './infoSection.module.scss'

const InfoSection = () => {
	return (
		<section className="section">
			<Wrapper>
				<SectionHeading>Create your resume in 3 simple steps!</SectionHeading>
				<div className={classes.cardSection}>
					<InfoSectionCard src="/illustration1.png" text="Select your template" number="1" />
					<InfoSectionCard src="/illustration2.png" text="Fill it with your data" number="2" />
					<InfoSectionCard src="/illustration3.png" text="Download your resume" number="3" />
				</div>
			</Wrapper>
		</section>
	)
}

export default InfoSection
