import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router";
import api from '../lib/axios.js';
const CreatePage = () => {

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title || !content){
            toast.error("Please fill in all fields");
            return;
        }
        setLoading(true);
        try{
            await api.post("/notes",{
                title,
                content
            });
            toast.success("Note created successfully");
            navigate("/");
        } catch (error) {
            toast.error("Failed to create note",error.message);
        } finally {
            setLoading(false);
        }
    };
    return <div className="min-h-screen bg-base-200">
    <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
        <Link to={"/"} className="btn btn-ghost mb-4">
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Notes</Link> 
        <div className="card bg-base-100 ">
        <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create a New Note</h2>
            <form onSubmit={handleSubmit}>  
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input 
                    type="text" 
                    placeholder="Enter title" 
                    className="input input-bordered w-full" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Content</span> 
                </label>
                <textarea 
                    placeholder="Enter content" 
                    className="textarea textarea-bordered w-full" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                />
            </div>
            <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                </button>
            </div>
            </form>
         </div>
    </div>
    </div>
    </div>
    </div>
}
export default CreatePage;