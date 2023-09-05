"use client";

import { SyntheticEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

const CreateNote = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState({ content: "", tag: "" });
  console.log(note);
  const createNote = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/note/new", {
        method: "POST",
        body: JSON.stringify({
          content: note.content,
          userId: (session?.user as { id: string }).id,
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
      type="Create"
      note={note}
      setNote={setNote}
      submitting={submitting}
      handleSubmit={createNote}
    />
  );
};

export default CreateNote;
