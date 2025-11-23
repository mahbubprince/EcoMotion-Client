// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import Swal from "sweetalert2";

// const Manage = () => {
//   const [events, setEvents] = useState([]);

//   // Fetch all events created by this user
//   useEffect(() => {
//     fetch("http://localhost:3000/events")
//       .then(res => res.json())
//       .then(data => setEvents(data));
//   }, []);

//   // Delete event
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete the event!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Delete",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`http://localhost:5000/events/${id}`, {
//           method: "DELETE",
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.deletedCount > 0) {
//               Swal.fire("Deleted!", "Event removed successfully.", "success");
//               setEvents(events.filter((e) => e._id !== id));
//             }
//           });
//       }
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-20 px-4">
//       <h1 className="text-4xl font-bold mb-8 text-center">Manage Your Events</h1>

//       {events.length === 0 ? (
//         <p className="text-center text-gray-500">No events found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {events.map((event) => (
//             <div
//               key={event._id}
//               className="bg-white shadow-xl rounded-xl overflow-hidden group hover:shadow-2xl transition-all"
//             >
//               <img
//                 src={event.thumbnail}
//                 alt={event.title}
//                 className="h-48 w-full object-cover group-hover:scale-105 transition-all"
//               />

//               <div className="p-4">
//                 <h2 className="text-xl font-semibold">{event.title}</h2>
//                 <p className="text-gray-600 mt-1">
//                   {event.location} • {event.date}
//                 </p>

//                 <div className="flex justify-between items-center mt-4">
//                   {/* Edit */}
//                   <Link to={`/edit-event/${event._id}`}>
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                       Edit
//                     </button>
//                   </Link>

//                   {/* Delete */}
//                   <button
//                     onClick={() => handleDelete(event._id)}
//                     className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Manage;












import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Event?",
      text: "This event will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e63946",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/events/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Event removed.", "success");
              setEvents(events.filter((e) => e._id !== id));
            // }
          });
      }
    });
  };

  return (
    <div className="pt-24 px-5 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Manage Your Events
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
              <div className="relative">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="h-48 w-full object-cover rounded-t-2xl"
                />
              </div>

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
                  {/* Edit Button */}
                  <Link
                    to={`/edit-event/${event._id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all"
                  >
                    <Edit size={18} /> Edit
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={18} /> Delete
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

export default ManageEvents;
