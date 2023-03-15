declare global {
  /// <reference types="lucia-auth" />
  declare namespace Lucia {
    type Auth = import("$lib/server/lucia").Auth;
    type UserAttributes = {
      email: string | null;
      username: string;
    };
  }

  /// <reference types="@sveltejs/kit" />
  declare namespace App {
    interface Locals {
      validate: import("@lucia-auth/sveltekit").Validate;
      validateUser: import("@lucia-auth/sveltekit").ValidateUser;
      setSession: import("@lucia-auth/sveltekit").SetSession;
    }
    // interface Error {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
