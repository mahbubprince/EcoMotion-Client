import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [joining, setJoining] = useState(false);

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

  const handleJoinEvent = () => {
    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to join this event.",
        // confirmButtonText: "Go to Login",
      });
      return;
    }

    setJoining(true);

    fetch(`http://localhost:3000/join/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Joined Successfully!",
            text: "You’ve been added to this event.",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "Already Joined",
            text: "You’ve already joined this event!",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not join the event. Try again later.",
        });
      })
      .finally(() => setJoining(false));
  };

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
            onClick={handleJoinEvent}
            disabled={joining}
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
