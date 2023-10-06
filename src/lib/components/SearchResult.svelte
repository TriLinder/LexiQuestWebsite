<script lang="ts">
    export let word: string;
</script>

<style>
    .card {
        border-style: solid;
        border-radius: 10px;
        
        margin: 1em;
    }

    .word {
        text-align: center;
        margin-left: 0.3em;
        font-size: 2em;
    }
</style>

<div class="card">
    <p class="word">{word}</p>
</div>