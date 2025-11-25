import React from 'react';
import { Navigation } from "../nav/Navigation";
import contactImage from '../../assets/image-4.png';
import { Footer } from '../nav/footer';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center text-white mb-12">
        <div className="relative z-20">
            <Navigation />
              </div>
          
          <h1 className="text-4xl font-bold text-base-content mb-4">Contact Us</h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Have questions or need support? We're here to help you make the most of Bug Tracker.
          </p>
        </div>

       <div className="mb-12">
         <img
           src={contactImage}
           alt="Contact Bug Tracker"
           className="w-full max-w-4xl mx-auto rounded-lg shadow-xl"
         />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {/* Contact Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body card bg-black/60 text-white shadow-xl rounded-md">
              <h2 className="card-title text-2xl mb-6">Get In Touch</h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📧</div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-base-content/70">support@bugtracker.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📞</div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-base-content/70">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📍</div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-base-content/70">
                      123 Bug Tracker Street<br />
                      Tech City, TC 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🕒</div>
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-base-content/70">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card bg-black/60 text-white shadow-xl rounded-md">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Send us a Message</h2>

              <form className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Support Options */}
        <div className="card bg-black/60 text-white shadow-xl rounded-md pd-6 mt-12">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Other Ways to Get Help</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-base-content/70 mb-3">
                  Browse our comprehensive guides and tutorials.
                </p>
                <button className="btn btn-outline btn-sm">View Docs</button>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold mb-2">Community Forum</h3>
                <p className="text-sm text-base-content/70 mb-3">
                  Connect with other users and share solutions.
                </p>
                <button className="btn btn-outline btn-sm">Join Forum</button>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-base-content/70 mb-3">
                  Get instant help from our support team.
                </p>
                <button className="btn btn-outline btn-sm">Start Chat</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;