import "@styles/import.css";
import "@styles/tailwind.css";
import { cn } from "cn";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { SidebarRoot } from "./Sidebar";
import { StoreProvider } from "./StoreProvider";

const generalSans = localFont({
  src: "../common/font/Sans/GeneralSans-Variable.ttf",
  variable: "--font-general-sans",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "fitJob",
  description: "fitJob",
};

export default function RootLayout({ children, modals }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", generalSans.variable, "font-sans")}
    >
      <body className="flex min-h-full flex-row">
        <SidebarRoot />
        <StoreProvider>
          <Toaster
            theme="dark"
            position="bottom-right"
            closeButton
            duration={3000}
          />
          <div className="min-w-0 flex-1">
            {modals}
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
