import ical from 'node-ical';

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
        const events = await ical.async.fromURL(url);
        
        return Object.values(events)
            .filter(event => event && event.type === 'VEVENT' && event.start && event.end)
            .map(event => {
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
