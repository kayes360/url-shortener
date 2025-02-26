import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RedirectPage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urlMappings = JSON.parse(localStorage.getItem("urlMappings")) || {};
    const originalURL = urlMappings[shortCode];

    if (originalURL) {
      window.location.href = originalURL; // Redirect to the original URL
    } else {
      navigate("/"); // Redirect to home if not found
    }
  }, [shortCode, navigate]);

  return <h2>Redirecting...</h2>;
}
