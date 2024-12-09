import { BrowserRouter as Router, Routes as ReactRoutes, Route } from 'react-router-dom';
import Home from '@/pages/authenticated/home/';
import Login from '@/pages/noAuthenticated/login';
import Artists from '@/pages/noAuthenticated/artists';
import AuthRedirect from './authRedirect';
import Artist from '@/pages/authenticated/artist';

function Routes() {
  return (
    <Router>
      <ReactRoutes>
        <Route path="/login" element={<Login />} />
        <Route path="/artists" element={<Artists />} />
        <Route
          path="/home"
          element={
            <AuthRedirect>
              <Home />
            </AuthRedirect>
          }
        />
        <Route
          path="/"
          element={
            <AuthRedirect>
              <Home />
            </AuthRedirect>
          }
        />
        <Route
          path="/artist/:id/:name"
          element={
            <AuthRedirect>
              <Artist />
            </AuthRedirect>
          }
        />
      </ReactRoutes>
    </Router>
  );
}

export default Routes