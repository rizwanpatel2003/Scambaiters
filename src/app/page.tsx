import Leftbar from "./components/ui/Leftbar";
import MainContent from "./components/ui/MainContent";
import Sidebar from "./components/ui/Sidebar";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-white dark:bg-black">
     
      <div className="w-1/4">
        <Sidebar />
      </div>
      
      <main className="w-full md:w-1/2 flex-1 flex flex-col items-center px-2 sm:px-4 md:px-8 py-4">
        <MainContent />
      </main>
      {/* Leftbar: hidden on mobile, visible on lg+ */}
      <div className="w-1/4">
        <Leftbar />
      </div>
    </div>
  );
}
