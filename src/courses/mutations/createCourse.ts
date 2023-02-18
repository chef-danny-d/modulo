import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateCourse = z.object({
  title: z.string(),
  summary: z.string(),
  slug: z.string(),
  image: z.string(),
  price: z.number(),
  duration: z.number(),
});

export default resolver.pipe(
  resolver.zod(CreateCourse),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const course = await db.course.create({ data: input });

    return course;
  }
);
