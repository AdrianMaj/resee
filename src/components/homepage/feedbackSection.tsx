import React from 'react'
import Wrapper from '../ui/wrapper'
import SectionHeading from '../ui/sectionHeading'
import FeedbackSlider from '../sliders/feedbackSlider'

const FeedbackSection = () => {
	return (
		<section className="section">
			<Wrapper>
				<SectionHeading>Feedback from our users</SectionHeading>
				<FeedbackSlider />
			</Wrapper>
		</section>
	)
}

export default FeedbackSection
