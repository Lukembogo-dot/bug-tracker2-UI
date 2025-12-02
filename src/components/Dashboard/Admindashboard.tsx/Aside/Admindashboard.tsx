import { useState } from 'react'
import Bugs from '../content/bugs'
import Comments from '../content/comments'
import Projects from '../content/projects'
import Users from '../content/users'

export const Admindashboard = () => {
  const [activeView, setActiveView] = useState<'comments' | 'bugs' | 'projects' | 'users' | 'homepage'>('homepage')

  const renderContent = () => {
    switch (activeView) {

      case 'comments':
        return <Comments />
      case 'bugs':
        return <Bugs />
      case 'projects':
        return <Projects />
      case 'users':
        return <Users />
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
    }
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen w-full">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="admin-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-semibold">Admin Dashboard</div>
        </nav>
        {/* Page content here */}
        {renderContent()}
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* Home */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Home" onClick={() => setActiveView('homepage')}>
                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Home</span>
              </button>
            </li>

            {/* Users */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Users" onClick={() => setActiveView('users')}>
                {/* Users icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span className="is-drawer-close:hidden">Users</span>
              </button>
            </li>

            {/* Projects */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Projects" onClick={() => setActiveView('projects')}>
                {/* Projects icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Projects</span>
              </button>
            </li>

            {/* Bugs */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Bugs" onClick={() => setActiveView('bugs')}>
                {/* Bugs icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <path d="M8 2l1.88 1.88"></path>
                  <path d="M14.12 3.88L16 2"></path>
                  <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path>
                  <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path>
                  <path d="M12 20v-9"></path>
                  <path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path>
                  <path d="M6 13H2"></path>
                  <path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path>
                  <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path>
                  <path d="M22 13h-4"></path>
                  <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path>
                </svg>
                <span className="is-drawer-close:hidden">Bugs</span>
              </button>
            </li>

            {/* Comments */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Comments" onClick={() => setActiveView('comments')}>
                {/* Comments icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Comments</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Admindashboard