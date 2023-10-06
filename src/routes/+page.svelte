<script lang="ts">
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

<input type="text" bind:value={searchQuery}>

{#each searchedWords as word}
    <p>{word}</p>
{/each}