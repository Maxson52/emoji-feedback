<script>
  import "../app.postcss";
  import { page } from "$app/stores";
  import { handleSession } from "@lucia-auth/sveltekit/client";

  handleSession(page);
</script>

<svelte:head>
  <title>{$page.data.title ?? "Emoji Feedback"}</title>
</svelte:head>

<slot />
