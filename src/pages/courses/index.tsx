import React, { Suspense } from 'react'
import Layout from '../../core/layouts/Layout'
import { useCourses } from '../../courses/hooks/useCourses'
import { CourseCard } from 'app/core/components/card/CourseCard'
import { CardList } from 'app/core/components/card/CardList'

const CoursesPage = () => {
	return (
		<Layout>
			<Suspense>
				<ListOfCourses />
			</Suspense>
		</Layout>
	)
}

const ListOfCourses = () => {
	const { courses } = useCourses({
		include: {
			reviews: true,
			chapters: true,
		},
	})
	return (
		<CardList
			title={'Courses'}
			description={'Here are some courses'}
		>
			{courses.map((course) => (
				<CourseCard
					key={course.id}
					course={course}
				/>
			))}
		</CardList>
	)
}

export default CoursesPage
