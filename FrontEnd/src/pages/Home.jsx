import { useEffect, useState } from "react";
import EventList from "../components/EventList";
import { useNavigate } from "react-router";

const API_URL = "http://localhost:5000/api/events";

export default function Home() {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log("Data : ", data);
      setEvents(data || []);
    } catch (error) {
      console.log("Error Fetching Events: ", error);
      alert("Failed to Load Events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <h1>Event Manager</h1>
      <button onClick={() => navigate("/add")}>Add New Event</button>
      <EventList events={events} fetchEvents={fetchEvents} />
    </>
  );
}
