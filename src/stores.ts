import { writable } from "svelte/store";
import type { TraktrAnalytics } from "$lib/analytics";

export const analytics = writable<TraktrAnalytics>();