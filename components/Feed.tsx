"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const NoteCardList = ({ data, handleTagClick }) => {
  console.log("data", data);
  return (
    <div className="mt-16 prompt_layout">
      {data.map((note) => (
        <PromptCard
          key={note._id}
          note={note}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allNotes, setAllNotes] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchNotes = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allNotes.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt),
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <NoteCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <NoteCardList data={allNotes} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
