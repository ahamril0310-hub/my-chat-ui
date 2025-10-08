import "./globals.css";

export const metadata = {
  title: "ChatGPT Clone",
  description: "Dark blue modern chat UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0C1523] text-slate-100 h-screen overflow-hidden flex flex-col">
        {children}
      </body>
    </html>
  );
}
