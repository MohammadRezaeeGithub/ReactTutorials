import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setPorjectState] = useState({
    selectedProjectId: undefined, //here undefined means we are doiing nothing
    projects: [],
  });

  function handleSelectProject(id) {
    setPorjectState((preStatePorject) => {
      return {
        ...preStatePorject,
        selectedProjectId: id, // we do exactly the same as handleStartAddProject and just change this field to the id we want to show
      };
    });
  }

  function handleStartAddProject() {
    setPorjectState((preStatePorject) => {
      return {
        ...preStatePorject,
        selectedProjectId: null, //here NUll is signal which means we are adding a new projects
      };
    });
  }

  function handleCancelAddProject() {
    setPorjectState((preStatePorject) => {
      return {
        ...preStatePorject,
        selectedProjectId: undefined, // we do exactly the same as handleStartAddProject and just change this field
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

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = <SelectedProject project={selectedProject} />;
  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddPorject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
