<script lang="ts">
    import { browser } from "$app/environment";
    import logo from "$lib/assets/logo.png";

    import { parseShareString } from "$lib/share-string-parser";
    import type { ShareData } from "$lib/share-string-parser";

    import GameBoard from "$lib/components/GameBoard.svelte";
    import PlayerLeaderboard from "$lib/components/PlayerLeaderboard.svelte";
    import GameSummaryText from "$lib/components/GameSummaryText.svelte";

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

        font-family: Minecraft;
        color: rgb(250, 250, 250);

        font-size: 1.5vh;
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

        backdrop-filter: brightness(0.25) blur(0.3em);
        border-radius: 0.3em;
    }

    @media (max-aspect-ratio: 25/16) {
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
        margin-top: 1.5vh;
        width: 65%;
        height: auto;
        image-rendering: pixelated;
    }

    .game-board {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .player-leaderboard {
        width: 75%;
    }

    .game-summary {
        text-align: center;
        font-size: 1.5em;
        margin: 0;
    }
</style>

{#if shareData}
    <div class="center">
        <div class="container">
            <div class="content">
                <img src={logo} alt="LexiQuest logo" class="header-logo">

                <h1>{shareData.data.players.toSorted((a, b) => b.score - a.score)[0].username}'s game of LexiQuest</h1>

                <div class="game-board">
                    <GameBoard {shareData}/>
                </div>

                <h1>Leaderboard</h1>

                <div class="player-leaderboard">
                    <PlayerLeaderboard {shareData}/>
                </div>

                <h1>Game summary</h1>

                <p class="game-summary">
                    <GameSummaryText {shareData}/>
                </p>
            </div>
        </div>
    </div>
{:else}
    <p>Loading..</p>
{/if}