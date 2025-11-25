import React from "react";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Upcoming = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      {/* Upcoming Events Preview */}
      <section className="py-16 bg-gray-100 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 mt-12">
          Upcoming Events
        </h2>{" "}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {data?.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            >
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl mb-1">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.location}</p>
                <p className="text-green-600 font-semibold mb-2">
                  {event.eventType}
                </p>
                <p className="text-gray-500 mb-4">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <Link
                  to={`/eventDetailes/${event._id}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all font-medium"
                >
                  View Event
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Upcoming;
