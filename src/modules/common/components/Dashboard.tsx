import { JiraPage } from "../../jira/pages/JiraPage";
import { SideMenu } from "./SideMenu"

export const Dashboard = () => {
  return (
    <main>
      <div className="bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
        <div className="flex flex-row relative w-screen">
          {/* SideMenu */}

          <SideMenu />

          <div className="w-full p-4">
            {/* Pagina de Tasks Jira Page*/}
            <JiraPage />
          </div>
        </div>
      </div>
    </main>
  );
};
