import type { Prisma } from "@prisma/client";
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
    const locationData = JSON.parse(data.get("location") as string);

    const location =
      ({
        country: locationData.country,
        region: locationData.region,
        city: locationData.city,
      } as Prisma.JsonObject) ?? "";

    if (!emoji) return fail(400, { error: "Missing emoji" });

    try {
      await prismaClient.responses.create({
        data: {
          project_id: params.project,
          response: emoji,
          location,
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
