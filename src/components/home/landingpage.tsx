import { Navigation } from "../nav/Navigation";
import logo from '../../assets/logo.png';
import { Footer } from '../nav/footer';

export default function LandingPage() {
    return (
    <div
  className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900"
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

    {/* Navigation */}
  <div className="relative z-20">
    <Navigation />
  </div>

    {/* Hero Content */}
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
    {/* Logo & Intro */}
    <div className="text-center text-white mb-8">
      <img
        src={logo}
        alt="Bug Tracker Logo"
        className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-xl shadow-lg border-2 border-white/20"
      />
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Welcome to Bug Tracker</h1>
      <p className="text-lg sm:text-xl max-w-lg mx-auto px-4">
        Your one-stop solution for tracking and managing bugs efficiently.
      </p>
    </div>

    {/* Info Boxes */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl w-full px-4">
      {/* Card 1 */}
      <div className="card bg-black/60 text-white shadow-xl rounded-md">
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title text-xl sm:text-2xl text-base-content">Why Choose Bug Tracker?</h2>
          <p className="text-sm sm:text-base">
            Bug Tracker is your all-in-one platform for identifying, tracking, and resolving software bugs efficiently.
            Whether you're managing a small project or a large team, we help you stay organized and focused.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card bg-black/60 text-white shadow-xl rounded-md">
        <div className="card-body p-4 sm:p-6">
          <h3 className="card-title text-lg sm:text-xl text-base-content">Why It Matters</h3>
          <p className="text-sm sm:text-base">
            No more losing track of issues in endless chats or spreadsheets. Bug Tracker provides a centralized space to
            report bugs, assign priorities, and collaborate seamlessly — all in real time.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card bg-black/60 text-white shadow-xl rounded-md">
        <div className="card-body p-4 sm:p-6">
          <h3 className="card-title text-lg sm:text-xl text-base-content">Collaboration</h3>
          <p className="text-sm sm:text-base">
            With intuitive dashboards and smart notifications, every team member stays in the loop — developers fix,
            testers verify, and managers track progress with ease.
          </p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="card bg-black/60 text-white shadow-xl rounded-md">
        <div className="card-body p-4 sm:p-6">
          <h3 className="card-title text-lg sm:text-xl text-base-content">Get Started</h3>
          <p className="text-sm sm:text-base">
            Start improving your workflow today. Create an account or log in to begin tracking your first bug — and
            experience the power of streamlined issue management.
          </p>
          <div className="card-actions justify-end mt-4 flex flex-col sm:flex-row gap-2">
            <button className="btn btn-primary btn-sm sm:btn-md">Get Started</button>
            <button className="btn btn-outline btn-sm sm:btn-md">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</div>

    );
}