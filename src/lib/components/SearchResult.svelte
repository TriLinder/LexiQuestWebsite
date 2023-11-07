<script lang="ts">
    import { letterValues } from "$lib/word-list/letter-values";

    export let word: string;

    function calculateWordScore(word: string): number {
        word = word.toLowerCase();
        
        let score = 0;

        for (const letter of word) {
            score += letterValues[letter];
        }

        return score;
    }

    $: score = calculateWordScore(word);
    $: definitionLink = `https://www.merriam-webster.com/dictionary/${word}`;
</script>

<style>
    .card {
        border-style: solid;
        border-radius: 0.5em;
        
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin: 1em;
        padding: 0.5em;

        text-align: left;
    }

    .word {
        font-size: 1.75em;
        text-transform: uppercase;
    }

    a {
        color: inherit;
    }

    .definition-link {
        text-align: right;
    }

    @media (max-aspect-ratio: 25/16) {
        .definition-link {
            display: none;
        }
    }
</style>

<div class="card">
    <div>
        <span class="word">{word}</span> <br>
        <span class="score">Score: {score} points</span>
    </div>

    <span class="definition-link"><a href={definitionLink} target="_blank" rel="noopener noreferrer">See definition</a></span>
</div>