import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Upcoming = () => {
  const data = useLoaderData();
  const [searchData, setSearchData] = useState(data);
  const [eventType, setEventType] = useState("all");

  const handelSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    fetch(
      `http://localhost:3000/search?search=${search}&eventType=${eventType}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
      });
  };

  const handelFilter = (e) => {
    const type = e.target.value;
    setEventType(type);
    fetch(`http://localhost:3000/search?eventType=${type}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
      });
  };

  return (
    <div>
      <section className="py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 mt-12">
          Upcoming Events
        </h2>

        {/* 🔍 Search + Filter */}
        <form
          onSubmit={handelSearch}
          className="flex flex-col md:flex-row justify-center items-center gap-3 mb-10"
        >
          {/* Search */}
          <label className="input rounded-full flex items-center gap-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="flex-1 outline-none bg-transparent"
            />
          </label>

          {/* Filter Dropdown */}
          <select
            value={eventType}
            onChange={handelFilter}
            className="select select-bordered rounded-full"
          >
            <option value="all">All Event Types</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
            <option value="Blood Donation">Blood Donation</option>
            <option value="Awareness Campaign">Awareness Campaign</option>
          </select>

          <button className="btn btn-accent rounded-full">Search</button>
        </form>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {searchData?.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            >
              <img
                src={
                  event.thumbnail ||
                  "https://i.ibb.co/yV1CgL9/eco-placeholder.jpg"
                }
                alt={event.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl mb-1">{event.title}</h3>
                <p className="text-gray-500 mb-2">{event.location}</p>
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
