import React, {  useState } from "react";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { Link } from "react-router";
// import { AuthContext } from "../provider/AuthContext";

const Upcoming = () => {
  const data = useLoaderData();
  const [searchData, setSearchData] = useState(data);
  // const {loading}=useContext(AuthContext)
  const handelSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    fetch(`http://localhost:3000/search?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchData(data);
      });

    // console.log(search);
  };
  // console.log(data);
  return (
    <div>
      {/* Upcoming Events Preview */}
      <section className="py-16 bg-gray-100 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 mt-12">
          Upcoming Events
        </h2>{" "}
        <form
          onSubmit={handelSearch}
          className="flex justify-center gap-2 my-5 mb-10 "
        >
          <label className="input rounded-full">
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
            <input type="search" name="search"  placeholder="Search" />
          </label>
          <button className="btn btn-accent rounded-full ">Search</button>
        </form>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {searchData?.map((event) => (
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
