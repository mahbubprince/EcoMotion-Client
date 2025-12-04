
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthContext";

const Manage = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://ecomotion-server.vercel.app/manage?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setEvents(data));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Event?",
      text: "This will permanently delete the event!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e63946",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ecomotion-server.vercel.app/events/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", "Event removed successfully.", "success");
              setEvents(events.filter((e) => e._id !== id));
            } else {
              Swal.fire("Error", "Failed to delete event.", "error");
            }
          });
      }
    });
  };

  return (
    <div className="pt-24 px-5 max-w-6xl mx-auto mb-24">
      <title>Manage</title>
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Manage Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events created yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="backdrop-blur-xl bg-white/80 border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-48 w-full object-cover rounded-t-2xl"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  📍 {event.location}
                </p>
                <p className="text-gray-600 text-sm">
                  📅 {event.date}
                </p>

                <div className="flex justify-between items-center pt-4 border-t mt-4">
                  {event.createdByEmail === user.email && (
                    <Link
                      to={`/edit-event/${event._id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                  )}

                  {/* Delete (allowed for all events) */}
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Manage;
