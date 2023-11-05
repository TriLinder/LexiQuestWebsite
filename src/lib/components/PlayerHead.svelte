<script lang="ts">
    import { onMount } from "svelte";
    import type { PlayerData } from "$lib/share-string-parser";

    export let player: PlayerData;
    let canvasElement: HTMLCanvasElement;

    function load() {
        // First fill the canvas with white as a placeholder
        const ctx = canvasElement.getContext("2d")!;

        canvasElement.width = 8;
        canvasElement.height = 8;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasElement.width, canvasElement.height)

        // Create a new image element and load the
        // player's skin into it
        const img = document.createElement("img");
        img.src = player.textures.skin.texture;

        // Once we load the image, draw it onto the canvas with an offsets to
        // cut out parts of the image
        img.onload = function() {
            // Draw the base body layer
            ctx.drawImage(img, -8, -8);

            // Now draw the second (outer) layer
            ctx.drawImage(img, -40, -8);
        }
    }

    onMount(load);
</script>

<style>
    canvas {
        display: inline;
        height: 100%;
        image-rendering: pixelated;
    }
</style>

<canvas bind:this={canvasElement}/>