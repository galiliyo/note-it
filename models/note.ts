import { Schema, model, models } from 'mongoose';


const NoteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: [true, 'Content is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

const Note = models.Note || model('Note', NoteSchema);

export default Note;
export interface INote extends Document {
  _id?:string;
  creator:  {username : string ; _id:string; image:string; email:string}; // TODO: what type is this?
  content: string;
  tag: string;
}