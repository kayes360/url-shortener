import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RedirectPage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urlMappings = JSON.parse(localStorage.getItem("urlMappings")) || {};
    const originalUrl = urlMappings[shortCode]; // Look up the original URL using the shortCode

    if (originalUrl) {
      window.location.href = originalUrl; 
    } else { 
      navigate("/");  
    }
  }, [shortCode, navigate]);

  return <div>Redirecting...</div>; // Display a message while redirecting
}

export default RedirectPage;
