import { useState } from "react";
import { nanoid } from "nanoid";
import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/sidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const id = nanoid(5);

  const handleStartAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  const handleAddProject = (projectdata) => {
    setProjectState((prevState) => {
      const newProject = {
        ...projectdata,
        id: id,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  const handleSelectProject = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectState((prevState) => {
      const filteredProjects = prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      );

      return {
        ...prevState,
        projects: filteredProjects,
        selectedProjectId: undefined,
      };
    });
  };

  const handleAddTask = (text) => {
    setProjectState((prevState) => {
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: id,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  };

  const handleDeleteTask = (id) => {
    setProjectState((prevState) => {
      const filteredTasks = prevState.tasks.filter((task) => task.id !== id);

      return {
        ...prevState,
        tasks: filteredTasks,
      };
    });
  };

  const handleCancelProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      onAddTask={handleAddTask}
      tasks={projectState.tasks}
      onDeleteTask={handleDeleteTask}
      onDelete={handleDeleteProject}
      project={selectedProject}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        cancel={handleCancelProject}
        onProjectData={handleAddProject}
      />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar
          projects={projectState.projects}
          onStartAddProject={handleStartAddProject}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectState.selectedProjectId}
        />
        {content}
      </main>
    </>
  );
}

export default App;
