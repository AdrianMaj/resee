import React from 'react'
import Wrapper from '../ui/wrapper'
import SectionHeading from '../ui/sectionHeading'
import TemplateSlider from '../sliders/templateSlider'
import LinkButton from '../ui/linkButton'
import classes from './templateSection.module.scss'

const TemplateSection = () => {
	return (
		<section className="section">
			<Wrapper>
				<SectionHeading>Browse the best templates!</SectionHeading>
				<TemplateSlider />
				<div className={classes.container}>
					<LinkButton href="/resume-templates">Show all resume templates</LinkButton>
				</div>
			</Wrapper>
		</section>
	)
}

export default TemplateSection
