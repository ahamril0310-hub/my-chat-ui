import "./globals.css";

export const metadata = {
  title: "GPT-OSS Chat",
  description: "Dark blue modern chat UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0C1523] text-slate-100 h-screen overflow-hidden flex flex-col" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}