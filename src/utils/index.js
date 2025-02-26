export default function handleRedirect(shortURL) {
    // Extract the shortCode from the shortURL
    const shortCode = shortURL.replace("https://imrul-shorturl.vercel.app/", "");
  
    // Retrieve URL mappings from localStorage
    const urlMappings = JSON.parse(localStorage.getItem("urlMappings")) || {};
    const originalUrl = urlMappings[shortCode];
  
    if (originalUrl) {
      window.location.href = originalUrl; // Redirect instantly
    } else {
      console.error("Short URL not found:", shortURL);
    }
  }
  