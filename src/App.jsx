import React, { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListTable from "./Components/ListTable";

function App() {
  const [largeURL, setLargeURL] = useState("");
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
  async function fetchShortURL(largeURL) {
    try {
      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${largeURL}`
      );
      const data = await response.json();
      const newShortURL = data.result.full_short_link;

      return newShortURL;
    } catch (e) {
      alert(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newShortURL = await fetchShortURL(largeURL);
      setShortURL(newShortURL);

      // SETTING THE LIST
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
    setLargeURL("");
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
