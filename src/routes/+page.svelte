<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { initializeAnalytics } from "$lib/utils/analytics";

    import { words } from "$lib/word-list/words";
    import SearchResult from "$lib/components/SearchResult.svelte";

    const minimalSearchQueryLength = 2;

    let searchQuery = "";
    $: searchedWords = searchWords(searchQuery);

    function searchWords(query: string): string[] {
        query = query.replace(/[^a-zA-Z0-9]/g, '');
        
        if (query.length < minimalSearchQueryLength) {
            return [];
        }

        return words.filter((word) =>
            word.toLowerCase().startsWith(query.toLowerCase())
        ).sort((a, b) => a.length - b.length);
    }

    onMount(function() {
        if (browser) {
            initializeAnalytics();
        }
    });
</script>

<style>
    @font-face {
        font-family: 'Minecraft';
        font-style: normal;
        src: url("/fonts/Minecraft.otf");
    }

    :root {
        --primary: rgb(250, 250, 250);
    }

    :global(body) {
        background-image: url("/background.png");
        background-size: cover;
    }

    .content {
        display: flex;
        justify-content: center;

        font-family: Minecraft;
        font-size: 15px;
        color: var(--primary);
    }

    .center {
        text-align: center;
        width: 50vw;
        height: 98vh;

        overflow-y: scroll;

        backdrop-filter: brightness(0.25) blur(0.3em);
    }

    @media (max-aspect-ratio: 25/16) {
        .center {
            width: 98vw;
        }
    }

    .title {
        font-size: 2.5em;
    }

    .input {
        text-align: left;
        width: 50%;
        height: 25px;

        padding: 0.5em;

        font-size: 25px;
        font-family: inherit;

        background-color: black;
        color: white;

        border-style: solid;
        border-color: gray;
    }

    .input:focus {
        border-color: white;
    }

    .info {
        font-size: 1.25em;
    }
</style>

<div class="content">
    <div class="center">
        <h1 class="title">Search the LexiQuest dictionary</h1>
        
        <input class="input" type="text" maxlength="20" placeholder="Search" bind:value={searchQuery}>

        {#each searchedWords as word}
            <SearchResult {word}/>
        {:else}
            {#if searchQuery.length < minimalSearchQueryLength}
                <p class="info">Please enter at least {minimalSearchQueryLength} characters.</p>
            {:else}
                <p class="info">No words found.</p>
            {/if}
        {/each}
    </div>
</div>