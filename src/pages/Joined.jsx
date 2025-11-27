// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../provider/AuthContext";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";

// const Joined = () => {
//   const { user } = useContext(AuthContext);
//   const [joinedEvents, setJoinedEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:3000/joined?email=${user.email}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setJoinedEvents(data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error(err);
//           Swal.fire({
//             icon: "error",
//             title: "Failed to Load",
//             text: "Could not fetch joined events.",
//           });
//         });
//     }
//   }, [user]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//           className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full"
//         ></motion.div>
//       </div>
//     );
//   }

//   if (joinedEvents.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-2xl font-semibold text-gray-700"
//         >
//           You haven’t joined any events yet 🌱
//         </motion.h2>
//         <p className="text-gray-500 mt-2">
//           Explore upcoming events and join to make a difference!
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 mt-12">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-extrabold text-green-700 mb-8 text-center"
//       >
//         🌿 Joined Events
//       </motion.h1>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {joinedEvents.map((event) => (
//           <motion.div
//             key={event._id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="bg-white/60 backdrop-blur-md border border-green-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
//           >
//             <img
//               src={event.thumbnail || "https://i.ibb.co/yV1CgL9/eco-placeholder.jpg"}
//               alt={event.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-5">
//               <h2 className="text-xl font-bold text-green-700 mb-2">
//                 {event.title}
//               </h2>
//               <p className="text-gray-700 text-sm mb-3">
//                 {event.description?.slice(0, 100)}...
//               </p>
//               <div className="flex justify-between text-sm text-gray-600">
//                 <p>
//                   <span className="font-semibold">Date:</span>{" "}
//                   {event.date || "TBD"}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Location:</span>{" "}
//                   {event.location || "Unknown"}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Joined;



































import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link } from "react-router";

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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be removed from this event.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Leave",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e74c3c",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/events/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Removed!", "You left the event successfully.", "success");
              setJoinedEvents(joinedEvents.filter((e) => e._id !== id));
            } else {
              Swal.fire("Error", "Failed to remove event.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Could not connect to server.", "error");
          });
      }
    });
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <motion.div
  //         animate={{ rotate: 360 }}
  //         transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
  //         className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full"
  //       ></motion.div>
  //     </div>
  //   );
  // }

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
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {event.date || "TBD"}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {event.location || "Unknown"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                {/* Edit only if createdByEmail matches user */}
                {event.createdByEmail === user.email ? (
                  <Link
                    to={`/edit-event/${event._id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Edit
                  </Link>
                ) : (
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                  >
                    Leave
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Joined;
