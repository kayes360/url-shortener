import React, { useState } from "react";
import handleRedirect from "../utils";

export default function ListTable({ allLinks, setAllLinks, fetchShortURL }) {
  const [editing, setEditing] = useState(false);
  const [largeURL, setLargeURL] = useState("");
 
  const editLink = (id) => {
    setAllLinks((prevState) => {
      const editableLink = prevState.map((link) => {
        if (link.id === id) {
          return {
            ...link,
            editable: !link.editable,
            
          };
        }
        return link;
      });
      return editableLink;
    });
  };

  const updateLink = async (e, id) => {
    e.preventDefault();
  
    let updatedLargeURL = largeURL || allLinks.find((link) => link.id === id).largeURL;
  
    try {
      const newShortURL = fetchShortURL(updatedLargeURL); // No need for `await` since it's not async
  
      setAllLinks((prevState) => {
        const updatedLinks = prevState.map((link) => {
          if (link.id === id) {
            return {
              ...link,
              largeURL: updatedLargeURL,
              newShortURL,
              editable: false, // Ensure it exits edit mode
            };
          }
          return link;
        });
  
        localStorage.setItem("allLinks", JSON.stringify(updatedLinks));
        return updatedLinks;
      });
  
      setLargeURL(""); // Reset input field
    } catch (error) {
      console.error(error);
    }
  };
  

  const deleteLink = (id) => {
    const updatedLinks = allLinks.filter((link) => link.id !== id);
    setAllLinks(updatedLinks);
    localStorage.setItem("allLinks", JSON.stringify(updatedLinks));
  };

  return (
    <>
      {allLinks.length > 0 ? (
        <table className="table table-striped table-bordered table-hover container mt-4">
          <thead className="table-light">
            <tr> 
              <th scope="col">ID</th>
              <th scope="col">Long URL</th>
              <th scope="col">Shortened URL</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allLinks.map((link) => (
                <tr key={link.id}> 
                <td>{link.id}</td>
                <td className="largeURL">
                  {!link.editable ? (
                    <a
                      href={link.largeURL}
                      className="text-wrap"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.largeURL}
                    </a>
                  ) : (
                    <form onSubmit={(e) => updateLink(e, link.id)}>
                      <input
                        type="text"
                        className="form-control"
                        value={largeURL || link.largeURL}
                        onChange={(e) => setLargeURL(e.target.value)}
                      />
                      <div className="d-flex gap-2">
                          <button className="btn btn-outline-primary mt-2">
                            Update Link
                          </button>
                          <button className="btn btn-outline-dark mt-2" onClick={() => { setEditing(false) }}>
                            Cancel
                          </button>
                          
                      </div>
                    </form>
                  )}
                </td>
                <td>
                
                  <p   className="text-primary link-underline-primary link-text" onClick={() => handleRedirect(link.newShortURL)}>{link.newShortURL || ""} </p>
                </td>
                <td>
                  <button
                    disabled={editing}
                    className="btn btn-sm btn-outline-primary mx-1"
                    onClick={() => editLink(link.id)}
                  >
                    Edit
                  </button>
                  <button
                    disabled={editing}
                    className="btn btn-sm btn-outline-danger mx-1"
                    onClick={() => deleteLink(link.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="container text-danger">No links available</h1>
      )}
    </>
  );
}