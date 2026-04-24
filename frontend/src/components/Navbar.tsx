import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="sticky top-0 z-[200] bg-white/95 backdrop-blur-md border-b flex flex-col md:flex-row md:items-center justify-between px-[4vw] min-h-[60px] flex-shrink-0 transition-all">
      <div className="flex items-center justify-between w-full md:w-auto h-[60px]">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <span className="font-serif text-[22px] font-bold text-forest tracking-tight">Clear<em className="not-italic text-amber">Impact</em></span>
        </Link>
        <button onClick={toggleMenu} className="md:hidden text-forest p-1">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-start md:items-center gap-4 py-4 md:py-0 w-full md:w-auto`}>
        <Link to="/" className="text-sm font-medium text-muted hover:text-forest transition-colors py-1.5 border-b-2 border-transparent hover:border-teal">Home</Link>
        <Link to="/stories" className="text-sm font-medium text-muted hover:text-forest transition-colors py-1.5 border-b-2 border-transparent hover:border-teal">Stories</Link>
        <Link to="/track" className="text-sm font-medium text-muted hover:text-forest transition-colors py-1.5 border-b-2 border-transparent hover:border-teal">Track</Link>
        
        {user ? (
          <>
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-sm font-medium text-muted hover:text-forest transition-colors py-1.5 border-b-2 border-transparent hover:border-teal">Dashboard</Link>
            <div className="flex items-center gap-2 font-medium text-sm text-ink-2">
               <div className="w-8 h-8 rounded-full bg-teal-light text-forest flex items-center justify-center text-xs font-bold border border-teal-mid uppercase">{user.name.slice(0, 2)}</div>
            </div>
            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-sm font-medium text-muted border border-border px-3 py-1.5 rounded bg-transparent hover:bg-bg transition-all">Logout</button>
          </>
        ) : (
          <>
            <Link to="/admin/login" className="text-sm font-medium text-muted hover:text-forest transition-colors py-1.5 border-b-2 border-transparent hover:border-teal">NGO Portal</Link>
            <Link to="/login" className="text-sm font-semibold text-forest border-2 border-teal px-4 py-1.5 rounded-lg hover:bg-teal-light transition-all w-full md:w-auto text-center">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
}
