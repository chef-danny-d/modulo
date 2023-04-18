import { useQuery } from '@blitzjs/rpc'
import { Prisma } from 'db'
import getCourseBySlug from '../queries/getCourseBySlug'

export const useCourse = (slug: string, args?: Prisma.CourseFindManyArgs) => {
	const [course] = useQuery(getCourseBySlug, {
		slug,
		...args,
	})
	return course
}
