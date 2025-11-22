import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading event details...
      </div>
    );
  }

  if (!event || !event.title) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl font-bold">
        Event not found!
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-5 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-green-200"
      >
        {/* Thumbnail */}
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-72 w-full object-cover"
        />

        {/* Details */}
        <div className="p-8 space-y-4">
          <h2 className="text-3xl font-bold text-green-700">{event.title}</h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            {event.description}
          </p>

          <div className="flex flex-col gap-2 text-lg">
            <p>
              <span className="font-semibold text-green-700">Event Type:</span>{" "}
              {event.eventType}
            </p>

            <p>
              <span className="font-semibold text-green-700">Location:</span>{" "}
              {event.location}
            </p>

            <p>
              <span className="font-semibold text-green-700">Date:</span>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold"
          >
            Join Event
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;
