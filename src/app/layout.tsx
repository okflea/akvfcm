import "~/styles/globals.css";

import { DM_Sans } from "next/font/google";
import localfont from "next/font/local";
import TopBar from "./components/Topbar";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const honk = localfont({
  src: "../../public/Honk-Regular-Variable.ttf",
  variable: "--font-honk",
});

export const metadata = {
  title: "AKV Tech",
  description: "Assignment",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dm.variable} ${honk.variable} font-sans`}>
        <main className=" min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 py-16 text-white">
          <AuthProvider>
            <NotificationProvider>
              <TopBar />
              {children}
            </NotificationProvider>
          </AuthProvider>
        </main>
        <Toaster richColors />
      </body>
    </html>
  );
}
