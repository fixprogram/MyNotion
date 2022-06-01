import Editor from "./Editor";
import Sidebar from "./Sidebar";

export default function App() {
  return (
    <div className="h-screen w-screen overflow-hidden relative text-black flex">
      <Sidebar />
      <Editor />
    </div>
  );
}
