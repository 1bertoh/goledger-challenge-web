import { getUser } from "@/lib/utils";
import { Navigate, useLocation } from "react-router-dom";


const AuthRedirect = ({ children }: { children: JSX.Element }) => {
    const userParsed = getUser();
    const location = useLocation();
    const AuthrestrictedPaths = ['/login', '/artists'];
  
    if (!userParsed.nome) {
      return <Navigate to="/login" />;
    }
  
    if (!userParsed.cantores || !userParsed.cantores.length) {
      return <Navigate to="/artists" />;
    }
  
    if (AuthrestrictedPaths.includes(location.pathname)) {
      return <Navigate to="/home" />;
    }
  
    return children;
  };
  
  
  export default AuthRedirect;
  