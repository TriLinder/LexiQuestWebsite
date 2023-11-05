<script lang="ts">
    import type { ShareData } from "$lib/share-string-parser";

    export let shareData: ShareData;
    
    let gameLengthString: string

    $: gameLengthInSeconds = shareData.data.statistics.game.lengthInMiliseconds / 1000;
    
    $: if (gameLengthInSeconds < 60) {
        gameLengthString = `${Math.floor(gameLengthInSeconds)} seconds`;
    } else {
        gameLengthString = `${Math.floor(gameLengthInSeconds / 60)}:${Math.floor(gameLengthInSeconds % 60)} minutes`;
    }

    $: winningPlayer = shareData.data.players.toSorted((a, b) => b.score - a.score)[0];
</script>

The game lasted {gameLengthString} with a total of {shareData.data.statistics.game.turns} turns. <br>
{winningPlayer.username} won the game with {winningPlayer.score} points.