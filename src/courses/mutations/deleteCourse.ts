import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteCourse = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteCourse),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const course = await db.course.deleteMany({ where: { id } });

    return course;
  }
);
