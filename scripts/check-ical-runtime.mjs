import ical from "node-ical";

const source = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Maplyo//iCal smoke test//EN
BEGIN:VEVENT
UID:maplyo-smoke-1
DTSTART:20270101T140000Z
DTEND:20270103T100000Z
SUMMARY:Reserved - Test Guest
END:VEVENT
END:VCALENDAR`;

const parsed = ical.sync.parseICS(source);
const event = parsed["maplyo-smoke-1"];

if (!event || event.type !== "VEVENT") {
  throw new Error("node-ical smoke test did not return the expected VEVENT");
}

if (!(event.start instanceof Date) || !(event.end instanceof Date)) {
  throw new Error("node-ical smoke test returned invalid event dates");
}

console.log("node-ical runtime smoke test passed without JSBI/BigInt errors.");
