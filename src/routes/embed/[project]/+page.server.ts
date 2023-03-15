import { prismaClient } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load = async ({ params }) => {
  const project = await prismaClient.projects.findUnique({
    where: {
      id: params.project,
    },
  });

  if (!project) {
    return { error: "Project not found" };
  }

  return {};
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();
    const emoji = data.get("emoji") as string;

    if (!emoji) return fail(400, { error: "Missing emoji" });

    try {
      await prismaClient.responses.create({
        data: {
          project_id: params.project,
          response: emoji,
        },
      });

      return {
        success: true,
      };
    } catch (e) {
      return fail(400, { error: "Error creating response" });
    }
  },
};
