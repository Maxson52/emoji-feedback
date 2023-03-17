<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { getUser } from "@lucia-auth/sveltekit/client";

  const user = getUser();

  $: lastIndex = $page.url.href.lastIndexOf("/");
  $: lastPage = $page.url.href.substring(lastIndex, -1);
</script>

<aside
  class="absolute top-0 right-0 z-10 flex flex-row gap-4 m-4 place-items-center"
>
  {#if $page.url.href.slice(0, -1) !== lastPage}
    <a href={lastPage}>Back</a>
  {/if}

  {#if $user}
    <a class="outlined-link" href="/app">Dashboard</a>
    <form use:enhance method="POST" action="/logout">
      <button>Log out</button>
    </form>
  {:else}
    <a class="solid-link" href="/api/oauth?provider=github"
      >Log in with Github</a
    >
  {/if}
</aside>

<main
  class="grid w-full min-h-screen p-4 overflow-x-hidden text-white place-items-center bg-slate-800"
>
  <div class="flex flex-col max-w-6xl min-w-full md:min-w-[50%] gap-2">
    <slot />
  </div>
</main>
