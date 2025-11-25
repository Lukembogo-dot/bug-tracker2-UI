import { useState } from 'react'
import Bugs from '../content/Bugs'
import Comments from '../content/Comments'
import Projects from '../content/Projects'

export const Drawer = () => {
  const [activeView, setActiveView] = useState<'bugs' | 'comments' | 'projects'>('bugs')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const renderContent = () => {
    switch (activeView) {
      case 'bugs':
        return <Bugs />
      case 'comments':
        return <Comments />
      case 'projects':
        return <Projects />
      default:
        return <Bugs />
    }
  }

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={drawerOpen} onChange={() => setDrawerOpen(!drawerOpen)} />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
        {renderContent()}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li><a onClick={() => { setActiveView('bugs'); setDrawerOpen(false) }}>Bugs</a></li>
          <li><a onClick={() => { setActiveView('comments'); setDrawerOpen(false) }}>Comments</a></li>
          <li><a onClick={() => { setActiveView('projects'); setDrawerOpen(false) }}>Projects</a></li>
        </ul>
      </div>
    </div>
  )
}