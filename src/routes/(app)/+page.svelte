<script>
  import { getUser } from "@lucia-auth/sveltekit/client";
  const user = getUser();
</script>

<h1>Emoji Feedback</h1>
<p>Get feedback from emojis</p>

{#if $user}
  <a href="/authed">Go to dashboard</a>
{:else}
  <a href="/api/oauth?provider=github">Log in with Github</a>
{/if}
