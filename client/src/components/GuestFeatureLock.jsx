import { useContext, useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const GuestFeatureLock = ({
  children,
  title = "Sign in to continue",
  description = "Create your CodOrbit profile to:",
  onClose,
  open = false,
}) => {
  const navigate = useNavigate();
  const { isGuest } = useContext(AuthContext);
  const [internalOpen, setInternalOpen] = useState(false);

  const isModalOpen = open || internalOpen;

  const closeModal = () => {
    if (typeof onClose === "function") {
      onClose();
      return;
    }

    setInternalOpen(false);
  };

  const handleClick = (event) => {
    if (!isGuest) {
      if (children?.props?.onClick) {
        children.props.onClick(event);
      }
      return;
    }

    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (typeof onClose === "function") {
      onClose();
      return;
    }

    setInternalOpen(true);
  };

  const wrappedChild = children
    ? {
        ...children,
        props: {
          ...children.props,
          onClick: handleClick,
        },
      }
    : null;

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={closeModal} />

      <div
        className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
          <ShieldCheck className="text-blue-600 dark:text-blue-400" size={26} />
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>

        <ul className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-200">
          {[
            "Track your DSA progress",
            "Connect coding platforms",
            "Get personalized insights",
            "Save your progress",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => {
              closeModal();
              navigate("/login");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Continue with Google
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );

  if (!children && !isModalOpen) {
    return null;
  }

  return (
    <>
      {children && wrappedChild}
      {isModalOpen && modal}
    </>
  );
};

export default GuestFeatureLock;
