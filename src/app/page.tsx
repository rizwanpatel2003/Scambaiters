


import Leftbar from "./components/ui/Leftbar";
import MainContent from "./components/ui/MainContent";
import Sidebar from "./components/ui/Sidebar";

export default function Home() {
  return (
    
     <div className="w-full flex overflow-auto bg-white">
       <Sidebar></Sidebar>
      <MainContent></MainContent>
      <Leftbar></Leftbar>  
      {/* <div className="w-1/4 h-screen ">
        fuck you main content
        </div> */}
  
     </div>    
    
  );
}
