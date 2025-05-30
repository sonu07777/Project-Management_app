import React from "react";

const CompanyProfile: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Company</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We are a modern tech company focused on delivering innovative solutions to help
            businesses grow and teams succeed.
          </p>
        </div>

        {/* Image + Intro */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Company Office"
            className="rounded-lg w-full md:w-1/2 object-cover shadow-lg"
          />
          <div className="space-y-4 md:w-1/2">
            <h2 className="text-2xl font-semibold">Who We Are</h2>
            <p className="text-gray-400">
              Founded in 2020, we have built strong project management tools, streamlined
              team workflows, and empowered users to work smarter—not harder.
            </p>
            <p className="text-gray-400">
              Our team consists of developers, designers, and project strategists working
              together to shape the digital future.
            </p>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
            <p>
              To enable digital teams with simple, effective, and powerful tools for project
              collaboration and task management.
            </p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Our Vision</h3>
            <p>
              To become the global leader in team productivity software, transforming the
              way work gets done.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">Want to work with us?</p>
          <button className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
