import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { prismaClient } from "$lib/server/prisma";

import { github } from "@lucia-auth/oauth/providers";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";

export const auth = lucia({
  adapter: prisma(prismaClient),
  env: dev ? "DEV" : "PROD",
  transformUserData: (userData) => ({
    userId: userData.id,
    email: userData.email,
    username: userData.username,
  }),
});

export const githubAuth = github(auth, {
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
});

export type Auth = typeof auth;
