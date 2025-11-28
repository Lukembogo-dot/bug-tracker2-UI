import { useState } from 'react'
import Bugs from '../content/Bugs'
import Comments from '../content/Comments'
import Projects from '../content/Projects'
import UserProfile from '../content/UserProfile'

export const Userdashboard = () => {
  const [activeView, setActiveView] = useState<'profile' | 'comments' | 'bugs' | 'projects' | 'homepage'>('profile')

  const renderContent = () => {
    switch (activeView) {
      case 'profile':
        return <UserProfile />
      case 'comments':
        return <Comments />
      case 'bugs':
        return <Bugs />
      case 'projects':
        return <Projects />
      case 'homepage':
        return (
          <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
              <h1 className="text-3xl font-bold text-white">Welcome to Admin Dashboard</h1>
            </div>
          </div>
        )
      default:
        return <UserProfile />
    }
  }

  return (
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content min-h-screen w-full">
    {/* Navbar */}
    <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4">Admin Dashboard</div>
    </nav>
    {/* Page content here */}
    {renderContent()}
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile" onClick={() => setActiveView('profile')}>
            {/* Profile icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Profile</span>
          </button>
        </li>

        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Comments" onClick={() => setActiveView('comments')}>
            {/* Comments icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
            <span className="is-drawer-close:hidden">Comments</span>
          </button>
        </li>
         <li>
           <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Bugs" onClick={() => setActiveView('bugs')}>
             {/* Bugs icon */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
             <span className="is-drawer-close:hidden">Bugs</span>
           </button>
         </li>
          <li>
           <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Projects" onClick={() => setActiveView('projects')}>
             {/* Projects icon */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
             <span className="is-drawer-close:hidden">Projects</span>
           </button>
         </li>

      </ul>
    </div>
  </div>
</div>
  )
}