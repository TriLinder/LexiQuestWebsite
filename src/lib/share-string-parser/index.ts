import { parseVersion0ShareString } from "./version-0";
import type { Version0ShareData } from "./version-0";

export type ShareData = Version0ShareData;

export function parseShareString(shareString: string) {
    // Determine the version of the share string (an integer, seperated by a *)
    const version = Number.parseInt(shareString.split("*")[0]);

    if (version == 0) {
        return parseVersion0ShareString(shareString);
    }
    else {
        throw Error("Unsupported share string version provided!");
    }
}