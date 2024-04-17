"use client";

import { usePathname, useRouter } from "next/navigation";

const TopBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/signin") return null;

  return (
    <>
      <div className="fixed left-0 right-0 top-0 h-16 bg-gradient-to-r from-amber-400 via-orange-500 to-purple-500 opacity-90 backdrop-blur-lg backdrop-filter">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
            </div>

            <div>
              <button
                className="rounded-lg bg-slate-100  p-3  hover:bg-slate-300 hover:ring-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                onClick={() => router.push("/signin")}
              >
                <p className="font-honk text-2xl">Sign In</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TopBar;
