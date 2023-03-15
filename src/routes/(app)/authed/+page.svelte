<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
</script>

<!-- List all projects -->
<h1>Your Projects</h1>

{#each $page.data.projects as project}
  <a href="/authed/{project.id}" class="text-xl">{project.name}</a>
{:else}
  No projects found
{/each}

<!-- Create project -->
<form class="mt-4" use:enhance method="POST" action="?/createProject">
  <input type="text" name="name" placeholder="Project name" />
  <button>Create project</button>
</form>
