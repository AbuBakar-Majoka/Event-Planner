import EventCard from "./EventCard";

export default function EventList({ events, fetchEvents }) {
  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event._id} event={event} fetchEvents={fetchEvents} />
      ))}
    </div>
  );
}
