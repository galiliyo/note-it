import "@/styles/globals.css";
import Provider from "@/components/Provider";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Noted",
  description: "Share your thoughts with the world.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
