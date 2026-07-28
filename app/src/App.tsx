import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { TopBar, TabBar } from "./components/Nav";
import { Footer } from "./components/Footer";
import { InquiryProvider } from "./lib/inquiry";
import { InquiryModal } from "./components/InquiryModal";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import ItemDetail from "./pages/ItemDetail";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Visit from "./pages/Visit";
import Shows from "./pages/Shows";
import Contact from "./pages/Contact";
import Saved from "./pages/Saved";

/** Reset scroll on navigation, but leave in-page anchors alone. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <InquiryProvider>
      <ScrollToTop />
      <TopBar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:id" element={<ItemDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <TabBar />
      <InquiryModal />
    </InquiryProvider>
  );
}
