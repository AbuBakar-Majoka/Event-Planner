import { useEffect, useState } from "react";
import EventList from "../components/EventList";
import { useNavigate } from "react-router";

const API_URL = "http://localhost:5000/api/events";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log("Data : ", data);
      setEvents(data || []);
      setError(false);
    } catch (error) {
      console.log("Error Fetching Events: ", error);
      setError(true);
      alert("Failed to Load Events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <h1>Event Manager</h1>
      <button onClick={() => navigate("/add")}>Add New Event</button>
      <div>
        {loading && <p>Loading events...</p>}

        {!loading && error && (
          <p style={{ color: "red" }}>
            Could not load events. Please try again later.
          </p>
        )}

        {!loading && !error && events.length === 0 && <p>No events found.</p>}

        {!loading && !error && events.length > 0 && (
          <EventList events={events} fetchEvents={fetchEvents} />
        )}
      </div>
    </>
  );
}
