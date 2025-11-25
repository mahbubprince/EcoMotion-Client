import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Joined = () => {
  const { user } = useContext(AuthContext);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/joined?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setJoinedEvents(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Failed to Load",
            text: "Could not fetch joined events.",
          });
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (joinedEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-gray-700"
        >
          You haven’t joined any events yet 🌱
        </motion.h2>
        <p className="text-gray-500 mt-2">
          Explore upcoming events and join to make a difference!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-green-700 mb-8 text-center"
      >
        🌿 Joined Events
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {joinedEvents.map((event) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/60 backdrop-blur-md border border-green-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <img
              src={event.thumbnail || "https://i.ibb.co/yV1CgL9/eco-placeholder.jpg"}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-bold text-green-700 mb-2">
                {event.title}
              </h2>
              <p className="text-gray-700 text-sm mb-3">
                {event.description?.slice(0, 100)}...
              </p>
              <div className="flex justify-between text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {event.date || "TBD"}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {event.location || "Unknown"}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Joined;
