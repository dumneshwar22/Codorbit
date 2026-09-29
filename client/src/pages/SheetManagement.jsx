import { useEffect, useState, useContext } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Skeleton from "../components/skeletons/Skeleton";
import SheetCard from "../components/dsa/SheetCard";

import { getProfile, updateActiveSheets } from "../services/userService";

import { getSheets } from "../services/dsaService";
import SEO from "../components/common/SEO";
import { AuthContext } from "../context/AuthContext";
import GuestFeatureLock from "../components/GuestFeatureLock";

const guestSheets = [
  {
    name: "Blind 75",
    description: "A curated roadmap for interview-ready arrays, strings, trees, graphs, and dynamic programming patterns.",
    roadmap: ["Arrays", "Graphs", "Trees", "Dynamic Programming"],
  },
  {
    name: "NeetCode 150",
    description: "A broad collection of modern coding interview problems with strong pattern coverage.",
    roadmap: ["Arrays", "Graphs", "Trees", "Dynamic Programming"],
  },
  {
    name: "Striver A2Z",
    description: "A step-by-step roadmap for mastering DSA from foundation to advanced problem solving.",
    roadmap: ["Arrays", "Hashing", "Greedy", "Graphs"],
  },
];

const SheetManagement = () => {
  const { isGuest } = useContext(AuthContext);
  const [selectedSheets, setSelectedSheets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [sheets, setSheets] = useState([]);

  const [expandedSheet, setExpandedSheet] = useState(null);
  const [guestFeatureLockOpen, setGuestFeatureLockOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (isGuest) {
        setSelectedSheets(["Blind 75", "NeetCode 150"]);
        setSheets(guestSheets);
        setLoading(false);
        return;
      }

      try {
        const [profileRes, sheetsRes] = await Promise.all([
          getProfile(),
          getSheets(),
        ]);

        setSelectedSheets(profileRes.user.activeSheets || []);

        setSheets(sheetsRes.sheets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isGuest]);

  const toggleRoadmap = (sheetName) => {
    setExpandedSheet(expandedSheet === sheetName ? null : sheetName);
  };

  const handleSheetToggle = async (sheetName) => {
    if (isGuest) {
      setGuestFeatureLockOpen(true);
      return;
    }

    try {
      let updatedSheets;

      if (selectedSheets.includes(sheetName)) {
        updatedSheets = selectedSheets.filter((sheet) => sheet !== sheetName);
      } else {
        updatedSheets = [...selectedSheets, sheetName];
      }

      setSelectedSheets(updatedSheets);

      await updateActiveSheets(updatedSheets);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <>
        <SEO
          title="DSA Sheets"
          description="Manage Striver A2Z, Blind 75, Love Babbar, NeetCode 150 and other coding sheets."
          canonical="/sheet-management"
          noIndex={true}
        />

        <DashboardLayout>
          <div className="space-y-8">
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
                >
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="mt-4 h-4 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-5/6" />
                  <div className="mt-6 flex gap-3">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardLayout>
      </>
    );
  }

  return (
    <>
      <SEO
        title="DSA Sheets"
        description="Manage Striver A2Z, Blind 75, Love Babbar, NeetCode 150 and other coding sheets."
        canonical="/sheet-management"
        noIndex={true}
      />

      <DashboardLayout>
        {/* Header */}

        <div className="mb-10">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Learning Management
          </p>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            DSA Sheets
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Choose the learning roadmaps you want to follow. You can activate
            multiple sheets and switch between them anytime from the DSA
            Tracker.
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {sheets.map((sheet) => (
            <SheetCard
              key={sheet.name}
              sheet={sheet}
              active={selectedSheets.includes(sheet.name)}
              expanded={expandedSheet === sheet.name}
              onToggleRoadmap={toggleRoadmap}
              onToggleSheet={handleSheetToggle}
            />
          ))}
        </div>

        <GuestFeatureLock
          open={guestFeatureLockOpen}
          onClose={() => setGuestFeatureLockOpen(false)}
        />
      </DashboardLayout>
    </>
  );
};

export default SheetManagement;
