<script lang="ts">
    import { browser } from "$app/environment";
    import { get } from "svelte/store";
    import { analytics } from "../../stores";

    import { initializeAnalytics } from '$lib/utils/analytics';
    import { parseShareString } from "$lib/share-string-parser";
    import { prepareShareStringTelemetry } from "$lib/utils/analytics";
    import type { ShareData } from "$lib/share-string-parser";

    import logo from "$lib/assets/logo.png";
    import GameBoard from "$lib/components/GameBoard.svelte";
    import PlayerLeaderboard from "$lib/components/PlayerLeaderboard.svelte";
    import GameSummaryText from "$lib/components/GameSummaryText.svelte";
    import FakePlayerMessages from "$lib/components/FakePlayerMessages.svelte";

    let shareData: ShareData;

    if (browser) {        
        const shareLink = document.location.hash.slice(1);
        shareData = parseShareString(shareLink);

        const telemetryData = prepareShareStringTelemetry(shareData);
        
        if (telemetryData) {
            initializeAnalytics();

            get(analytics).sendEvent({
                "type": "telemetry",
                "data": {
                    "telemetryLevel": shareData.data.configuration.telemetryLevel,
                    "dataVersion": shareData.version,
                    "content": telemetryData
                }
            });
        }
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

    .loading-screen {
        position: absolute;
        
        left: 0;
        top: 0;
        
        width: 100%;
        height: 100%;

        background-color: black;

        display: flex;
        justify-content: center;
        align-items: center;
        
        font-size: 3vh;
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

    h1 {
        text-align: center;
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

<svelte:head>
    <title>Shared LexiQuest game</title>
    <meta name="darkreader-lock">
</svelte:head>

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

                <div class="fake-player-messages">
                    <FakePlayerMessages {shareData}/>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="loading-screen">
        <h1>LOADING..</h1>
    </div>
{/if}