"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { INote } from "@/models/note";

interface props {
  note: INote;
  handleEdit: (v: INote) => void;
  handleDelete: (v: INote) => void;
  handleTagClick?: (v: string) => void;
}

const NoteCard = ({
  note,
  handleEdit,
  handleDelete,
  handleTagClick,
}: props) => {
  console.log("note", note);
  const { data: session } = useSession();
  console.log("session", session);

  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState<boolean | string>(false);

  const handleProfileClick = () => {
    console.log(note);

    if (note.creator._id === (session?.user as { id: string }).id) {
      return router.push("/profile");
    }

    router.push(`/profile/${note.creator._id}?name=${note.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(note.content);
    navigator.clipboard.writeText(note.content);
    setTimeout(() => setCopied(false), 3000);
  };
  if (!note) return null;
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={note?.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {note.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {note.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === note.content
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === note.content ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{note?.content}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(note.tag)}
      >
        #{note.tag}
      </p>
      {session?.user?.id === note.creator._id && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit(note)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete(note)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
