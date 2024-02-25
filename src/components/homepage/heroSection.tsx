import React from 'react'
import Wrapper from '../ui/wrapper'
import Image from 'next/image'
import classes from './heroSection.module.scss'
import LinkButton from '../ui/linkButton'

const HeroSection = () => {
	return (
		<section className={`section`}>
			<Wrapper>
				<div className={classes.container}>
					<Image
						src="/heroImg.png"
						alt="Illustration of person holding resume"
						width={0}
						height={0}
						sizes="100vw"
						style={{ height: 'auto' }}
						className={classes.heroImg}
					/>
					<div className={classes.textContainer}>
						<header className={classes.header}>
							<h1 className={classes.headingH1}>Unlock your career potential with our Resume Creator!</h1>
							<p className={`paragraph ${classes.heroParagraph}`}>
								Resee provides an easy-to-use platform for crafting resumes. With customizable templates and many design
								tools, resee helps individuals create impactful resumes easily.
							</p>
						</header>
						<div className={classes.infoContainer}>
							<Image
								src="/cup.svg"
								alt="Illustration of purple cup"
								width={0}
								height={0}
								sizes="100vw"
								style={{ height: 'auto' }}
								className={classes.cupIcon}
							/>
							<p className={`paragraph ${classes.cupParagraph}`}>
								Our users find jobs <span className={`paragraph ${classes.cupSpan}`}>2 times</span>
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
