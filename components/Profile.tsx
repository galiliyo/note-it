import NoteCard from "./NoteCard";
import { INote } from "@/models/note";

interface Props {
  name: string;
  desc: string;
  data: any;
  handleEdit: any;
  handleDelete: any;
}
const Profile = ({ name, desc, data, handleEdit, handleDelete }: Props) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((note: INote) => (
          <NoteCard
            key={note._id}
            note={note}
            handleEdit={() => handleEdit && handleEdit(note)}
            handleDelete={() => handleDelete && handleDelete(note)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
