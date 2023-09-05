import Note from "@/models/note";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { userId, content, tag } = await request.json();

  try {
    await connectToDB();
    const newNote = new Note({ creator: userId, content, tag });
    console.log('newNote',newNote)
    await newNote.save();
    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new note", { status: 500 });
  }
};
