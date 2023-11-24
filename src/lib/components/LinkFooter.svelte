<script lang="ts">
    export let showLinkToDictionaryPage = false;
</script>

<style>
    .footer {
        display: flex;
        width: 100%;
        justify-content: center;
        gap: 0.75em;
        font-size: 1.25em;
        flex-wrap: wrap;
    }

    a {
        color: inherit;
    }

    a:not(:last-child)::after {
        content: '';
        margin-left: 15px;

        border-left-style: solid;
        border-left-width: 0.15em;
    }

</style>

<p class="footer">
    {#if showLinkToDictionaryPage}
        <a href="/dictionary" target="_blank" rel="noopener noreferrer">Dictionary</a>
    {:else}
        <a href="/dictionary_readme" target="_blank" rel="noopener noreferrer">Dictionary information</a>
    {/if}

    <a href="/fonts/Minecraft.otf_LICENSE" target="_blank" rel="noopener noreferrer">Font</a>
    <a href="https://github.com/TriLinder/LexiQuestWebsite" target="_blank" rel="noopener noreferrer">Source code</a>
</p>