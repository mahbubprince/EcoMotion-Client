import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router"; 
import { AuthContext } from "../provider/AuthContext";

const CreateEvent = () => {
  const [eventDate, setEventDate] = useState(null);
  const [error, setError] = useState("");
  const navigate=useNavigate()
  const {user}=useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const eventType = form.eventType.value;
    const thumbnail = form.thumbnail.value;
    const location = form.location.value;
    

    if (!eventDate) {
      setError("Please select a valid future date.");
      return;
    }

    const newEvent = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      date: eventDate,
      createdByEmail:user?.email
    };

    fetch("https://ecomotion-server.vercel.app/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
    navigate('/upcoming')

      })
      .catch((error) => {
        console.log(error);
      });

    // console.log("Event Created:", newEvent);

    
    Swal.fire({
  icon: "success",
  title: "Event Created!",
  text: "Your event has been created successfully!",
  showConfirmButton: false,
  timer: 2000,
});
    form.reset();
    setEventDate(null);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white p-8 shadow-xl rounded-2xl border border-green-200"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Create a New Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Event Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter event title"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Describe your event..."
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-400"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Event Type */}
          <div>
            <label className="block font-semibold mb-1">Event Type</label>
            <select
              name="eventType"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select type</option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Donation">Donation</option>
              <option value="Blood Donation">Blood Donation</option>
              <option value="Awareness Campaign">Awareness Campaign</option>
            </select>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block font-semibold mb-1">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail"
              placeholder="Enter image URL"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Event location"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="block font-semibold mb-1">Event Date</label>
            <DatePicker
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              minDate={new Date()}
              placeholderText="Select event date"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {/* Submit */}
          <motion.button
          // onClick={() => navigate("/upcoming")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg text-lg font-semibold transition-all"
          >
            Create Event
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateEvent;
