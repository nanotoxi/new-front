"use client";

import {
  Settings,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
} from "lucide-react";

import {
  useTheme,
} from "@/context/theme-context";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

export function AdminHeader() {

  const {
    theme,
    toggleTheme,
  } = useTheme();

  const router =
    useRouter();

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {

        setProfileOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  const handleLogout =
    () => {

      localStorage.removeItem(
        "nanotoxi_token"
      );

      localStorage.removeItem(
        "nanotoxi_refresh"
      );

      router.push("/sign-in");
    };

  return (

    <header
      className={`
        sticky
        top-0
        z-40
        flex
        min-h-[96px]
        flex-wrap
        items-center
        justify-between
        gap-4
        border-b
        px-4
        md:px-6
        xl:px-8
        py-4
        backdrop-blur-xl
        transition-all
        duration-300
        overflow-visible
        ${
          theme === "dark"
            ? "border-white/10 bg-[#020817]/80"
            : "border-slate-200 bg-white/80"
        }
      `}
    >

      {/* LEFT */}

      <div className="min-w-0 flex-1">

        <h1
          className={`
            text-2xl
            md:text-4xl
            font-black
            tracking-tight
            break-words
            transition-colors
            duration-300
            ${
              theme === "dark"
                ? "text-white"
                : "text-slate-900"
            }
          `}
        >

          Admin Dashboard

        </h1>

        <p
          className={`
            mt-1
            hidden
            sm:block
            text-sm
            break-words
            transition-colors
            duration-300
            ${
              theme === "dark"
                ? "text-slate-400"
                : "text-slate-500"
            }
          `}
        >

          NanoToxi AI monitoring and management

        </p>

      </div>

      {/* RIGHT */}

      <div
        className="
          flex
          w-full
          flex-wrap
          items-center
          justify-end
          gap-2
          md:gap-4
          lg:w-auto
          overflow-visible
        "
      >

        {/* THEME */}

        <button
          onClick={toggleTheme}

          className={`
            flex
            h-10
            w-10
            md:h-12
            md:w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            transition-all
            duration-300
            ${
              theme === "dark"
                ? "border-white/10 bg-white/5 hover:bg-white/10"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }
          `}
        >

          {theme === "dark" ? (

            <Sun className="h-5 w-5 text-yellow-400" />

          ) : (

            <Moon className="h-5 w-5 text-slate-700" />

          )}

        </button>

        {/* PROFILE */}

        <div
          className="relative overflow-visible shrink-0"
          ref={dropdownRef}
        >

          <button
            onClick={() =>
              setProfileOpen(
                !profileOpen
              )
            }

            className={`
              flex
              max-w-full
              items-center
              gap-3
              rounded-2xl
              border
              px-3
              md:px-4
              py-2
              shadow-sm
              transition-all
              duration-300
              ${
                theme === "dark"
                  ? "border-white/10 bg-white/5 hover:bg-white/10"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }
            `}
          >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white">

              A

            </div>

            <div className="hidden sm:block text-left">

              <p
                className={`
                  text-sm
                  font-semibold
                  ${
                    theme === "dark"
                      ? "text-white"
                      : "text-slate-900"
                  }
                `}
              >

                Admin

              </p>

              <p
                className={`
                  text-xs
                  ${
                    theme === "dark"
                      ? "text-slate-400"
                      : "text-slate-500"
                  }
                `}
              >

                Super Administrator

              </p>

            </div>

            <ChevronDown
              className={`
                h-4
                w-4
                shrink-0
                transition-transform
                duration-300
                ${
                  profileOpen
                    ? "rotate-180"
                    : ""
                }
                ${
                  theme === "dark"
                    ? "text-slate-400"
                    : "text-slate-500"
                }
              `}
            />

          </button>

          {/* DROPDOWN */}

          {profileOpen && (

            <div
              className={`
                absolute
                right-0
                top-full
                z-[9999]
                mt-3
                w-[250px]
                overflow-hidden
                rounded-2xl
                border
                shadow-2xl
                ${
                  theme === "dark"
                    ? "border-white/10 bg-[#0B1120]"
                    : "border-slate-200 bg-white"
                }
              `}
            >

              {/* SETTINGS */}

              <button
                onClick={() => {

                  setProfileOpen(false);

                  router.push("/admin/settings");
                }}

                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-4
                  text-sm
                  transition-all
                  ${
                    theme === "dark"
                      ? "text-white hover:bg-white/5"
                      : "text-slate-900 hover:bg-slate-100"
                  }
                `}
              >

                <Settings className="h-4 w-4" />

                Settings

              </button>

              {/* LOGOUT */}

              <button
                onClick={handleLogout}

                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-4
                  text-sm
                  text-red-400
                  transition-all
                  hover:bg-red-500/10
                "
              >

                <LogOut className="h-4 w-4" />

                Logout

              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}