<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { toUTF8 } from "$lib/utils/base64";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  let checked = false;

  let title = "How are you feeling?";
  let thanks = "Thank you!";
  let submit = "Submit 🡢";
  let textColor = "black";

  let data: string | null = null;

  let loaded = false;

  onMount(async () => {
    const params = new URLSearchParams($page.url.searchParams);
    title = toUTF8(params.get("title")) || "How are you feeling?";
    thanks = toUTF8(params.get("thanks")) || "Thank you!";
    submit = toUTF8(params.get("submit")) || "Submit 🡢";
    textColor = toUTF8(params.get("textColor")) || "black";

    const res = await fetch("https://ipinfo.io/json?token=3bb80cfb79ef23");
    data = JSON.stringify(await res.json());

    loaded = true;
  });
</script>

{#if loaded}
  <div
    class="grid min-w-[16rem] min-h-[6rem] text-center place-items-center"
    style={`color: ${textColor};`}
  >
    {#if $page.form?.success}
      <h3>{thanks}</h3>
    {:else if $page.data.error}
      <h3>Nothing's here 🙃</h3>
    {:else}
      <h3>
        {title}
      </h3>
      <form method="POST" use:enhance>
        <div class="flex flex-row gap-2">
          <input
            type="radio"
            name="emoji"
            value="frown"
            class="frown"
            on:change={() => (checked = true)}
          />
          <input
            type="radio"
            name="emoji"
            value="neutral"
            class="neutral"
            on:change={() => (checked = true)}
          />
          <input
            type="radio"
            name="emoji"
            value="smile"
            class="smile"
            on:change={() => (checked = true)}
          />
        </div>

        <input type="hidden" name="location" value={data} />

        {#if checked}
          <input
            in:fly={{ duration: 250, y: 10 }}
            type="submit"
            value={submit}
            class="cursor-pointer"
          />
        {/if}
      </form>
    {/if}
  </div>
{/if}

<style lang="postcss">
  input[type="radio"] {
    @apply grayscale w-16 h-16 cursor-pointer appearance-none border-none transition-all duration-100 focus:outline-0 hover:scale-110;
  }

  .frown {
    background: url("/frown.svg") center;
    background-size: cover;
  }
  .neutral {
    background: url("/neutral.svg") center;
    background-size: cover;
  }
  .smile {
    background: url("/smile.svg") center;
    background-size: cover;
  }

  input[type="radio"]:hover,
  input[type="radio"]:checked {
    @apply grayscale-0;
  }
</style>
