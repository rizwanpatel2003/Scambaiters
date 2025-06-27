import Leftbar from "./components/ui/Leftbar";
import MainContent from "./components/ui/MainContent";
import Sidebar from "./components/ui/Sidebar";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-white dark:bg-black">
      {/* Sidebar: left, sticky, visible md+ */}
      <aside className="hidden md:flex md:flex-col md:sticky md:top-0 md:min-w-[240px] md:max-w-[300px] xl:min-w-[280px] xl:max-w-[350px] h-screen border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black z-20">
        <Sidebar />
      </aside>
      {/* Main content: center, max-w-3xl, always readable */}
      <main className="flex-1 flex flex-col items-center px-2 sm:px-4 md:px-8 py-4 mx-auto max-w-full md:max-w-3xl min-w-0">
        <MainContent />
      </main>
      {/* Leftbar: right, sticky, visible xl+ */}
      <aside className="hidden xl:flex xl:flex-col xl:sticky xl:top-0 xl:min-w-[260px] xl:max-w-[340px] h-screen border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black z-20">
        <Leftbar />
      </aside>
    </div>
  );
}
