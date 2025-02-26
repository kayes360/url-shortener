import React, { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListTable from "./Components/ListTable";
import RedirectPage from "./Pages/Redirect";
import './style.css'
function App() {
  const [largeURL, setLargeURL] = useState("");
  const [addedURL, setAddedURL] = useState("");

  const [shortURL, setShortURL] = useState("");
  const [copied, setCopied] = useState(false);

  const [allLinks, setAllLinks] = useState(() => {
    const localStorageList = localStorage.getItem("allLinks");
    if (localStorageList == null) return [];
    else {
      return JSON.parse(localStorageList);
    }
  });

  //MAKING THE SHORT URL FROM API REQUEST
  function fetchShortURL(largeURL) {
    // Simple base encoding (alternative: use a hashing algorithm)
    const uniqueKey = crypto.randomUUID().slice(0, 8); // Generate a unique key
    const customDomain = "https://imrul-shorturl.vercel.app/";
    const shortURL = `${customDomain}${uniqueKey}`;
  
    // Store mapping in localStorage (or a backend DB in real-world cases)
    const urlMappings = JSON.parse(localStorage.getItem("urlMappings")) || {};
    urlMappings[uniqueKey] = largeURL;
    localStorage.setItem("urlMappings", JSON.stringify(urlMappings)); 
    return shortURL;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newShortURL = fetchShortURL(largeURL);
      setAddedURL(largeURL)
      setShortURL(newShortURL); 
      // SETTING THE LIST
      console.log('largeURL',largeURL)
      console.log('newShortURL',newShortURL)
      if (newShortURL != null) {
        setAllLinks((prevState) => {
          const updatedList = [
            ...prevState,
            {
              id: crypto.randomUUID(),
              largeURL,
              newShortURL,
              editable: false,
            },
          ];

          localStorage.setItem("allLinks", JSON.stringify(updatedList));

          return updatedList;
        });
      }
    } catch (error) {
      console.error(error);
    }
 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleSubmit={handleSubmit}
                largeURL={largeURL}
                addedURL={addedURL}
                setLargeURL={setLargeURL}
                shortURL={shortURL}
                copied={copied}
                setCopied={setCopied}
              />
            }
          />
          <Route
            path="/list"
            element={
              <ListTable allLinks={allLinks} setAllLinks={setAllLinks} fetchShortURL={fetchShortURL}/>
            }
          />
          <Route path="/:shortCode" element={<RedirectPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
