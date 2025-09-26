import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const API_URL = "http://localhost:5000/api/events";

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "work",
  });

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0]);

          setFormData({
            title: data[0].title,
            description: data[0].description,
            date: data[0].date.split("T")[0],
            category: data[0].category,
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Could not load event for editing.");
          navigate("/");
        });
    }
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = id ? `${API_URL}/${id}` : API_URL;
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Something went wrong");
        throw new Error(data.error);
      }

      alert(data.message);

      navigate("/");
    } catch (err) {
      alert(`Failed to ${id ? "update" : "create"} Event.`);
      console.log("Error: ", err);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>{id ? "Edit Event" : "Add Event"}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>
      <button type="submit">{id ? "Update Event" : "Create Event"}</button>
    </form>
  );
}
