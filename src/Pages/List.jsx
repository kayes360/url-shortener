import React from "react";
import ListTable from "../Components/ListTable";

export default function List() { 
  // let locallyStoredLinks = Object.entries(localStorage); 
  const locallyStoredLinks = JSON.parse(localStorage.getItem("allLinks"));
   
  return (
    <>
      {locallyStoredLinks.length > 0 ? ( 
        <ListTable locallyStoredLinks={locallyStoredLinks} />
      ) : (
        <h1 className="container">No URL Found</h1>
      )}
    </>
  );
}
