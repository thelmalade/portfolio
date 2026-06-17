import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { ContactProvider } from "./components/ContactProvider";
import Home from "./pages/Home";
import Works from "./pages/Works";
import Resume from "./pages/Resume";
import JournalIndex from "./pages/JournalIndex";
import JournalPost from "./pages/JournalPost";
import Aurora from "./pages/Aurora";
import Flux from "./pages/Flux";
import Drift from "./pages/Drift";
import Spectrum from "./pages/Spectrum";

export default function App() {
  return (
    <ContactProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/works/aurora" element={<Aurora />} />
        <Route path="/works/flux" element={<Flux />} />
        <Route path="/works/drift" element={<Drift />} />
        <Route path="/works/spectrum" element={<Spectrum />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/journal" element={<JournalIndex />} />
        <Route path="/journal/:slug" element={<JournalPost />} />
      </Routes>
    </ContactProvider>
  );
}
