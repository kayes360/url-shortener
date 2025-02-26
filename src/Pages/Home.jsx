import React, { useEffect, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import handleRedirect from "../utils";

export default function Home({
  handleSubmit,
  addedURL,
  largeURL,
  setLargeURL,
  shortURL,
  copied,
  setCopied,
}) {
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
            <div>
              <div className="d-flex align-items-center gap-2">  
                <p>Large URL: {" "}</p>
                <p> 
                  <a href={addedURL} className="text-primary">{addedURL || ""} </a>
                </p>
              </div>
              <div className="d-flex align-items-center gap-2"> 
                <p>Shortened URL: {" "}</p>
               
                  <p   className="text-primary link-text" onClick={() => handleRedirect(shortURL)}>{shortURL || ""} </p>
                 
              </div>
            </div>

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
