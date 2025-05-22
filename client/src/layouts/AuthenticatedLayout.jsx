import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

  const AppLayout = () => {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="md:w-64 w-full bg-white border-r shadow-md">
          <Sidebar />
        </div>
  
        {/* Main content */}
        <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <Header/>
          <Outlet/>
        </main>
      </div>
    );
  };
  
  export default AppLayout;
  