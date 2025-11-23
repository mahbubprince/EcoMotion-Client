// import React from "react";
// import { useLoaderData } from "react-router";
// import { motion } from "framer-motion";
// import { Link } from "react-router";

// const features = [
//   {
//     title: "Join Local Events",
//     description: "Participate in community-driven initiatives near you.",
//     icon: "🌱",
//   },
//   {
//     title: "Create Your Event",
//     description: "Host eco-friendly and social development events easily.",
//     icon: "📝",
//   },
//   {
//     title: "Track Your Impact",
//     description: "See the difference you make through your contributions.",
//     icon: "📊",
//   },
// ];

// const Home = () => {
//   const data = useLoaderData();
//   console.log(data);

//   return (
//     <div className="mt-16">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-br from-green-200 via-green-400 to-blue-300 text-white h-screen flex flex-col justify-center items-center text-center px-4">
//         <motion.h1
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="text-4xl md:text-6xl font-extrabold mb-4"
//         >
//           Step Forward. Make a Difference.
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 1 }}
//           className="text-lg md:text-2xl mb-8 max-w-2xl"
//         >
//           Join local social and environmental events, contribute to your
//           community, and track your impact.
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 1 }}
//         >
//           <Link
//             to="/upcoming"
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all text-lg"
//           >
//             Explore Events
//           </Link>
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-white text-gray-800 px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//           Why EcoMotion?
//         </h2>
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.2 }}
//               className="bg-green-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all text-center"
//             >
//               <div className="text-5xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Upcoming Events Preview */}
//        section className="py-16 bg-gray-100 px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//           Upcoming Events
//         </h2>
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//           {data?.map((event) => (
//             <motion.div
//               key={event._id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
//             >
//               <img
//                 src={event.thumbnail}
//                 alt={event.title}
//                 className="h-48 w-full object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="font-bold text-xl mb-1">{event.title}</h3>
//                 <p className="text-gray-600 mb-2">{event.location}</p>
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

//       {/* Newsletter Section */}
//       <section className="py-16 bg-green-600 text-white px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
//           Stay Updated
//         </h2>
//         <p className="text-center mb-8">
//           Subscribe to our newsletter for the latest events and updates.
//         </p>
//         <div className="max-w-lg mx-auto flex flex-col md:flex-row gap-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="px-4 py-3 rounded-full text-gray-800 flex-1 focus:outline-none"
//           />
//           <button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
//             Subscribe
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { Link } from "react-router";

const features = [
  {
    title: "Join Local Events",
    description: "Participate in community-driven eco & social initiatives.",
    icon: "🌿",
  },
  {
    title: "Create Your Own Event",
    description: "Host environmental or social development events easily.",
    icon: "📝",
  },
  {
    title: "Track Your Impact",
    description: "Visualize the positive change you bring to the community.",
    icon: "📊",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1543351611-58f69d4f6caa",
  "https://images.unsplash.com/photo-1536608856998-8d8d73a6dc83",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
  "https://images.unsplash.com/photo-1523978591478-c753949ff840",
];

const Home = () => {
  const {result} = useLoaderData();
  console.log(result)

  return (
    <div className="mt-16">
      {/* =============================== */}
      {/* 🌟 HERO / BANNER SECTION */}
      {/* =============================== */}
      <section className="relative h-screen bg-gradient-to-br from-green-300 via-green-500 to-green-700 text-white flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Background leaf pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"
        />

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold drop-shadow-xl"
        >
          Step Forward. Make a Difference.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-2xl mt-6 max-w-2xl opacity-90"
        >
          Join impactful environmental & community events, connect with people,
          and contribute to a better tomorrow.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-10"
        >
          <Link
            to="/upcoming"
            className="relative bg-white text-green-700 font-bold px-10 py-4 rounded-full shadow-xl text-lg overflow-hidden inline-block"
          >
            {/* Glow effect */}
            <motion.span
              initial={{ x: "-150%" }}
              whileHover={{ x: "150%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-white/40 rounded-full blur-xl"
            />
            Explore Events
          </Link>
        </motion.div>
      </section>

      {/* =============================== */}
      {/* 🌱 FEATURE SECTION */}
      {/* =============================== */}
      <section className="py-20 bg-white text-gray-800 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Why EcoMotion?</h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all flex flex-col items-center text-center"
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =============================== */}
      {/* 📸 GALLERY SECTION */}
      {/* =============================== */}
      <section className="py-20 bg-gray-100 px-6">
        <h2 className="text-4xl font-bold text-center mb-14">
          Moments from Our Community
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt="Gallery"
              className="rounded-xl shadow-lg object-cover h-56 w-full hover:scale-[1.03] transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
          ))}
        </div>
      </section>

      {/* latest Events Preview */}
      <section className="py-16 bg-gray-100 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Latest Events
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {result.map((event) => (
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

      {/* =============================== */}
      {/* 📨 NEWSLETTER SECTION */}
      {/* =============================== */}
      
    </div>
  );
};

export default Home;
