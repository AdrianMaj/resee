import React from 'react'
import Wrapper from '../ui/wrapper'
import Image from 'next/image'
import classes from './heroSection.module.scss'
import LinkButton from '../ui/linkButton'

const HeroSection = () => {
	return (
		<section className="section">
			<Wrapper>
				<div className={classes.hero}>
					<Image
						src="/heroImg.png"
						alt="Illustration of person holding resume"
						width={0}
						height={0}
						sizes="100vw"
						style={{ height: 'auto' }}
						className={classes.hero__image}
					/>
					<div className={classes.hero__textContainer}>
						<header className={classes.hero__header}>
							<h1 className={classes.hero__headingH1}>Unlock your career potential with our Resume Creator!</h1>
							<p className={`paragraph ${classes.hero__paragraph}`}>
								Resee provides an easy-to-use platform for crafting resumes. With customizable templates and many design
								tools, resee helps individuals create impactful resumes easily.
							</p>
						</header>
						<div className={classes.hero__infoContainer}>
							<Image
								src="/cup.svg"
								alt="Illustration of purple cup"
								width={0}
								height={0}
								sizes="100vw"
								style={{ height: 'auto' }}
								className={classes.hero__cupIcon}
							/>
							<p className={`paragraph ${classes.hero__cupParagraph}`}>
								Our users find jobs <span className={`paragraph ${classes.hero__cupSpan}`}>2 times</span>
								<br /> faster than the rest!
							</p>
						</div>
						<LinkButton href="/resume-editor">Create your resume now!</LinkButton>
					</div>
				</div>
			</Wrapper>
		</section>
	)
}

export default HeroSection
