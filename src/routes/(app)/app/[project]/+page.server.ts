import { redirect, type Actions, fail } from "@sveltejs/kit";
import { prismaClient } from "$lib/server/prisma";

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

  deleteAllResponses: async ({ locals, params }) => {
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

  deleteResponse: async ({ locals, request }) => {
    const session = await locals.validate();
    if (!session) throw redirect(302, "/");

    const data = await request.formData();
    const id = data.get("id") as string;

    try {
      await prismaClient.responses.delete({
        where: {
          id,
        },
      });

      return {};
    } catch (e) {
      return fail(400, { error: "Error deleting response" });
    }
  },
};
