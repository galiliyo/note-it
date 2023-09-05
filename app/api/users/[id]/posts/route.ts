import Note from "@/models/note";
import { connectToDB } from "@/utils/database";

export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDB();

    const prompts = await Note.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
