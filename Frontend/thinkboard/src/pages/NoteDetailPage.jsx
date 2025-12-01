import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";
import {Loader} from "lucide-react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Trash2Icon } from "lucide-react";
const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (error) {
                toast.error("Failed to fetch note");
                console.error("Error fetching note:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully");
            navigate("/");
        } catch (error) {
            toast.error("Failed to delete note");
            console.error("Error deleting note:", error);
        }
    }
    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Title and Content cannot be empty");
            return;
        }
        setSaving(true);
        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note updated successfully");
            navigate("/");
        } catch (error) {
            toast.error("Failed to update note");
            console.error("Error updating note:", error);
        } finally {
            setSaving(false);
        }
    }
    if (loading) {
        return (<div className="min-h-screen bg-base-200 flex items-center justify-center"><Loader className="animate-spin size-10"  /></div>);
    }
    return <div className="min-h-screen bg-base-200 ">
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <Link to="/" className="btn btn-ghost">
                <ArrowLeftIcon className="h-5 w-5" /> Back to Notes</Link>
                <button onClick={handleDelete} className="btn btn-primary btn-outline">
                  <Trash2Icon className="h-6 w-6 " />  Delete Note</button>
            </div>
            <div className="card bg-base-100 shadow-xl border-t-4 border-solid border-primary">
                <div className="card-body">
                    <div className ="form-control mb-4">
                        <label className="label">
                        <span className="text-2xl font-bold text-primary font-mono">TITLE</span>
                        </label>
                       <input type="text" value={note.title} onChange={(e) => setNote({...note, title: e.target.value})} className="input input-bordered w-full bg-base-200 text-base-content/70" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="text-2xl font-bold text-primary font-mono">CONTENT</span>
                        </label>
                        <textarea value={note.content} onChange={(e) => setNote({...note, content: e.target.value})} className="textarea textarea-bordered w-full bg-base-200 text-base-content/70" />
                    </div>
                    <div className="card-actions justify-end mt-4">
                        <button onClick={handleSave} className={`btn btn-primary`} disabled={saving}>
                           {    saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
export default NoteDetailPage;
