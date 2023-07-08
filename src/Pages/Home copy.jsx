import React, { useEffect, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Home() {
  const [largeURL, setLargeURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [copied, setCopied] = useState(false);

  // const [list, setList] = useState([]);
  const [list, setList] = useState(() => {
    const localStorageList = localStorage.getItem("allLinks");
    if (localStorageList == null) return [];
    else {
      return JSON.parse(localStorageList);
    }
  });
  // console.log(list);

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
        setList((prevState) => {
          const updatedList = [
            ...prevState,
            {
              id: crypto.randomUUID(),
              largeURL,
              newShortURL,
              editable: false
            },
          ];

          localStorage.setItem("allLinks", JSON.stringify(updatedList));

          return updatedList;
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLargeURL("")
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
    <div className="container my-5">
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <h1>URL SHORTENER</h1>
        <h3 className="text-body-emphasis"> Paste URL</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={largeURL}
              onChange={(e) => setLargeURL(e.target.value)}
            />
          </div>

          <div className="d-inline-flex gap-2 mb-5">
            <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill">
              Shorten URL
            </button>
          </div>
        </form>
        {shortURL ? (
          <div className="border rounded p-4">
            <p>
              Large URL:
              <span className="text-secondary">{largeURL || ""} </span>
            </p>
            <a href={shortURL}>{shortURL}</a>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                readOnly={true}
                value={shortURL}
              />
              <CopyToClipboard text={shortURL} onCopy={() => setCopied(true)}>
                <button
                  type="button"
                  className={`btn btn-${copied ? "" : "outline-"}primary`}
                  id="basic-addon1"
                >
                  {copied ? "Copied!" : " Copy URL"}
                </button>
              </CopyToClipboard>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
