interface RegisterRequest {
    application_name: string;
}

interface RegisterResponse {
    status: string;
    session_id: string;
}

interface EventRequest {
    application_name: string;
    session_id: string;
    event: AnalyticEvent;
}

export interface AnalyticEvent {
    type: string;
    data: unknown;
}

export class TraktrAnalytics {
    private serverUrl: string;
    private applicationName: string;

    private sessionId: string | undefined;
    private eventBuffer: AnalyticEvent[];

    constructor(serverUrl: string, applicationName: string) {
        this.serverUrl = serverUrl;
        this.applicationName = applicationName;

        this.sessionId = undefined;
        this.eventBuffer = [];

        this.register();
    }

    private async register() {
        // Hit the `/register` endpoint to register our session
        const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }

        const data: RegisterRequest = {
            'application_name': this.applicationName
        }

        const body = JSON.stringify(data);
        
        const response = await fetch(`${this.serverUrl}/register`, {method: 'POST', headers: headers, body: body});
        const json: RegisterResponse = await response.json();
        
        if (json.status == 'ok') {
            this.sessionId = json.session_id;
            this.sendBuffer();
        }
    }

    private async sendBuffer() {
        // Make sure we have a session ID
        if (!this.sessionId) {
            return;
        }
        
        // Copy the buffer
        const eventBufferCopy = structuredClone(this.eventBuffer);
        this.eventBuffer = [];

        // Send each event to the server
        for (const event of eventBufferCopy) {
            const headers = {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }

            const data: EventRequest = {
                'application_name': this.applicationName,
                'session_id': this.sessionId,
                'event': event
            }
            const body = JSON.stringify(data);

            await fetch(`${this.serverUrl}/event`, {method: 'POST', headers: headers, body: body});
        }
    }

    public sendEvent(event: AnalyticEvent) {
        // Add the event to the buffer
        this.eventBuffer.push(event);

        // Attempt to send the buffer (it'll silently fail if we don't have a session id)
        this.sendBuffer();
    }
}