import React, { useState } from "react";

export default function ListTable({ allLinks, setAllLinks, fetchShortURL }) {
  // const links = JSON.parse(localStorage.getItem("allLinks"));
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
    console.log(id);
    let updatedLargeURL = "";
    if (largeURL) {
      updatedLargeURL = largeURL;
    } else {
      const matchedURL = allLinks.filter((link) => link.id === id);
      updatedLargeURL = matchedURL[0].largeURL;
    }
    try {
      const newShortURL = await fetchShortURL(updatedLargeURL);
      console.log(newShortURL); 
      setAllLinks((prevState) => {
        const editableLink = prevState.map((link) => {
          if (link.id === id) {
            return {
              ...link,
              largeURL,
              newShortURL,
              editable: !link.editable,
            };
          }
          return link;
        });
        localStorage.setItem("allLinks", JSON.stringify(editableLink));
        return editableLink;
      });  
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
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">state</th>
              <th scope="col">id</th>
              <th scope="col">Long URL</th>
              <th scope="col">Shortend URL</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allLinks.map((link) => (
              <tr key={link.id}>
                <th scope="row"> {link.editable + ""}</th>
                <th scope="row">{link.id}</th>
                <td>
                  {!link.editable ? (
                    <a
                      href={link.largeURL}
                      className="text-wrap"
                      target="_blank"
                      rel="noopener"
                    >
                      {link.largeURL}
                    </a>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        updateLink(e, link.id);
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        value={largeURL ? largeURL : link.largeURL}
                        onChange={(e) => setLargeURL(e.target.value)}
                      />
                      <button className=" btn btn-outline-primary">
                        Update Link
                      </button>
                    </form>
                  )}
                </td>
                <td>
                  <a href={link.newShortURL} target="_blank" rel="noopener">
                    {link.newShortURL}
                  </a>
                </td>
                <td>
                  <button
                    disabled={editing}
                    className=" fs-4 mx-2 btn btn-outline-primary bi bi-pencil-square"
                    onClick={() => {
                      editLink(link.id);
                    }}
                  ></button>
                  <button
                    disabled={editing}
                    className=" fs-4 mx-2 btn btn-outline-primary bi bi-trash"
                    onClick={() => deleteLink(link.id)}
                  ></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="container text-danger">no link</h1>
      )}
    </>
  );
}

 
