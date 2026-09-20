import { useState, useEffect } from "react";
import AppRoutes from "./routes";
import { PageLoader } from "./components/ui/loding";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Prevent mobile browser from restoring scroll position or shifting down
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Lock body and html scroll so page underneath cannot scroll or shift layout
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    // Keep loader visible, then smooth fade out
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 2200);

    const removeTimer = setTimeout(() => {
      setLoading(false);
      // Restore scroll when loading finishes
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }, 2900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, []);

  return (
    <div>
      {loading && <PageLoader fade={fade} />}
      <AppRoutes />
    </div>
  );
};

export default App;