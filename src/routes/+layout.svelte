<script lang="ts">
    import { onMount } from 'svelte';

    // Analytics
    import { initializeAnalytics } from '$lib/utils/analytics';

    onMount(function() {
        initializeAnalytics();
    });
</script>

<slot/>