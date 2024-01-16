import { useState, useEffect } from "react";
import mockData from "../utils/mockData";
import "./SearchComponent.css";
import Chip from "./chip";

function SearchChip() {
  // Initializations
  const data = mockData;
  const [addedUsers, setAddedUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [highlightedChipIndex, setHighlightedChipIndex] = useState(null);
  const [dealBreaker, setDealBreaker] = useState(false);

  // Function to add a chip
  const addChip = (person) => {
    setAddedUsers((users) => [...users, person]);
    setHighlightedChipIndex(null);
  };

  // Function to delete a chip
  const deleteChip = (personName) => {
    setAddedUsers((users) => {
      const updatedUsers = users.filter((item) => item.name !== personName);
      return JSON.parse(JSON.stringify(updatedUsers));
    });
  };

  // Handle keydown events in the input field
  const handleKeyDown = (event) => {
    console.log(event);

    // Check for Backspace key when search text is empty and there are added users
    if (
      event.key === "Backspace" &&
      searchText === "" &&
      addedUsers.length > 0
    ) {
      setHighlightedChipIndex(addedUsers.length - 1);
    }
  };

  // UseEffect to handle global keydown events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace" && highlightedChipIndex !== null) {
        // Logic to handle Backspace key
        if (dealBreaker === true) {
          deleteChip(addedUsers[highlightedChipIndex].name);
          setHighlightedChipIndex(null);
          setDealBreaker(false);
        } else if (highlightedChipIndex !== addedUsers.length - 1) {
          deleteChip(addedUsers[highlightedChipIndex].name);
          setHighlightedChipIndex(null);
        } else {
          setDealBreaker(true);
        }
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [highlightedChipIndex, dealBreaker, addedUsers]);

  return (
    <>
      {/* Render the added chips */}
      {addedUsers.map((item, index) => (
        <Chip
          key={item.email}
          user={item}
          onDelete={deleteChip}
          onClick={() => setHighlightedChipIndex(index)}
          highlighted={index === highlightedChipIndex}
        />
      ))}

      {/* Input field for searching */}
      <input
        type="text"
        className="search-component"
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setHideSuggestions(false)} // Show suggestions when input is focused
        onBlur={async () => {
          // Delay hiding suggestions to allow clicking on suggestions
          setTimeout(() => {
            setHideSuggestions(true);
          }, 200);
        }}
      />

      {/* Render search suggestions if not hidden */}
      <div className={`suggestion ${hideSuggestions ? "hidden" : ""}`}>
        {data
          .filter(
            (item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase()) &&
              !addedUsers.some((user) => user.name === item.name)
          )
          .map((item, key) => (
            <div key={key} onClick={() => addChip(item)}>
              {item.name}
              {"  "}
              {item.email}
            </div>
          ))}
      </div>
    </>
  );
}

export default SearchChip;
