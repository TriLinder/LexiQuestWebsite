<script lang="ts">
    import type { ShareData } from "$lib/share-string-parser";

    export let shareData: ShareData;

    $: messages = shareData.data.winnerStageFakePlayersMessage;
</script>

<style>
    .messages {
        font-size: 1.7em;
        width: 100%;
        text-align: center;
    }

    .first-message {
        margin-right: 8vw;
    }

    .second-message {
        margin-left: 8vw;
    }
</style>

{#if messages}
    <div class="messages">
        <p class="first-message"><i>"{messages.firstMessage}"</i></p>
        <p class="second-message"><i>"{messages.secondMessage}"</i></p>
    </div>
{/if}