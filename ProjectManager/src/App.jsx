import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";

function App() {
  const [projectState, setPorjectState] = useState({
    selectedProjectId: undefined, //here undefined means we are doiing nothing
    projects: [],
  });

  function handleStartAddProject() {
    setPorjectState((preStatePorject) => {
      return {
        ...preStatePorject,
        selectedProjectId: null, //here NUll is signal which means we are adding a new projects
      };
    });
  }

  function handleAddPorject(projectData) {
    setPorjectState((preState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...preState,
        selectedProjectId: undefined,
        projects: [...preState.projects, newProject],
      };
    });
  }

  console.log(projectState);

  let content;
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddPorject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
      />
      {content}
    </main>
  );
}

export default App;
