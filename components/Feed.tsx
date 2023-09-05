"use client";

import { useState, useEffect, ChangeEventHandler, SyntheticEvent } from "react";

import PromptCard from "./PromptCard";
import { INote } from "@/models/note";

const NoteCardList = ({ data, handleTagClick } : {data : INote[] , handleTagClick : (v:string)=>void}) => {
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
  const [allNotes, setAllNotes] = useState<INote[]>([]);

  // Search states
  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchedResults, setSearchedResults] = useState<INote[]>([]);

  const fetchNotes = async () => {
    const response = await fetch("/api/note");
    const data = await response.json();
    console.log(data)
    setAllNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filterPrompts = (searchtext :string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allNotes.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.content),
    );
  };

  const handleSearchChange = (e : any) => {
    clearTimeout(searchTimeout as NodeJS.Timeout);
    setSearchText(e.target.value);
const timeout =  setTimeout(() => {
  const searchResult = filterPrompts(e.target.value);
  setSearchedResults(searchResult);
}, 500)
    // debounce method
    setSearchTimeout(
        timeout
    );
  };

  const handleTagClick = (tagName : string) => {
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
