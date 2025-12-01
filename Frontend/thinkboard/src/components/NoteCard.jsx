import { PenSquare, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";
const NoteCard = ({ note, setNotes }) => {

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id));
            toast.success("Note deleted successfully");
        }catch (error) {
            toast.error("Failed to delete note");
            console.error("Error deleting note:", error);}
    }
    return <div><Link to={`/note/${note._id}`} className="card bg-base-100 shadow-xl transition-all duration-200 border-t-4 border-solid border-primary">
        <div className="card-body">
            <h3 className="card-title text-primary font-mono">{note.title}</h3>
            <p className="text-base-content/70">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/50">{formatDate(new Date(note.createdAt))}</span>
                <div className="flex items-center gap-1">
                    <PenSquare className="size-4 text-base-content/70" />
                    <button className="btn btn-ghost btn-sm">
                        <Trash2Icon className="size-4 text-base-content/70" onClick={(e) => handleDelete(e, note._id)} />
                    </button>
                </div>
        </div>
        </div>
        </Link>
        </div>;
    
}
export default NoteCard;