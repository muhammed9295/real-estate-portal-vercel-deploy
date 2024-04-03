import "../globals.css";
export const metadata = {
  title: "MDSHK- Property",
  description: "A real estate portal",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
