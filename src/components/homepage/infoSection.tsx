import React from 'react'
import SectionHeading from '../ui/sectionHeading'
import Wrapper from '../ui/wrapper'
import InfoSectionCard from '../ui/infoSection/infoSectionCard'

const InfoSection = () => {
	return (
		<section>
			<Wrapper>
				<SectionHeading>Create your resume in 3 simple steps!</SectionHeading>
				<div>
					<InfoSectionCard src="/illustration1.png" text="Select your template" number="1" />
				</div>
			</Wrapper>
		</section>
	)
}

export default InfoSection
