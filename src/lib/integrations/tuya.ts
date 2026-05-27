import crypto from 'crypto';

/**
 * Tuya Smart Lock API Connector
 * Documentation: https://developer.tuya.com/en/docs/cloud/smart-lock-open-api
 */

export class TuyaConnector {
    private baseUrl = 'https://openapi.tuyaeu.com';
    private clientId: string;
    private clientSecret: string;
    private accessToken: string = '';
    private tokenExpiry: number = 0;

    constructor(clientId: string, clientSecret: string, region: 'eu' | 'us' | 'cn' = 'eu') {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        if (region === 'us') this.baseUrl = 'https://openapi.tuyaus.com';
        if (region === 'cn') this.baseUrl = 'https://openapi.tuyacn.com';
    }

    private encryptPassword(password: string, ticketKey: string): string {
        const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(ticketKey, 'utf8'), null);
        cipher.setAutoPadding(true);
        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted.toUpperCase();
    }

    private async request(method: string, path: string, body?: any) {
        const t = Date.now().toString();
        const nonce = '';
        
        let contentHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'; // SHA256 of empty string
        let bodyStr = '';
        if (body) {
            bodyStr = JSON.stringify(body);
            contentHash = crypto.createHash('sha256').update(bodyStr).digest('hex');
        }

        const stringToSign = `${method}\n${contentHash}\n\n${path}`;
        const strForSign = this.clientId + this.accessToken + t + nonce + stringToSign;
        const sign = crypto.createHmac('sha256', this.clientSecret).update(strForSign, 'utf8').digest('hex').toUpperCase();

        const headers: Record<string, string> = {
            'client_id': this.clientId,
            'sign': sign,
            'sign_method': 'HMAC-SHA256',
            't': t,
            'Content-Type': 'application/json',
        };

        if (this.accessToken) {
            headers['access_token'] = this.accessToken;
        }

        const response = await fetch(`${this.baseUrl}${path}`, {
            method,
            headers,
            body: body ? bodyStr : undefined,
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(`Tuya API Error (${data.code}): ${data.msg}`);
        }
        return data.result;
    }

    async getAccessToken() {
        if (this.accessToken && Date.now() < this.tokenExpiry) {
            return this.accessToken;
        }
        const result = await this.request('GET', '/v1.0/token?grant_type=1');
        this.accessToken = result.access_token;
        this.tokenExpiry = Date.now() + (result.expire_time * 1000) - 60000;
        return this.accessToken;
    }

    private async getPasswordTicket(deviceId: string) {
        return await this.request('POST', `/v1.0/devices/${deviceId}/door-lock/password-ticket`);
    }

    async generateTempCode(deviceId: string, password: string, name: string, start: Date, end: Date) {
        try {
            await this.getAccessToken();

            const ticket = await this.getPasswordTicket(deviceId);
            const ticketKey = ticket.ticket_key;
            const ticketId = ticket.ticket_id;

            const encryptedPassword = this.encryptPassword(password, ticketKey);

            const result = await this.request('POST', `/v1.0/devices/${deviceId}/door-lock/temp-password`, {
                password: encryptedPassword,
                ticket_id: ticketId,
                name: name,
                effective_time: Math.floor(start.getTime() / 1000),
                invalid_time: Math.floor(end.getTime() / 1000),
                password_type: 'ticket'
            });

            return {
                success: true,
                code: password,
                validFrom: start,
                validUntil: end,
                result
            };
        } catch (error) {
            console.error('[Tuya] Error generating code:', error);
            throw error;
        }
    }
}
