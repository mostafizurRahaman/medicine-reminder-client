import { Link } from "react-router-dom";

const Navbar = () => {
   return (
      <div className="flex items-center justify-between px-5">
         <div>Medication Reminder</div>
         <nav>
            <Link to="/home">home</Link>
            <Link to="/dashboard">Dashboard</Link>

            <Link to="/my-reminders">reminder</Link>
            <Link to="/logout">Logout</Link>
            <Link to="/login">login</Link>
         </nav>
      </div>
   );
};

export default Navbar;
