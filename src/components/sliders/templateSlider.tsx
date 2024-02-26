'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import classes from './templateSlider.module.scss'
import Image from 'next/image'
import { uuid } from 'uuidv4'
import { motion } from 'framer-motion'

const RESUME_TEMPLATES = [
	{
		key: uuid(),
		src: '/resumeTemplate1.png',
		alt: 'Resume template nr.1',
	},
	{
		key: uuid(),
		src: '/resumeTemplate2.png',
		alt: 'Resume template nr.2',
	},
	{
		key: uuid(),
		src: '/resumeTemplate3.png',
		alt: 'Resume template nr.3',
	},
	{
		key: uuid(),
		src: '/resumeTemplate1.png',
		alt: 'Resume template nr.1',
	},
	{
		key: uuid(),
		src: '/resumeTemplate2.png',
		alt: 'Resume template nr.2',
	},
	{
		key: uuid(),
		src: '/resumeTemplate3.png',
		alt: 'Resume template nr.3',
	},
]

const TemplateSlider = () => {
	const swiperRef = useRef<SwiperType>()
	const MotionImage = motion(Image)
	return (
		<>
			<div className={classes.container}>
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					slidesPerView={1}
					spaceBetween={10}
					loop
					breakpoints={{
						576: {
							slidesPerView: 2,
						},
						992: {
							slidesPerView: 3,
						},
					}}
					autoplay={{
						delay: 2500,
						disableOnInteraction: true,
					}}
					onBeforeInit={swiper => {
						swiperRef.current = swiper
					}}
					pagination={{
						el: '.containerPagination',
						type: 'bullets',
						clickable: true,
					}}
					grabCursor={true}>
					{RESUME_TEMPLATES.map(slide => (
						<SwiperSlide key={slide.key}>
							<MotionImage
								whileHover={{
									border: '5px solid #9357f4',
								}}
								src={slide.src}
								alt={slide.alt}
								width={0}
								height={0}
								sizes="100vw"
								style={{ height: 'auto', width: '100%' }}
								className={classes.slideImage}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<button className={`${classes.sliderBtn} ${classes.sliderPrev}`} onClick={() => swiperRef.current?.slidePrev()}>
					<motion.svg
						whileHover="hover"
						initial="initial"
						style={{ height: 'auto', width: '100%' }}
						width="1024"
						height="1024"
						viewBox="0 0 1024 1024"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect x="240.941" y="252.988" width="530.071" height="518.023" fill="#FAFAFA" />
						<motion.path
							variants={{
								initial: {
									fill: '#9357F4',
								},
								hover: {
									fill: '#7527f1',
								},
							}}
							d="M510.996 937.652L497.172 937.439C385.269 933.811 279.276 886.344 202.055 805.274C124.833 724.205 82.5715 616.03 84.3855 504.083C86.1995 392.136 131.944 285.388 211.751 206.863C291.559 128.338 399.035 84.3296 510.996 84.3296C622.958 84.3296 730.434 128.338 810.241 206.863C890.049 285.388 935.793 392.136 937.607 504.083C939.421 616.03 897.16 724.205 819.938 805.274C742.716 886.344 636.723 933.811 524.82 937.439L510.996 937.652ZM484.842 715.359C493.417 721.99 504.195 725.108 514.987 724.08C525.778 723.052 535.774 717.955 542.943 709.824C550.112 701.693 553.918 691.138 553.587 680.303C553.256 669.468 548.814 659.165 541.162 651.487L443.412 553.652L681.663 553.652L686.655 553.354C697.454 552.069 707.355 546.71 714.334 538.37C721.314 530.031 724.846 519.341 724.209 508.485C723.572 497.629 718.813 487.426 710.905 479.96C702.998 472.495 692.538 468.331 681.663 468.319L443.412 468.319L541.162 370.484L544.703 366.474C551.334 357.898 554.452 347.12 553.424 336.328C552.396 325.537 547.299 315.542 539.168 308.372C531.037 301.203 520.483 297.397 509.647 297.728C498.812 298.059 488.509 302.501 480.831 310.154L310.164 480.82L307.05 484.319L304.319 488.116L301.674 492.938L299.796 497.631L298.516 502.41L297.791 507.786L297.663 510.986L297.962 516.02L299.199 522.335L300.692 526.815L302.996 531.636L306.026 536.372C307.286 538.064 308.669 539.662 310.164 541.151L480.831 711.818L484.842 715.359Z"
						/>
						<motion.path
							variants={{
								initial: {
									fill: '#9357F4',
								},
								hover: {
									fill: '#7527f1',
								},
							}}
							d="M510.997 937.652L497.172 937.439C385.27 933.811 279.276 886.344 202.055 805.274C124.833 724.205 82.5718 616.03 84.3858 504.083C86.1998 392.136 131.944 285.388 211.752 206.863C291.559 128.338 399.035 84.3296 510.997 84.3296C622.958 84.3296 730.434 128.338 810.241 206.863C890.049 285.388 935.793 392.136 937.607 504.083C939.421 616.03 897.16 724.205 819.938 805.274C742.717 886.344 636.723 933.811 524.821 937.439L510.997 937.652ZM484.842 715.359C493.418 721.99 504.196 725.108 514.987 724.08C525.778 723.052 535.774 717.955 542.943 709.824C550.113 701.693 553.918 691.138 553.588 680.303C553.257 669.468 548.814 659.165 541.162 651.487L443.413 553.652L681.663 553.652L686.655 553.354C697.454 552.069 707.355 546.71 714.335 538.37C721.314 530.031 724.847 519.341 724.209 508.485C723.572 497.629 718.813 487.426 710.906 479.96C702.998 472.495 692.538 468.331 681.663 468.319L443.413 468.319L541.162 370.484L544.703 366.474C551.334 357.898 554.452 347.12 553.424 336.328C552.396 325.537 547.299 315.542 539.168 308.372C531.038 301.203 520.483 297.397 509.648 297.728C498.812 298.059 488.509 302.501 480.831 310.154L310.164 480.82L307.05 484.319L304.319 488.116L301.674 492.938L299.796 497.631L298.517 502.41L297.791 507.786L297.663 510.986L297.962 516.02L299.199 522.335L300.692 526.815L302.997 531.636L306.026 536.372C307.286 538.064 308.67 539.662 310.164 541.151L480.831 711.818L484.842 715.359Z"
						/>
					</motion.svg>
				</button>
				<button className={`${classes.sliderBtn} ${classes.sliderNext}`} onClick={() => swiperRef.current?.slideNext()}>
					<motion.svg
						whileHover="hover"
						initial="initial"
						style={{ height: 'auto', width: '100%', rotate: '180deg' }}
						width="1024"
						height="1024"
						viewBox="0 0 1024 1024"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect x="240.941" y="252.988" width="530.071" height="518.023" fill="#FAFAFA" />
						<motion.path
							variants={{
								initial: {
									fill: '#9357F4',
								},
								hover: {
									fill: '#7527f1',
								},
							}}
							d="M510.996 937.652L497.172 937.439C385.269 933.811 279.276 886.344 202.055 805.274C124.833 724.205 82.5715 616.03 84.3855 504.083C86.1995 392.136 131.944 285.388 211.751 206.863C291.559 128.338 399.035 84.3296 510.996 84.3296C622.958 84.3296 730.434 128.338 810.241 206.863C890.049 285.388 935.793 392.136 937.607 504.083C939.421 616.03 897.16 724.205 819.938 805.274C742.716 886.344 636.723 933.811 524.82 937.439L510.996 937.652ZM484.842 715.359C493.417 721.99 504.195 725.108 514.987 724.08C525.778 723.052 535.774 717.955 542.943 709.824C550.112 701.693 553.918 691.138 553.587 680.303C553.256 669.468 548.814 659.165 541.162 651.487L443.412 553.652L681.663 553.652L686.655 553.354C697.454 552.069 707.355 546.71 714.334 538.37C721.314 530.031 724.846 519.341 724.209 508.485C723.572 497.629 718.813 487.426 710.905 479.96C702.998 472.495 692.538 468.331 681.663 468.319L443.412 468.319L541.162 370.484L544.703 366.474C551.334 357.898 554.452 347.12 553.424 336.328C552.396 325.537 547.299 315.542 539.168 308.372C531.037 301.203 520.483 297.397 509.647 297.728C498.812 298.059 488.509 302.501 480.831 310.154L310.164 480.82L307.05 484.319L304.319 488.116L301.674 492.938L299.796 497.631L298.516 502.41L297.791 507.786L297.663 510.986L297.962 516.02L299.199 522.335L300.692 526.815L302.996 531.636L306.026 536.372C307.286 538.064 308.669 539.662 310.164 541.151L480.831 711.818L484.842 715.359Z"
						/>
						<motion.path
							variants={{
								initial: {
									fill: '#9357F4',
								},
								hover: {
									fill: '#7527f1',
								},
							}}
							d="M510.997 937.652L497.172 937.439C385.27 933.811 279.276 886.344 202.055 805.274C124.833 724.205 82.5718 616.03 84.3858 504.083C86.1998 392.136 131.944 285.388 211.752 206.863C291.559 128.338 399.035 84.3296 510.997 84.3296C622.958 84.3296 730.434 128.338 810.241 206.863C890.049 285.388 935.793 392.136 937.607 504.083C939.421 616.03 897.16 724.205 819.938 805.274C742.717 886.344 636.723 933.811 524.821 937.439L510.997 937.652ZM484.842 715.359C493.418 721.99 504.196 725.108 514.987 724.08C525.778 723.052 535.774 717.955 542.943 709.824C550.113 701.693 553.918 691.138 553.588 680.303C553.257 669.468 548.814 659.165 541.162 651.487L443.413 553.652L681.663 553.652L686.655 553.354C697.454 552.069 707.355 546.71 714.335 538.37C721.314 530.031 724.847 519.341 724.209 508.485C723.572 497.629 718.813 487.426 710.906 479.96C702.998 472.495 692.538 468.331 681.663 468.319L443.413 468.319L541.162 370.484L544.703 366.474C551.334 357.898 554.452 347.12 553.424 336.328C552.396 325.537 547.299 315.542 539.168 308.372C531.038 301.203 520.483 297.397 509.648 297.728C498.812 298.059 488.509 302.501 480.831 310.154L310.164 480.82L307.05 484.319L304.319 488.116L301.674 492.938L299.796 497.631L298.517 502.41L297.791 507.786L297.663 510.986L297.962 516.02L299.199 522.335L300.692 526.815L302.997 531.636L306.026 536.372C307.286 538.064 308.67 539.662 310.164 541.151L480.831 711.818L484.842 715.359Z"
						/>
					</motion.svg>
				</button>
			</div>
			<div className={`containerPagination ${classes.paginationContainer}`}></div>
		</>
	)
}

export default TemplateSlider
