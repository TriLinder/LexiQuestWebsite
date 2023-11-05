<script lang="ts">
    import { browser } from "$app/environment";

    import { parseShareString } from "$lib/share-string-parser";
    import type { ShareData } from "$lib/share-string-parser";

    let shareData: ShareData;

    if (browser) {
        const shareLink = document.location.hash.slice(1);
        shareData = parseShareString(shareLink);
    }
</script>

{#if shareData}
    <code>
        {JSON.stringify(shareData)}
    </code>
{:else}
    <p>Loading..</p>
{/if}