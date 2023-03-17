<script lang="ts">
  import { page } from "$app/stores";
  import { toBase64 } from "$lib/utils/base64";
  import { copy } from "svelte-copy";

  // Handle iframe URL
  const baseUrl = `${$page.url.origin}/embed/${$page.data.project.id}`;

  let queries = {
    title: null,
    thanks: null,
    submit: null,
    textColor: null,
  };

  const query = new URLSearchParams("");
  let queryParams = "";

  $: queries.title
    ? query.set("title", toBase64(queries.title))
    : query.delete("title");
  $: queries.thanks
    ? query.set("thanks", toBase64(queries.thanks))
    : query.delete("thanks");
  $: queries.submit
    ? query.set("submit", toBase64(queries.submit))
    : query.delete("submit");
  $: queries.textColor
    ? query.set("textColor", toBase64(queries.textColor))
    : query.delete("textColor");
  $: queries, (queryParams = query.toString());

  // Handle advanced options
  let viewAdvanced = false;

  let userStyles = "";
  let height = "";
  let width = "";

  // Embed
  $: embed = `
    <iframe src="${baseUrl}?${queryParams}" title="${
    $page.data.project.name
  }" width="${width || "256px"}" height="${
    height || "170px"
  }" style="border: none;${userStyles}"></iframe>
    `;
</script>

<h1 class="mb-6">{$page.data.project.name}</h1>

<h3>Customize Your Embed:</h3>
<input
  type="text"
  name="title"
  placeholder="Enter title text (default: How are you feeling?)"
  bind:value={queries.title}
/>

<input
  type="text"
  name="thanks"
  placeholder="Enter thank you text (default: Thank you!)"
  bind:value={queries.thanks}
/>

<button on:click={() => (viewAdvanced = !viewAdvanced)}
  >{viewAdvanced ? "Hide" : "Show"} Advanced Options</button
>
{#if viewAdvanced}
  <input
    type="text"
    name="submit"
    placeholder="Enter submit button text (default: Submit 🡢)"
    bind:value={queries.submit}
  />

  <input
    type="text"
    name="textColor"
    placeholder="Enter text color (default: black, format: hex code, rgb, etc.)"
    bind:value={queries.textColor}
  />

  <input
    type="text"
    name="styles"
    placeholder="Enter additional css (default: null, format: inline css)"
    bind:value={userStyles}
  />

  <div class="flex gap-2">
    <input
      class="w-1/2"
      type="text"
      name="height"
      placeholder="Enter height (default: 170px)"
      bind:value={height}
    />
    <input
      class="w-1/2"
      type="text"
      name="width"
      placeholder="Enter width (default: 256px)"
      bind:value={width}
    />
  </div>
{/if}

<!-- Embed -->
<h3 class="my-4">
  Embed this link in your website to allow users to submit feedback:
  <a href={`${baseUrl}?${queryParams}`} target="_blank" rel="noreferrer">
    {$page.url.origin}/...
  </a>
  or
  <span class="text-blue-500 cursor-pointer" use:copy={embed}
    >click here copy iframe to clipboard</span
  >.
</h3>

<!-- TODO: add inputs for querys, custom categories, timestamps -->

<h3>Preview:</h3>
{@html embed}
