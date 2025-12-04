// import React, { useState } from "react";
// import { useLoaderData } from "react-router";
// import { motion } from "framer-motion";
// import { Link } from "react-router";

// const Upcoming = () => {
//   const data = useLoaderData();
//   const [searchData, setSearchData] = useState(data);
//   const [eventType, setEventType] = useState("all");

//   const handelSearch = (e) => {
//     e.preventDefault();
//     const search = e.target.search.value;
//     fetch(
//       `http://localhost:3000/search?search=${search}&eventType=${eventType}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setSearchData(data);
//       });
//   };

//   const handelFilter = (e) => {
//     const type = e.target.value;
//     setEventType(type);
//     fetch(`http://localhost:3000/search?eventType=${type}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setSearchData(data);
//       });
//   };

//   return (
//     <div>
//       <section className="py-16 px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 mt-12">
//           Upcoming Events
//         </h2>

//         {/* 🔍 Search + Filter */}
//         <form
//           onSubmit={handelSearch}
//           className="flex flex-col md:flex-row justify-center items-center gap-3 mb-10"
//         >
//           {/* Search */}
//           <label className="input rounded-full flex items-center gap-2">
//             <svg
//               className="h-[1em] opacity-50"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//             >
//               <g
//                 strokeLinejoin="round"
//                 strokeLinecap="round"
//                 strokeWidth="2.5"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <circle cx="11" cy="11" r="8"></circle>
//                 <path d="m21 21-4.3-4.3"></path>
//               </g>
//             </svg>
//             <input
//               type="search"
//               name="search"
//               placeholder="Search"
//               className="flex-1 outline-none bg-transparent"
//             />
//           </label>

//           {/* Filter Dropdown */}
//           <select
//             value={eventType}
//             onChange={handelFilter}
//             className="select select-bordered rounded-full"
//           >
//             <option value="all">All Event Types</option>
//             <option value="Cleanup">Cleanup</option>
//             <option value="Plantation">Plantation</option>
//             <option value="Donation">Donation</option>
//             <option value="Blood Donation">Blood Donation</option>
//             <option value="Awareness Campaign">Awareness Campaign</option>
//           </select>

//           <button className="btn btn-accent rounded-full">Search</button>
//         </form>

//         {/* Events Grid */}
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//           {searchData?.map((event) => (
//             <motion.div
//               key={event._id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               className="rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
//             >
//               <img
//                 src={
//                   event.thumbnail ||
//                   "https://i.ibb.co/yV1CgL9/eco-placeholder.jpg"
//                 }
//                 alt={event.title}
//                 className="h-48 w-full object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="font-bold text-xl mb-1">{event.title}</h3>
//                 <p className="text-gray-500 mb-2">{event.location}</p>
//                 <p className="text-green-600 font-semibold mb-2">
//                   {event.eventType}
//                 </p>
//                 <p className="text-gray-500 mb-4">
//                   {new Date(event.date).toLocaleDateString()}
//                 </p>
//                 <Link
//                   to={`/eventDetailes/${event._id}`}
//                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all font-medium"
//                 >
//                   View Event
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Upcoming;









import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Upcoming = () => {
  const data = useLoaderData();
  const [searchData, setSearchData] = useState(data);
  const [eventType, setEventType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // 🔍 Search Handler
  const handelSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/search?search=${search}&eventType=${eventType}`
      );
      const data = await res.json();
      setSearchData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Filter Handler
  const handelFilter = async (e) => {
    const type = e.target.value;
    setEventType(type);
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/search?search=${search}&eventType=${type}`
      );
      const data = await res.json();
      setSearchData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="py-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 mt-12 text-green-700"
        >
          Upcoming Events
        </motion.h2>

        {/* 🔍 Search + Filter Section */}
        <motion.form
          onSubmit={handelSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-center items-center gap-3 mb-10"
        >
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events by title..."
              className="w-full border-2 border-green-300 rounded-full py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all"
            />
            <svg
              className="absolute left-4 top-3.5 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
              />
            </svg>
          </div>

          {/* Filter Dropdown */}
          <select
            value={eventType}
            onChange={handelFilter}
            className="border-2 border-green-300 rounded-full px-6 py-3 bg-white text-gray-700 focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all"
          >
            <option value="all">All Event Types</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
            <option value="Blood Donation">Blood Donation</option>
            <option value="Awareness Campaign">Awareness Campaign</option>
          </select>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Search
          </button>
        </motion.form>

        {/* 🌀 Loading State */}
        {loading && (
          <div className="flex justify-center my-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full"
            />
          </div>
        )}

        
        {!loading && searchData?.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 text-lg mt-10"
          >
            😔 No events found matching your search or filter.
          </motion.p>
        )}

        {/* 🌿 Events Grid */}
        {!loading && searchData?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {searchData.map((event) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl shadow-lg overflow-hidden hover:shadow-2xl bg-white/90 border border-green-200 hover:scale-[1.02] transition-all"
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
                  <h3 className="font-bold text-xl mb-1 text-green-700">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{event.location}</p>
                  <p className="text-green-600 font-semibold mb-2">
                    {event.eventType}
                  </p>
                  <p className="text-gray-500 mb-4">
                    📅 {new Date(event.date).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/eventDetailes/${event._id}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all font-medium block text-center"
                  >
                    View Event
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Upcoming;
