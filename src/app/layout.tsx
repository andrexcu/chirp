import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { SkeletonTheme } from "react-loading-skeleton";
import ToasterProvider from "~/providers/ToasterProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} overflow-none flex h-screen justify-center`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <ToasterProvider />
          <SkeletonTheme baseColor="#DBE2E9" highlightColor="#808992">
            <div className="flex h-full w-full flex-col border-x border-slate-400 md:max-w-2xl">
              {children}
            </div>
          </SkeletonTheme>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
