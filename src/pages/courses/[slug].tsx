import React, { Suspense } from 'react'
import Layout from '../../core/layouts/Layout'
import { useCourse } from '../../courses/hooks/useCourse'
import { useParams } from '@blitzjs/next'
import { Accordion } from 'flowbite-react'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'

const CourseSlugPage = (props) => {
	const params = useParams('string')
	return (
		<Layout>
			<Suspense>
				<CourseDetails slug={params.slug} />
			</Suspense>
		</Layout>
	)
}

function UserAvatar({ user }) {
	return (
		<div className="w-10 relative rounded-full border-2 border-white border-opacity-50 aspect-square overflow-hidden">
			<img
				className="absolute w-full h-full object-cover object-center rounded-full"
				src={`${user?.avatar}`}
				alt="author profile picture in a circle"
			/>
		</div>
	)
}

const CourseDetails = ({ slug }) => {
	const { id, title, summary, price, image, duration, author, chapters } = useCourse(slug, {
		include: {
			reviews: true,
			chapters: {
				orderBy: [
					{
						position: 'asc',
					},
				],
				include: {
					lessons: {
						orderBy: [
							{
								position: 'asc',
							},
						],
					},
				},
			},
			author: true,
		},
	})
	return (
		<section>
			<div className="h-96 relative flex w-full items-center px-8 py-3">
				<div className="">
					<h1 className="font-bold text-3xl text-white uppercase">{title}</h1>
					<div className="flex gap-2 items-center">
						<span className="font-light text-base uppercase text-white">instructed by</span>
						<div className="text-white flex gap-2 text-xl items-center">
							<UserAvatar user={author} />
							<h2 className="font-medium">
								{author?.firstName} {author?.lastName}
							</h2>
						</div>
					</div>
				</div>
				<div className="bg-black absolute -z-10 w-full h-full top-0 left-0 opacity-50"></div>
				<img
					className="w-full -z-20 h-full object-cover object-center absolute top-0 left-0"
					src={`${image}`}
					alt="course thumbnail image"
				/>
			</div>
			<div className="flex mt-6">
				<div className="flex-1 w-4/6">
					<h3>Course Description</h3>
					<p className="">{summary}</p>
					<h3>Chapters</h3>
					<Accordion>
						{chapters
							.sort((a, b) => a.position - b.position)
							.map((chapter, chapterIndex) => (
								<Accordion.Panel key={chapterIndex}>
									<Accordion.Title>{chapter.title}</Accordion.Title>
									<Accordion.Content>
										{chapter.lessons.map((lesson, lessonIndex) => (
											<div
												key={lessonIndex}
												className="flex justify-between items-center"
											>
												<p>{lesson.title}</p>
												<span>{lesson.duration} min</span>
											</div>
										))}
									</Accordion.Content>
								</Accordion.Panel>
							))}
					</Accordion>
				</div>
				<div className="flex-none w-2/6">{price}</div>
			</div>
		</section>
	)
}

export default CourseSlugPage
