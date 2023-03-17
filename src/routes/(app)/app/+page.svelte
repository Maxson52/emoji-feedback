<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
</script>

<!-- List all projects -->
<h1>Your Projects</h1>

{#each $page.data.projects as project}
  <a href="/app/{project.id}" class="text-xl">{project.name}</a>
{:else}
  No projects found
{/each}

<!-- Create project -->
<form
  class="flex flex-col md:flex-row gap-1 w-full mt-4"
  use:enhance
  method="POST"
  action="?/createProject"
>
  <input class="flex-1" type="text" name="name" placeholder="Project name" />
  <button>Create project</button>
</form>
