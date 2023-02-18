import { useQuery } from "@blitzjs/rpc"
import getCourses from '../queries/getCourses'
import { Prisma } from "db"

export const useCourses = (args?: Prisma.CourseFindManyArgs) => {
  const [courses] = useQuery(getCourses, {
    ...args
  })
  return courses
}
