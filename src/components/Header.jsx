import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <div className="bg-orange-700 flex justify-between items-center h-14 p-8 uppercase text-lg text-white">
      <Link to="/">
        {location.pathname.includes("create") ||
        location.pathname.includes("edit")
          ? "<< Go Back to Home Page"
          : "Notes Management App"}
      </Link>
      <button className="border-2 border-black-400 rounded-md p-1">
        <Link to="/create-notes">Create Note</Link>
      </button>
    </div>
  );
};

export default Header;
