"use client";

import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { toast } from "sonner";
import { auth } from "~/firebase/config";

const TopBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/signin") return null;

  const user = auth.currentUser;
  console.log("user:", user);

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null && pathname !== "/") {
        router.push("/signin");
      }
    });
  }, [user]);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 h-16 bg-gradient-to-r from-amber-400 via-orange-500 to-purple-500 opacity-90 backdrop-blur-lg backdrop-filter">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href={"/"}>
                  <Image
                    // className="w-18 h-12"
                    src="https://logos-world.net/wp-content/uploads/2021/02/Microsoft-Office-365-Emblem.png"
                    alt="akv-technologies"
                    width={44}
                    height={44}
                  />
                </Link>
              </div>
            </div>

            {user && (
              <div>
                <Link
                  href="/gallery"
                  // className="rounded-lg bg-slate-100  p-3  hover:bg-slate-300 hover:ring-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                >
                  <p className="font-honk text-2xl">Gallery</p>
                </Link>
              </div>
            )}
            <div>
              {user === null ? (
                <button
                  className="rounded-lg bg-slate-100  p-3  hover:bg-slate-300 hover:ring-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  onClick={() => router.push("/signin")}
                >
                  <p className="font-honk text-2xl">Sign In</p>
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <p> {`Hi, ${user.displayName}`}</p>
                  <button
                    className="rounded-lg bg-slate-100  p-2  hover:bg-slate-300 hover:ring-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    onClick={() => {
                      //signout
                      auth
                        .signOut()
                        .then(() => {
                          // toast.success("Sign Out Successful");
                        })
                        .catch((err) => {
                          toast.error("Something went wrong");
                          console.log(err);
                        });
                    }}
                  >
                    <p className="font-honk text-sm">Sign Out</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TopBar;
