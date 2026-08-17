import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRole
}) {

  const userData =
    localStorage.getItem("user");

  const storedRole =
    localStorage.getItem("role");

  // USER LOGIN CHECK
  
  if (!userData || !storedRole) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // ROLE CHECK

  if (
    allowedRole &&
    storedRole !== allowedRole
  ) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  return children;

}

export default ProtectedRoute;