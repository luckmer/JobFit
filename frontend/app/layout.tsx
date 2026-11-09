import "@styles/import.css";
import "@styles/tailwind.css";
import { cn } from "cn";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { StoreProvider } from "./StoreProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        generalSans.variable,
        "font-sans",
        inter.variable,
      )}
    >
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
