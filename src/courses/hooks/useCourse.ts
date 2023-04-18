import { useQuery } from '@blitzjs/rpc'
import { Prisma } from 'db'
import getCourseBySlug from '../queries/getCourseBySlug'
import { Course, User, Chapter, Lesson } from '@prisma/client'

export const useCourse = (slug: string, args: Prisma.CourseFindManyArgs = {}) => {
	const [course] = useQuery(getCourseBySlug, {
		slug,
		...args,
	})
	return course as Course & {
		author: User
		chapters: Array<
			Chapter & {
				lessons: Array<Lesson>
			}
		>
	}
}
