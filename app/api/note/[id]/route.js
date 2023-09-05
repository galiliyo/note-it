import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Note Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingNote = await Note.findById(params.id);

    if (!existingNote) {
      return new Response("Note not found", { status: 404 });
    }

    // Update the prompt with new data
    existingNote.prompt = prompt;
    existingNote.tag = tag;

    await existingNote.save();

    return new Response("Successfully updated the Notes", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Note", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Note.findByIdAndRemove(params.id);

    return new Response("Note deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
