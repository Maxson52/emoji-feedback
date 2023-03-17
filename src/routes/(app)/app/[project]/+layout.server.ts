import { prismaClient } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, params }) => {
  const session = await locals.validate();

  const project = await prismaClient.projects.findUnique({
    where: {
      id: params.project,
    },
    include: {
      responses: {
        orderBy: {
          timestamp: "desc",
        },
      },
    },
  });

  // Error if user doesn't own project
  if (!project || project.user_id !== session?.userId) {
    throw redirect(302, "/app");
  }

  return {
    project,
  };
};
