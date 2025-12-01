import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import {useEffect,useState} from "react";
import api from '../lib/axios.js';
import toast from 'react-hot-toast'
import NotesNotFound from "../components/NotesNotFound.jsx";
const HomePage = () => {
    const [notes,setNotes] = useState([]);
    const[loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
        try{
           const res = await api.get('/notes');
            console.log(res.data)
           setNotes(res.data)
           toast.success("Note fetched successfully")
        } catch (error) {
            console.log("Error fetching notes")
            toast.error("Failed to load notes")
        }finally{
            setLoading(false);
        }
        };
        fetchNotes();
    }, []);
    return <div className="min-h-screen"> 
    <Navbar />
    <div className="max-w-7xl mx-auto p-4 mt-6">
         
        {loading && <div className="text-center text-primary py-10">Loading Notes...</div>}
        {notes.length === 0 && !loading && <NotesNotFound />}
       {notes.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {notes.map(note => (
     
        <NoteCard key={note._id} note={note} setNotes={setNotes} />
      
    ))}
  </div>
)}

    </div>
    </div>;
}
export default HomePage;