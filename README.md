# 🌿 EcoMotion — Social Development Events Platform

EcoMotion is a **community-driven event management platform** where users can create, join, and manage **social service events** such as clean-up drives, tree plantations, awareness programs, and charity activities.  
The goal is to bring communities together to contribute to environmental and social development initiatives.

---

##  **Live Site URL**
 [https://mahbub-eco-motion.web.app/]

---

##  **GitHub Repositories**
- **Client:** [https://github.com/mahbubprince/EcoMotion-Client](https://github.com/mahbubprince/EcoMotion-client)
- **Server:** [https://github.com/mahbubprince/EcoMotion-server](https://github.com/mahbubprince/EcoMotion-server)

---

##  **Features**


###  Core Features
1. **Event Management System:**  
   Users can create, view, update, and join social events such as tree plantations, road cleaning, or donation programs.
2. **Upcoming Events Page:**  
   Displays all upcoming events in a beautiful grid layout — past events are automatically filtered out.
3. **Join Event Functionality:**  
   Logged-in users can join any event. Join data is stored in MongoDB with user details.
4. **Authentication System (Firebase):**  
   Email/password and Google login system with validation, SweetAlert feedback, and user profile management.
5. **Private Routes:**  
   `Create Event`, `Manage Events`, and `Joined Events` pages are protected. Logged-in users remain authenticated even after page reloads.

---

###  Additional Features
6. **Theme Toggler:**  
   Switch between light  and dark  modes dynamically (saved in localStorage for persistence).  
7. **Framer Motion Animations:**  
   Smooth animations on form, buttons, and component transitions.  
8. **Responsive Design:**  
   Fully responsive for all screen sizes — mobile, tablet, and desktop.  
9. **Event Filtering & Search:**  
   Users can search events by name or filter by event type.  
   Implemented via MongoDB query and server-side filtering.  
10. **User-Friendly Alerts:**  
    SweetAlert is used for all notifications — no default browser alerts.  
11. **Spinner / Loader:**  
    A beautiful loading animation is shown during data fetching.  
12. **404 Page:**  
    Custom “Page Not Found” design for invalid routes.

---

##  **Authentication Flow**

- **Register Page:**  
  - Validates strong password (1 uppercase, 1 lowercase, min 6 chars).  
  - Requires Name, Email, Password, and Photo URL.  
  - Displays success or error alerts via SweetAlert.

- **Login Page:**  
  - Email & password login + Google login option.  
  - “Forgot password” functionality using Firebase `sendPasswordResetEmail`.

- **Session Persistence:**  
  - Auth state persists via `onAuthStateChanged` (no redirect after reload).

---

##  **Pages Overview**

| Page | Access | Description |
|------|---------|-------------|
| `/` | Public | Home with Banner, Features, Gallery, Newsletter |
| `/upcoming` | Public | Displays all upcoming events |
| `/login` | Public | Email & Google login |
| `/register` | Public | New user registration |
| `/createEvent` | Private | Add new event (future dates only) |
| `/manage` | Private | Update user’s created events |
| `/joined` | Private | View events joined by logged-in user |
| `/event/:id` | Public | Event details + Join button |
| `*` | Public | Custom 404 page |

---

##  **Tech Stack**

### Frontend
- React.js (Vite)
- React Router
- Firebase Authentication
- Tailwind CSS + DaisyUI
- Framer Motion
- SweetAlert2
- React DatePicker

### Backend
- Node.js
- Express.js
- MongoDB (CRUD + filtering/search)
- CORS, dotenv, nodemon
- Hosted on **Vercel**

### Deployment
- Client: **Firebase Hosting**
- Server: **Vercel**

---

## **API Endpoints (Examples)**

| Method | Endpoint | Description |
|---------|-----------|-------------|
| `POST` | `/events` | Create new event |
| `GET` | `/events` | Get all upcoming events |
| `GET` | `/events/:id` | Get event details |
| `PATCH` | `/events/:id` | Update user’s event |
| `GET` | `/joined?email=user@example.com` | Get joined events by user |
| `POST` | `/join/:id` | Add user to event’s joined list |

---

##  **Validation Rules**

- **Register:** Password must include uppercase, lowercase, and be ≥ 6 chars.  
- **Create/Update Event:**  
  - Title, Description, Location, Image URL, and Event Type required.  
  - Date must be a *future* date (handled via `react-datepicker`).  
- **Login:** Email and Password required.

---

##  **Theme Customization**

- Default theme → **Light (winter)**  
- Toggle switch for **Dark (night)** mode.  
- Theme stored in `localStorage` for persistence.  
- Full system adapts instantly (Navbar, cards, forms, etc.)

---

##  **Animations**
- Implemented via **Framer Motion**:  
  - Fade-in transitions for sections.  
  - Smooth scaling for buttons and modals.  
  - Animated dropdowns in Navbar.

---

##  **Optional Features Implemented**
 Spinner while loading data  
 TanStack Query Mutations (for efficient API calls)  
 Custom 404 page  

---

##  **Folder Structure**

