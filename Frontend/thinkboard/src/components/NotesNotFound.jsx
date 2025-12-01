import { Notebook } from 'lucide-react';
import {Link} from "react-router";
const NotesNotFound = () => { 
    return (
        <div className="flex flex-col items-center justify-center py-20 space-y-6 max-w-md mx-auto text-center">
          <div className="bg-primary/10 rounded-full p-8">
          <Notebook className="size-12 text-primary" /></div>
          <h3 className="text-2xl font-semibold text-base-content/80">No Notes Found</h3>
          <p className="text-base text-base-content/60">You haven't created any notes yet. Click the button below to add your first note!</p>
        <Link to="/create" className="btn btn-primary">Create Note</Link>
        </div>
    );
}
export default NotesNotFound;