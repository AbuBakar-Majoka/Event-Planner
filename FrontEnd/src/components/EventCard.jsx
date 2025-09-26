import { useNavigate } from "react-router";

const API_URL = "http://localhost:5000/api/events";

export default function EventCard({ event, fetchEvents }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    const res = await fetch(`${API_URL}/${event._id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.message || data.error);
    fetchEvents();
  };

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>
        {new Date(event.date).toLocaleDateString()} | {event.category}
      </p>
      <button onClick={() => navigate(`/add/${event._id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
