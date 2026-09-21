import { cn } from "@/lib/utils";
import binayakLogo from "@/assets/logo.png";

export const Component = ({ className, logo = binayakLogo }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 sm:gap-4 p-2 sm:p-4", className)}>
      <div className="relative flex justify-center items-center">
        {/* Golden spinning circle with responsive size for mobile, tablet & desktop */}
        <div
          className="absolute animate-spin rounded-full h-28 w-28 sm:h-32 sm:w-32 border-t-4 border-b-4 border-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
          style={{ animationDuration: "2.5s" }}
        ></div>
        {/* Binayak Logo */}
        <img
          src={logo}
          alt="Binayak Logo"
          className="rounded-full h-24 w-24 sm:h-28 sm:w-28 object-contain bg-white p-1 sm:p-2 shadow-sm"
        />
      </div>
    </div>
  );
};

// Full-screen loader for initial website open
export const PageLoader = ({ fade = false }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 top-0 left-0 right-0 bottom-0 z-[99999] flex flex-col items-center justify-center p-4 bg-white transition-opacity duration-700 select-none overflow-hidden touch-none",
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100dvh",
        touchAction: "none",
        overscrollBehavior: "none",
      }}
    >
      <Component />
      <div className="mt-3 sm:mt-4 flex flex-col items-center gap-0.5 sm:gap-1 text-center">
        <span className="text-xs sm:text-sm md:text-base font-semibold tracking-wider text-amber-600 uppercase">
          Binayak Industries
        </span>
        <span className="text-[10px] sm:text-xs text-neutral-400 font-medium">
          Loading ...
        </span>
      </div>
    </div>
  );
};

export default Component;
