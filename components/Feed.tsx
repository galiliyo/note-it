"use client";

import { useState, useEffect, ChangeEventHandler, SyntheticEvent } from "react";

import NoteCard from "./NoteCard";
import { INote } from "@/models/note";
import { useRouter } from "next/navigation";

const NoteCardList = ({
  data,
  handleTagClick,
  handleDelete,
  handleEdit,
}: {
  data: INote[];
  handleTagClick: (v: string) => void;
  handleDelete: (v: INote) => void;
  handleEdit: (v: INote) => void;
}) => {
  console.log("data", data);

  return (
    <div className="mt-16 prompt_layout">
      {data.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          handleTagClick={handleTagClick}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const router = useRouter();
  const [allNotes, setAllNotes] = useState<INote[]>([]);

  // Search states
  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [searchedResults, setSearchedResults] = useState<INote[]>([]);

  const fetchNotes = async () => {
    const response = await fetch("/api/note");
    const data = await response.json();
    console.log(data);
    setAllNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allNotes.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.content),
    );
  };

  const handleSearchChange = (e: any) => {
    clearTimeout(searchTimeout as NodeJS.Timeout);
    setSearchText(e.target.value);
    const timeout = setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
    // debounce method
    setSearchTimeout(timeout);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleEdit = (note: INote) => {
    router.push(`/update-note?id=${note._id}`);
  };

  const handleDelete = async (note: INote) => {
    const hasConfirmed = confirm("Are you sure you want to delete this note?");

    if (hasConfirmed && note?._id) {
      try {
        await fetch(`/api/note/${note._id.toString()}`, {
          method: "DELETE",
        });

        const filteredNotes = allNotes.filter((item) => item._id !== note._id);

        setAllNotes(filteredNotes);
      } catch (error) {
        console.log(error);
      }
    }
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

      {/* All Notes */}

      <NoteCardList
        data={searchText ? searchedResults : allNotes}
        handleTagClick={handleTagClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Feed;
