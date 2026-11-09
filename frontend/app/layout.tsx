import "@styles/import.css";
import "@styles/tailwind.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={` ${generalSans.variable} h-full antialiased`}>
      <body className="flex flex-col">
        <StoreProvider>
          <Toaster
            theme="dark"
            position="bottom-right"
            closeButton
            duration={3000}
          />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
