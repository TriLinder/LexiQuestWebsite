<script lang="ts">
    import "@fontsource/open-sans";
    import SearchResult from "$lib/components/SearchResult.svelte";

    import { words } from "$lib/words";

    let searchQuery = "";
    $: searchedWords = searchWords(searchQuery);

    function searchWords(query: string): string[] {
        query = query.replace(/[^a-zA-Z0-9]/g, '');
        
        if (query.length < 3) {
            return [];
        }

        return words.filter((word) =>
            word.toLowerCase().startsWith(query.toLowerCase())
        ).sort((a, b) => a.length - b.length);
    }
</script>

<style>
    :root {
        --background: rgb(42, 42, 42);
        --primary: rgb(250, 250, 250);
    }

    :global(body) {
        background-color: var(--background);
    }

    .content {
        display: flex;
        justify-content: center;

        font-family: "Open Sans";
        font-size: 15px;
        color: var(--primary);
    }

    .center {
        text-align: center;
        width: 45vw;
    }

    .title {
        font-size: 3.5em;
    }

    .input {
        text-align: center;
        width: 50%;
    }
</style>

<div class="content">
    <div class="center">
        <h1 class="title">Search the LexiQuest dictionary</h1>
        
        <input class="input" type="text" bind:value={searchQuery}>

        {#each searchedWords as word}
            <SearchResult {word}/>
        {/each}
    </div>
</div>