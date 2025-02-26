import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RedirectPage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urlMappings = JSON.parse(localStorage.getItem("urlMappings")) || {};
    const originalUrl = urlMappings[shortCode]; // Look up the original URL using the shortCode

    if (originalUrl) {
    //   window.location.href = originalUrl;
    console.log("Original URL:", originalUrl);  
    } else {
    //   alert("Invalid short URL! Redirecting to home page.");
    //   navigate("/");  
    }
  }, [shortCode, navigate]);

  return <div>Redirecting...</div>; // Display a message while redirecting
}

export default RedirectPage;
