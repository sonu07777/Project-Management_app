import React from "react";
import { Link } from "react-router-dom";
// import { Briefcase, Users, LayoutDashboard } from "react-feather";
import { BiBriefcase } from "react-icons/bi";
import { FaUserSecret } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
// import Layout from "../../Layout/Layout.tsx"

const HomePage: React.FC = () => {
  return (
    
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <section className="max-w-6xl mx-auto space-y-20">
        {/* Hero */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Manage Projects, Assign Teams<br />All in One Place
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our platform helps your team collaborate, assign tasks, and finish projects on time—every time.
          </p>
          <Link
            to="/login"
            className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg space-y-4">
            <LuLayoutDashboard size={36} className="mx-auto" />
            <h3 className="text-xl font-bold">Project Dashboard</h3>
            <p>View, track, and manage your projects from a single powerful dashboard.</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-lg space-y-4">
            <FaUserSecret size={36} className="mx-auto" />
            <h3 className="text-xl font-bold">Team Collaboration</h3>
            <p>Assign tasks, track team performance, and collaborate seamlessly in real time.</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-lg space-y-4">
            <BiBriefcase size={36} className="mx-auto" />
            <h3 className="text-xl font-bold">Client Ready</h3>
            <p>Deliver professional results with tools that impress clients and streamline delivery.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-semibold mb-4">Ready to simplify your workflow?</h2>
          <Link
            to="/login"
            className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>
    </main>
    
  );
};

export default HomePage;
