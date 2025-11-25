import React from 'react';
import logo from '../../assets/logo.png';
import aboutImage from '../../assets/image-3.jpg';
import { Navigation } from "../nav/Navigation";
import { Footer } from '../nav/footer';

const About: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20 z-0" />
      <div className="max-w-4xl mx-auto">
        <div className="relative z-10 text-center text-white mb-12">
          <div className="relative z-20">
            <Navigation />
          </div>
          <img
            src={logo}
            alt="Bug Tracker Logo"
            className="w-24 h-24 mx-auto mb-6 rounded-xl shadow-lg"
          />
          <h1 className="text-4xl font-bold text-white mb-4">About Bug Tracker</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Empowering teams to track, manage, and resolve software bugs efficiently.
          </p>
        </div>

      <div className="mb-12 relative z-10">
         <img
           src={aboutImage}
           alt="About Bug Tracker"
           className="w-full max-w-4xl mx-auto rounded-lg shadow-xl"
         />
       </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
          <div className="card bg-black/60 text-white shadow-xl rounded-md">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Our Mission</h2>
              <p className="text-white/85">
                Bug Tracker was created to streamline the bug tracking process for development teams worldwide.
                We believe that efficient bug management is crucial for delivering high-quality software products.
              </p>
            </div>
          </div>

          <div className="card bg-black/60 text-white shadow-xl rounded-md">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">What We Offer</h2>
              <ul className="list-disc list-inside text-white/85 space-y-2">
                <li>Comprehensive bug tracking and reporting</li>
                <li>Real-time collaboration tools</li>
                <li>Priority management and assignment</li>
                <li>Detailed progress tracking</li>
                <li>Integration with popular development tools</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card bg-black/60 text-white shadow-xl rounded-md relative z-10">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Why Choose Bug Tracker?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-semibold mb-2 text-white">Fast & Efficient</h3>
                <p className="text-sm text-white/80">
                  Quickly identify and resolve issues with our intuitive interface.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-semibold mb-2 text-white">Team Collaboration</h3>
                <p className="text-sm text-white/80">
                  Work together seamlessly with built-in communication tools.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold mb-2 text-white">Analytics & Insights</h3>
                <p className="text-sm text-white/80">
                  Gain valuable insights into your team's performance and productivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;