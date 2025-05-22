import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Banknote,
  History,
  User,
  LogOut,
  VaultIcon,
  Barcode
} from "lucide-react";



// export default function Sidebar() {
//   const navigate = useNavigate();

//   const navLinks = [
    // { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    // { path: "/accounts", label: "Account", icon: <VaultIcon size={18} /> },
    // { path: "/transfer", label: "Fund Transfer", icon: <Banknote size={18} /> },
    // { path: "/transactions", label: "Transactions", icon: <History size={18} /> },
    // { path: "/profile", label: "Profile", icon: <User size={18} /> },
    // ];

//   const handleLogout = () => {
//     // Placeholder: clear auth (if any)
//     navigate("/");
//   };

//   return (
//     <aside className="w-64 bg-iciciBlue text-white min-h-screen p-6 shadow-md">
//       <h2 className="text-2xl font-bold mb-10"> UBank</h2>

//       <nav className="flex flex-col gap-4">
//         {navLinks.map(({ path, label, icon }) => (
//           <NavLink
//             key={path}
//             to={path}
//             className={({ isActive }) =>
//               `flex items-center gap-2 px-3 py-2 rounded transition ${
//                 isActive ? "bg-white text-iciciBlue font-semibold" : "hover:bg-iciciOrange/20"
//               }`
//             }
//           >
//             {icon}
//             {label}
//           </NavLink>
//         ))}

//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 mt-10 text-red-300 hover:text-red-100 transition"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </nav>
//     </aside>
//   );
// }

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/accounts", label: "Account", icon: <VaultIcon size={18} /> },
    { path: "/transfer", label: "Fund Transfer", icon: <Banknote size={18} /> },
    { path: "/transactions", label: "Transactions", icon: <History size={18} /> },
    { path: "/profile", label: "Profile", icon: <User size={18} /> },
    ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b">
        <span className="font-bold text-lg">UBank</span>
        <button onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Content */}

      <div
        className={`md:block ${open ? "block" : "w-64 min-h-screen hidden"} p-4 space-y-2 bg-iciciBlue text-white p-6 shadow-md`}
      >
        <h2 className={`md:block ${open ? "hidden" : "block"} text-2xl font-bold mb-10`}> UBank</h2>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-2 px-3 py-2 rounded transition ${
              location.pathname === link.path
                ? "bg-white text-iciciBlue font-semibold" : "hover:bg-iciciOrange/20"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
          <Link to="/"
          className="flex items-center gap-2 mt-10 text-red-300 hover:text-red-100 transition"
        >
          <LogOut size={18} />
          Logout
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
