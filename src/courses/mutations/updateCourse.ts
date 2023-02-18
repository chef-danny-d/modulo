import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateCourse = z.object({
  id: z.number(),
  title: z.optional(z.string()),
  summary: z.optional(z.string()),
  slug: z.optional(z.string()),
  image: z.optional(z.string()),
  price: z.optional(z.number()),
  duration: z.optional(z.number()),
});

export default resolver.pipe(
  resolver.zod(UpdateCourse),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const course = await db.course.update({ where: { id }, data });

    return course;
  }
);
