import { TraktrAnalytics } from "$lib/analytics";

import { analytics } from '../../../stores';
import { get } from 'svelte/store';

const traktrInstance = "https://trktranalytics.eu.pythonanywhere.com";

export function initializeAnalytics() {
    analytics.set(new TraktrAnalytics(traktrInstance, "lexiquest_website"));

    // Send a heartbeat event every five seconds
    setInterval(function() {
        get(analytics).sendEvent({
            "type": "heartbeat",
            "data": {}
        });
    }, 5000);
}