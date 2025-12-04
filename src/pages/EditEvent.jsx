import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    eventType: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ecomotion-server.vercel.app/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`https://ecomotion-server.vercel.app/events/${id}`,
         {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    }
)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Event Updated Successfully!",
            timer: 1500,
          });
          navigate("/manage");
        }
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading event details...
      </div>
    );
  }

  return (
    <div className="pt-24 px-5 max-w-3xl mx-auto">
      <title>Edit-Event</title>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-bold text-center mb-10 text-gray-800"
      >
        Edit Event
      </motion.h1>

      <motion.form
        onSubmit={handleUpdate}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200"
      >
        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
            className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="font-semibold">Thumbnail URL</label>
          <input
            type="text"
            value={event.thumbnail}
            onChange={(e) => setEvent({ ...event, thumbnail: e.target.value })}
            className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            rows="4"
            value={event.description}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
            className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-400"
          ></textarea>
        </div>

        {/* Event Type */}
        <div>
          <label className="font-semibold">Event Type</label>
          <input
            type="text"
            value={event.eventType}
            onChange={(e) => setEvent({ ...event, eventType: e.target.value })}
            className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Location</label>
          <input
            type="text"
            value={event.location}
            onChange={(e) => setEvent({ ...event, location: e.target.value })}
            className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Date */}
        <div>
          <label className="font-semibold">Date</label>
          <input
            type="date"
            value={event.date}
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
            className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition-all text-white font-semibold p-3 rounded-lg"
        >
          Update Event
        </button>
      </motion.form>
    </div>
  );
};

export default EditEvent;
