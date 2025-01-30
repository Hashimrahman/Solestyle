import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About SoleStyle</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We're a passionate team dedicated to bringing you the latest and
            greatest in footwear. From top brands to unique designs, we’ve got
            the perfect shoes for every occasion.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Story</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            SoleStyle was born from a simple idea: to make shoe shopping easy,
            fun, and stylish. Our founders wanted to create a platform where
            shoe lovers could explore the latest trends, discover their favorite
            brands, and express themselves through footwear. Today, we are proud
            to be one of the leading online destinations for shoe enthusiasts.
          </p>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Our Story"
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
              <h3 className="text-xl font-semibold mb-4">Quality</h3>
              <p>
                We source only the best materials and work with top brands to
                ensure our customers receive high-quality footwear.
              </p>
            </div>

            <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
              <h3 className="text-xl font-semibold mb-4">Style</h3>
              <p>
                We stay ahead of the latest trends so you can always find
                something new and exciting in our collection.
              </p>
            </div>

            <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
              <h3 className="text-xl font-semibold mb-4">Customer Focus</h3>
              <p>
                Our customers are at the heart of everything we do. We are
                committed to providing excellent service and an easy shopping
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Meet The Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">Co-Founder & CEO</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">Co-Founder & CMO</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Alex Johnson</h3>
              <p className="text-gray-600">Head of Design</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 SoleStyle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
