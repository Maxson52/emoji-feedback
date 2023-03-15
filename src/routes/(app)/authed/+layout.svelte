<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  $: lastIndex = $page.url.href.lastIndexOf("/");
  $: lastPage = $page.url.href.substring(lastIndex, -1);
</script>

<aside
  class="flex flex-row place-items-center gap-4 absolute top-0 right-0 m-4"
>
  <a href={lastPage}>Back</a>
  <form use:enhance method="POST" action="/logout">
    <button>Log out</button>
  </form>
</aside>

<slot />
