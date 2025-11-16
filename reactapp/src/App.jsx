import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/Header.css";
import "./styles/Stagger.css";
import SessionsPage from "./pages/SessionsPage";
import LearningSessionsSection from "./components/LearningSessionsSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SkillShareForm from "./components/SkillShareForm";
import SkillShareList from "./components/SkillShareList";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Explore from "./pages/Explore";
import Directory from "./pages/Directory";
import Jobs from "./pages/Jobs";
import Market from "./pages/Market";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HeroSection from "./components/HeroSection";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import SessionDetailPage from "./pages/SessionDetailPage";
import SkillsBanner from "./ui/SkillsBanner";
import TestimonialsSection from "./ui/TestimonialsSection";
import { useAuth } from "./context/AuthContext";
import AdminPortal from "./components/AdminPortal";
import RequireAdmin from "./components/RequireAdmin";
import AdminLogin from "./pages/AdminLogin";
import PaymentPage from "./pages/PaymentPage";
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
        
<section>
  <SkillsBanner/>
  </section>
<section>
  <TestimonialsSection/>
</section>
<section>
  <HeroSection/>
</section>
            </>
          }
        />
        
<Route
  path="/add-skill"
  element={
    <div className="haran">
      <div className="haran-container">
        <h2 className="fw-bold mb-3">Share Your Skill With the Community</h2>
        <p>
          Fill in your skill details to help other learners. Every shared skill adds value to our global learning network.
        </p>
        <div className="haran-card">
          <SkillShareForm
            onAdd={(newSkill) => {
              // Trigger a refresh of the SkillShareList after adding a skill
              const event = new CustomEvent("skillAdded", { detail: newSkill });
              window.dispatchEvent(event);
              console.log("New skill added:", newSkill);
            }}
          />
        </div>
      </div>
    </div>
  }
/>

{/* ================= SKILLS PAGE ================= */}
<Route
  path="/skills"
  element={
    <div className="hrxn">
      <div className="hrxn-container">
        <h2 className="fw-bold mb-3">Explore Skills Shared by Members</h2>
        <p>
          Discover new skills, connect with contributors, and join discussions. Learn and grow with the community.
        </p>
        <div className="hrxn-card">
          <SkillShareList refreshEvent="skillAdded" /> {/* listens for the custom event */}
        </div>
      </div>
    </div>
  }
/>

  <Route path="/" element={<Login />} />
  <Route path="/explore" element={<Explore />} />
  <Route path="/directory" element={<Directory />} />
  <Route path="/jobs" element={<Jobs />} />
  <Route path="/market" element={<Market />} />
  <Route path="/about" element={<About />} />
  <Route path="/login" element={<Login />} />
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/" element={<LearningSessionsSection />} />
  <Route path="/home" element={<LearningSessionsSection />} />
  <Route path="/sessions" element={<SessionsPage />} />
<Route path="/sessions/:sessionId" element={<SessionDetailPage />} />
  <Route path="/payment" element={<PaymentPage />} />
  <Route path="/admin" element={<RequireAdmin><AdminPortal /></RequireAdmin>} />



      </Routes>
      <div className="membership-cta">
       
      </div>
      {isAuthenticated && <Footer />}
    </Router>
  );
}

export default App;

