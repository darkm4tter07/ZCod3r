import React, {useState} from "react";
import LoginModal from "../../Components/LoginModal.js";
import {useNavigate} from 'react-router-dom';


const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!window.localStorage.getItem("isAuthenticated")) {
      setShowModal(true);
    } else {
      navigate("/home");
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#0d1117] text-yellowgreen font-mono px-4 py-6">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-10 border-b border-yellowgreen pb-4">
        <h1 className="text-3xl font-bold tracking-widest">ZCod3r</h1>
        <button
          onClick={handleGetStarted}
          className="border-2 border-yellowgreen px-4 py-2 rounded hover:bg-yellowgreen hover:text-black transition"
        >
          GET STARTED
        </button>
        {showModal && <LoginModal onClose={() => setShowModal(false)} />}
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          {"< Unleash the coder in you />"}
        </h2>
        <p className="text-lg md:text-xl mb-8 text-[#c9d1d9]">
          Collaborate, code, and grow with a global community of developers.
        </p>
        <button
          onClick={handleGetStarted}
          className="border-2 border-yellowgreen px-6 py-3 rounded hover:bg-yellowgreen hover:text-black transition"
        >
          Join the Code
        </button>
      </section>

      {/* Features */}
      <section className="mt-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Built-in Compiler",
            desc: "Solve problems in real-time with multi-language support.",
            icon: "🖥️",
          },
          {
            title: "Doubts & Discussions",
            desc: "Post questions and get help from peers instantly.",
            icon: "❓",
          },
          {
            title: "Coding Profiles",
            desc: "Showcase your journey, skills, and achievements.",
            icon: "👨‍💻",
          },
          {
            title: "Contest Calendar",
            desc: "Track upcoming contests and never miss out.",
            icon: "📅",
          },
          {
            title: "Practice Arena",
            desc: "Curated challenges to sharpen your skills.",
            icon: "💡",
          },
          {
            title: "Chat Rooms",
            desc: "Real-time topic-based or private chats.",
            icon: "💬",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="border-2 border-yellowgreen rounded p-4 hover:bg-[#1e1e1e] transition"
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h3 className="font-bold text-xl mb-1">{feature.title}</h3>
            <p className="text-[#a0a0a0]">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-[#7f8c8d] text-sm">
        © 2025 ZCod3r. Built by coders, for coders.
      </footer>
    </main>
  );
};

export default LandingPage;
