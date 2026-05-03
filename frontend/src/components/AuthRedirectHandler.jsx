import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/hooks/useAuth";

export default function AuthRedirectHandler() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  return null;
}