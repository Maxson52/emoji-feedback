import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prismaClient } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals, params }) => {
  const session = await locals.validate();
  if (!session) throw redirect(302, "/");

  const project = await prismaClient.projects.findUnique({
    where: {
      id: params.project,
    },
    include: {
      responses: true,
    },
  });

  // Error if user doesn't own project
  if (!project || project.user_id !== session.userId) {
    throw redirect(302, "/authed");
  }

  return {
    project,
  };
};

export const actions: Actions = {
  deleteProject: async ({ locals, params }) => {
    const session = await locals.validate();
    if (!session) throw redirect(302, "/");

    try {
      await prismaClient.projects.delete({
        where: {
          id: params.project,
        },
      });

      return {};
    } catch (e) {
      return fail(400, { error: "Error deleting project" });
    }
  },

  deleteProjectResponses: async ({ locals, params }) => {
    const session = await locals.validate();
    if (!session) throw redirect(302, "/");

    try {
      await prismaClient.responses.deleteMany({
        where: {
          project_id: params.project,
        },
      });

      return {};
    } catch (e) {
      return fail(400, { error: "Error deleting responses" });
    }
  },
};
