"use client";
import { useState, useEffect, ChangeEventHandler, SyntheticEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Form";

const UpdateNote = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");

  const [note, setNote] = useState({ content: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getNoteDetails = async () => {
      const response = await fetch(`/api/note/${noteId}`);
      const data = await response.json();
      setNote({
        content: data.content,
        tag: data.tag,
      });
    };

    if (noteId) getNoteDetails();
  }, [noteId]);

  const updateNote = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!noteId) return alert("Missing NoteId!");

    try {
      const response = await fetch(`/api/note/${noteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          content: note.content,
          tag: note.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      note={note}
      setNote={setNote}
      submitting={submitting}
      handleSubmit={updateNote}
    />
  );
};

export default UpdateNote;
