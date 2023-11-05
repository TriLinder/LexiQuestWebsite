<script lang="ts">
    import type { ShareData } from "$lib/share-string-parser";
    import PlayerHead from "./PlayerHead.svelte";

    export let shareData: ShareData;
    
    $: sortedPlayers = shareData.data.players.toSorted((a, b) => b.score - a.score);
</script>

<style>
    .leaderboard {
        display: flex;
        flex-direction: column;
        gap: 1.5vh;
    }

    .player {
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-size: 3vh;

        border-style: solid;
        border-radius: 0.1em;
        border-width: 0.15em;
        padding: 0.3vw;
    }

    .player-info {
        display: flex;
        width: 75%;
        gap: 0.75vw;
    }

    .player-head {
        margin-right: 0.75vw;
    }

    @media (max-aspect-ratio: 25/16) {
        .player-head {
            display: none;
        }
    }

    .winner {
        background-color: rgba(0, 255, 0, 0.3)    
    }
</style>

<div class="leaderboard">
    {#each sortedPlayers as player, index}
        <div class="player" class:winner={index == 0}>
            <div class="player-info">
                <span>{index + 1}.</span>
                
                <div class="player-head">
                    <PlayerHead {player}/>
                </div>

                <span>{player.username}</span>
                
                {#if index == 0}
                    <span>🏆</span>
                {/if}
            </div>

            <span>{player.score} points</span>
        </div>
    {/each}
</div>