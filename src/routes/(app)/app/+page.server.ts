import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prismaClient } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.validate();
  if (!session) throw redirect(302, "/");

  const projects = await prismaClient.projects.findMany({
    where: {
      user_id: session.userId,
    },
  });

  return {
    projects,
  };
};

export const actions: Actions = {
  createProject: async ({ locals, request }) => {
    const session = await locals.validate();
    if (!session) throw redirect(302, "/");

    const data = await request.formData();
    const name = data.get("name") as string;

    if (!name) return fail(400, { error: "Missing name" });

    try {
      const newProject = await prismaClient.projects.create({
        data: {
          name: name,
          user_id: session.userId,
        },
      });

      return {};
    } catch (e) {
      return fail(400, { error: "Error creating project" });
    }
  },
};
