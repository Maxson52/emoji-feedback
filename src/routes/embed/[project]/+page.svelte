<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";

  let checked = false;
</script>

<div class="grid w-64 min-h-[6rem] text-center place-items-center">
  {#if $page.form?.success}
    <h3>{$page.url.searchParams.get("thanks") ?? "Thank you!"}</h3>
  {:else if $page.data.error}
    <h3>Nothing's here 🙃</h3>
  {:else}
    <h3>
      {$page.url.searchParams.get("title") ?? "How are you feeling?"}
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

      {#if checked}
        <input
          in:fly={{ duration: 250, y: 10 }}
          type="submit"
          value="Submit 🡢"
          class="cursor-pointer"
        />
      {/if}
    </form>
  {/if}
</div>

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
