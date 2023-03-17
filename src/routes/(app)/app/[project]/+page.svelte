<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { copy } from "svelte-copy";
  import { onMount } from "svelte";

  $: responses = $page.data.project.responses.reduce(
    (sums: any, entry: any) => {
      sums[entry.response] = (sums[entry.response] || 0) + 1;
      return sums;
    },
    {}
  );

  import { Chart } from "chart.js/auto";
  let chart: HTMLCanvasElement;
  onMount(() => {
    // @ts-ignore
    new Chart(chart.getContext("2d"), {
      type: "pie",
      data: {
        labels: ["Smile", "Neutral", "Frown"],
        datasets: [
          {
            label: "Responses",
            data: [
              responses.smile ?? 0,
              responses.neutral ?? 0,
              responses.frown ?? 0,
            ],
            backgroundColor: ["#00BFA6", "#FFD600", "#DD2C00"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    });
  });
</script>

<div class="flex flex-col gap-4">
  <h1>{$page.data.project.name}</h1>

  <!-- Embed -->
  <h3>
    <a href={`/app/${$page.data.project.id}/share`}>Share or embed</a>
  </h3>
</div>

<!-- List responses -->
<div
  class="flex flex-col md:justify-center md:flex-row md:items-center md:gap-12"
>
  <div>
    <p><b>Total Responses:</b> {$page.data.project.responses.length}</p>
    <p><b>Smile:</b> {responses.smile ?? 0}</p>
    <p><b>Neutral:</b> {responses.neutral ?? 0}</p>
    <p><b>Frown:</b> {responses.frown ?? 0}</p>
  </div>

  <div class="h-64">
    <canvas bind:this={chart} />
  </div>
</div>

<!-- List table of responses -->
<table class="table-auto border mb-4">
  <thead class="text-left">
    <tr>
      <th>Response</th>
      <th>Timestamp</th>
      <th>Location</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {#each $page.data.project.responses as response}
      <tr class="odd:bg-slate-700">
        <td>{response.response}</td>
        <td>{new Date(response.timestamp).toLocaleString()}</td>
        <td
          >{response.location.region + ", " + response.location.country ??
            "Unknown"}</td
        >
        <td>
          <form
            use:enhance={({ cancel }) => {
              if (!confirm(`Are you sure you want to delete this response?`))
                cancel();
            }}
            method="POST"
            action="?/deleteResponse"
          >
            <input type="hidden" name="id" bind:value={response.id} />
            <button
              class="text-blue-500 hover:text-blue-600 bg-transparent p-0 hover:bg-transparent"
              >Delete</button
            >
          </form>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<!-- Create project -->
<div class="flex flex-col gap-2 md:flex-row">
  <form
    use:enhance={({ cancel }) => {
      if (
        !confirm(
          `Are you sure you want to delete ${$page.data.project.name} responses?`
        )
      )
        cancel();
    }}
    method="POST"
    action="?/deleteAllResponses"
  >
    <button class="bg-yellow-600 hover:bg-yellow-700"
      >Delete all project responses</button
    >
  </form>
  <form
    use:enhance={({ cancel }) => {
      if (
        !confirm(`Are you sure you want to delete ${$page.data.project.name}?`)
      )
        cancel();
    }}
    method="POST"
    action="?/deleteProject"
  >
    <button class="bg-red-500 hover:bg-red-600">Delete project</button>
  </form>
</div>

<style lang="postcss">
  td,
  th {
    @apply p-2 border-b;
  }
</style>
