<script lang="ts">
    import { browser } from "$app/environment";
    import logo from "$lib/assets/logo.png";

    import { parseShareString } from "$lib/share-string-parser";
    import type { ShareData } from "$lib/share-string-parser";

    import GameBoard from "$lib/components/GameBoard.svelte";

    let shareData: ShareData;

    if (browser) {
        const shareLink = document.location.hash.slice(1);
        shareData = parseShareString(shareLink);
    }
</script>

<style>
    @font-face {
        font-family: 'Minecraft';
        font-style: normal;
        src: url("/fonts/Minecraft.otf");
    }

    :global(body) {
        background-color: rgb(42, 42, 42);
        background-image: url("/background.png");
        background-size: cover;
        margin: 0;
    }

    .center {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
    }

    .container {
        display: flex;
        
        margin-top: 1vh;
        width: 50%;
        height: 98vh;
        overflow-y: scroll;

        justify-content: center;

        backdrop-filter: brightness(0.25);
        border-radius: 0.3em;
    }

    @media (max-aspect-ratio: 15/16) {
        .container {
            width: 95%;
        }
    }

    .content {
        display: flex;
        width: 100%;
        align-items: center;
        flex-direction: column;
    }

    .header-logo {
        margin-top: 13px;
        width: 30vw;
        height: 10vw;
        image-rendering: pixelated;
    }

    .game-board {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 1vh;
    }
</style>

{#if shareData}
    <div class="center">
        <div class="container">
            <div class="content">
                <img src={logo} alt="LexiQuest logo" class="header-logo">

                <div class="game-board">
                    <GameBoard {shareData}/>
                </div>
            </div>
        </div>
    </div>
{:else}
    <p>Loading..</p>
{/if}