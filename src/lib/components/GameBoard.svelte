<script lang="ts">
    import { onMount } from "svelte";
    import type { ShareData, BoardTile } from "$lib/share-string-parser";
    
    export let shareData: ShareData;

    let mainCanvas: HTMLCanvasElement;

    function drawTile(tile: BoardTile) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        canvas.width = 128;
        canvas.height = canvas.width;

        // Draw background
        switch(tile.type) {
            case "centerTile":
                ctx.fillStyle = "rgb(240, 190, 75)";
                break;
            case "doubleLetterScore":
                ctx.fillStyle = "rgb(75, 140, 235)";
                break;
            case "tripleLetterScore":
                ctx.fillStyle = "rgb(235, 155, 75)";
                break;
            case "plusThreeScore":
                ctx.fillStyle = "rgb(123, 240, 75)";
                break;
            case "plusEightScore":
                ctx.fillStyle = "rgb(235, 88, 75)";
                break;
            default:
                ctx.fillStyle = "rgb(250, 250, 250)";
                break;
        }
        
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw outline
        if (tile.type != "filled") {
            ctx.fillStyle = "black";
            ctx.lineWidth = 6;
            ctx.strokeRect(7, 7, 128 - 14, 128 - 14);
        }

        // Draw text
        let text: string;
        
        switch(tile.type) {
            case "centerTile":
                text = "+"
                break;
            case "doubleLetterScore":
                text = "2L";
                break;
            case "tripleLetterScore":
                text = "3L";
                break;
            case "plusThreeScore":
                text = "+3";
                break;
            case "plusEightScore":
                text = "+8";
                break;
            case "filled":
                text = tile.letter!.toUpperCase();
                break;
            default:
                text = "";
                break;
        }

        ctx.fillStyle = "black";
        ctx.font = "70px Minecraft";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(text, 128 / 2, 128 / 2);

        return canvas;
    }

    function drawBoardToCanvas(canvas: HTMLCanvasElement) {
        const rowLength = shareData.data.boardState.rows[0].length;

        mainCanvas.width = rowLength * 128;
        mainCanvas.height = mainCanvas.width;

        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

        for (let y = 0; y < rowLength; y++) {
            for (let x = 0; x < rowLength; x++) {
                const tile = shareData.data.boardState.rows[y][x];
                ctx.drawImage(drawTile(tile), x * 128, y * 128);
            }
        }
    }

    onMount(function() {
        drawBoardToCanvas(mainCanvas);
    });

    document.fonts.ready.then(function() {
        drawBoardToCanvas(mainCanvas);
    });
</script>

<style>
    canvas {
        width: 95%;
        image-rendering: pixelated;
    }
</style>

<canvas bind:this={mainCanvas}/>