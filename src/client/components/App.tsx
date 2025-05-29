import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import type { FC } from 'react';

import { Home } from './Home';
import { Profile } from './Profile';
import { NotFound } from './NotFound';

export const App: FC = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a href="/auth/google">Log In</a>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};
