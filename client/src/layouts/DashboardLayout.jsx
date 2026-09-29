import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LandingFooter from "../components/landing/LandingFooter";
import GuestBanner from "../components/GuestBanner";

const DashboardLayout = ({ children }) => {
  return (
    <div
      className="
  flex
  min-h-screen
  bg-slate-50
  dark:bg-slate-950
  "
    >
      <div
        className="
        sticky
        top-0
        h-screen
        "
      >
        <Sidebar />
      </div>

      <div
        className="
        flex-1
        min-w-0
        "
      >
        <Navbar />

        <main
          className="
          px-8
          py-8
          "
        >
          <div
            className="
            max-w-7xl
            mx-auto
            "
          >
            <GuestBanner />
            {children}
          </div>
        </main>

        <LandingFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
