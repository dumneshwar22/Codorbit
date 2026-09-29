import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const GuestBanner = () => {
  const navigate = useNavigate();
  const { isGuest } = useContext(AuthContext);

  if (!isGuest) {
    return null;
  }

  return (
    <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50/80 px-4 py-3 dark:border-blue-900/60 dark:bg-blue-950/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Guest Mode — You&apos;re viewing demo data
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-300 dark:hover:bg-slate-800"
        >
          Sign in to unlock full access
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default GuestBanner;
