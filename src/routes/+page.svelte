<script>
    import { browser } from "$app/environment";

    // Redirect to the `/dictionary` page
    // We can't use an HTTP code to do this, as this site will
    // be hosted on a static webserver.
    if (browser) {
        window.location.assign("/dictionary");
    }
</script>