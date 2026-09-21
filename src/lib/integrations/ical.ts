function isAllowedAirbnbCalendarUrl(rawUrl: string): boolean {
    try {
        const url = new URL(rawUrl);
        if (url.protocol !== 'https:') return false;

        const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
        const isAirbnbHost = /^airbnb\.(com|[a-z]{2,3}|co\.[a-z]{2}|com\.[a-z]{2})$/.test(hostname);
        if (!isAirbnbHost) return false;

        return url.pathname.includes('/calendar/ical/') && url.pathname.endsWith('.ics');
    } catch {
        return false;
    }
}

export interface BookingEvent {
    summary: string;
    start: Date;
    end: Date;
    uid: string;
    description?: string;
    guestName?: string;
}

/**
 * Parses an Airbnb iCal URL and returns a list of booking events.
 * Airbnb iCal usually has the guest name in the summary: "Reserved - Guest Name"
 */
export async function parseAirbnbCalendar(url: string): Promise<BookingEvent[]> {
    try {
        if (!isAllowedAirbnbCalendarUrl(url)) {
            throw new Error('Invalid Airbnb calendar URL');
        }

        const ical = await import('node-ical');
        const events = await ical.async.fromURL(url);
        
        const now = new Date();
        
        return Object.values(events)
            .filter(event => event && event.type === 'VEVENT' && event.start && event.end)
            .filter((event: any) => new Date(event.end) > now)
            .map((event: any) => {
                const summary = (event.summary as string) || '';
                // Airbnb format: "Reserved - Name" or "Airbnb (Not available)"
                let guestName = 'Guest';
                if (summary.includes(' - ')) {
                    guestName = summary.split(' - ')[1];
                }

                return {
                    summary,
                    start: new Date(event.start as Date),
                    end: new Date(event.end as Date),
                    uid: (event.uid as string) || Math.random().toString(36),
                    description: (event.description as string) || '',
                    guestName
                };
            });
    } catch (error) {
        console.error('[iCal] Error parsing feed:', error);
        throw new Error('Failed to parse iCal feed');
    }
}


export { isAllowedAirbnbCalendarUrl };
