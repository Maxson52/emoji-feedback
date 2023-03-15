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

  // Embed code
  const embed = `
  <iframe src="${$page.url.origin}/embed/${$page.data.project.id}" title="Test" width="306px" height="146px" style="border: none;"></iframe>
  `;
</script>

<section class="flex flex-col gap-6">
  <div class="flex flex-col gap-4">
    <h1>{$page.data.project.name}</h1>

    <!-- Embed -->
    <h3>
      Embed this link in your website to allow users to submit feedback:
      <a
        href={`${$page.url.origin}/embed/${$page.data.project.id}`}
        target="_blank"
        rel="noreferrer"
      >
        {$page.url.origin}/embed/{$page.data.project.id}
      </a>
      or
      <span class="text-blue-500 cursor-pointer" use:copy={embed}
        >copy iframe to clipboard</span
      >.
    </h3>

    <h6>
      Add use the <i>?title=</i> and <i>?thanks=</i> query parameters to customize
      the title and thank you message.
    </h6>
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

  <!-- Create project -->
  <div class="flex gap-2 flex-col md:flex-row">
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
      action="?/deleteProjectResponses"
    >
      <button class="bg-yellow-600 hover:bg-yellow-700"
        >Delete all project responses</button
      >
    </form>
    <form
      use:enhance={({ cancel }) => {
        if (
          !confirm(
            `Are you sure you want to delete ${$page.data.project.name}?`
          )
        )
          cancel();
      }}
      method="POST"
      action="?/deleteProject"
    >
      <button class="bg-red-500 hover:bg-red-600">Delete project</button>
    </form>
  </div>
</section>
