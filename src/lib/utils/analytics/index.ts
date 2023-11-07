import { TraktrAnalytics } from "$lib/analytics";
import { analytics } from '../../../stores';
import { get } from 'svelte/store';

import type { ShareData } from "$lib/share-string-parser";

const traktrInstance = "https://trktranalytics.eu.pythonanywhere.com";

export function prepareShareStringTelemetry(shareData: ShareData) {
    // Send data based on the telemetry level
    switch (shareData.data.configuration.telemetryLevel) {
        case 0:
            console.log("Telemetry disabled for this link (level 0)");
            return null;
        case 1:
            console.log("Sending telemetry level 1");
            
            // Telemetry level 1 should include only basic
            // pseudo-anonymous statistics.
            
            // Include the whole statistics section, the data version
            // and player capes (to get to known the general player base)

            let capes: string[] = [];

            for (const player of shareData.data.players) {
                if (player.textures.cape) {
                    if (!capes.includes(player.textures.cape)) {
                        capes.push(player.textures.cape);
                    }
                }
            }
            
            return {
                statistics: shareData.data.statistics,
                playerCapes: capes
            };
        case 2:
            console.log("Sending telemetry level 2");

            // Telemetry level 2 includes all data.

            return {
                parsedShareData: shareData,
                shareString: window.location.hash.slice(1)
            };
        default:
            throw Error("Invalid telemetry level!");
    }
}

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