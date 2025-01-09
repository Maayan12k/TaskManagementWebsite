import {
    AppLayout,
    Box,
    Button,
    Cards,
    Header,
    Link,
    Pagination,
    SideNavigation,
    SpaceBetween,
    TextFilter,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { NavigationBar } from "../shared-components/NavigationBar";
import { UserLocation } from "../constants-styles-types";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { CreateNewProjectModal } from "./CreateNewProjectModal";
import { SignOutConfirmModal } from "./SignOutConfirmModal";
import { CreateNewTaskModal } from "./CreateNewTaskModal";
import axios from "axios";
import { Project, Task, TaskStatus } from "../constants-styles-types/types";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { DeleteProjectModal } from "./DeleteProjectModal";

export const DashboardPage = (): JSX.Element => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [displayedTasks, setDisplayedTasks] = useState<any[] | null[]>([]);

    const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState<boolean>(false);
    const [isSignOutLoading, setIsSignOutLoading] = useState<boolean>(false);

    const [isCreateNewProjectOpen, setIsCreateNewProjectOpen] = useState<boolean>(false);
    const [isCreateNewTaskOpen, setIsCreateNewTaskOpen] = useState<boolean>(false);
    const [isCreateNewTaskConfirmLoading, setIsCreateNewTaskConfirmLoading] = useState<boolean>(false);
    const [isCreateNewProjectConfirmLoading, setIsCreateNewProjectConfirmLoading] = useState<boolean>(false);

    const [isCardsLoading, setIsCardsLoading] = useState<boolean>(false);

    const [isNewUser, setIsNewUser] = useState<boolean>(false);
    const [navigationItems, setNavigationItems] = useState<any[]>([]);

    const [newProjectName, setNewProjectName] = useState<string>("");
    const [newProjectDescription, setNewProjectDescription] = useState<string>("");

    const [newTaskName, setNewTaskName] = useState<string>("");
    const [newTaskDescription, setNewTaskDescription] = useState<string>("");
    const [newTaskProjectId, setNewTaskProjectId] = useState<number>(0);

    const [editedTaskName, setEditedTaskName] = useState<string>("");
    const [editedTaskDescription, setEditedTaskDescription] = useState<string>("");
    const [editedTaskStatus, setEditedTaskStatus] = useState<TaskStatus>(TaskStatus.BACKLOG);
    const [editedTaskId, setEditedTaskId] = useState<number>(-1);
    const [taskNameToBeEdited, setTaskNameToBeEdited] = useState<string>("");
    const [isEditedTaskModalOpen, setIsEditedTaskModalOpen] = useState<boolean>(false);

    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState<boolean>(false);
    const [deletedTaskId, setDeletedTaskId] = useState<number>(-1);
    const [deletedTaskName, setDeletedTaskName] = useState<string>("");
    const [isDeleteTaskModalLoading, setIsDeleteTaskModalLoading] = useState<boolean>(false);

    const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState<boolean>(false);
    const [deletedProjectId, setDeletedProjectId] = useState<number>(-1);
    const [deletedProjectName, setDeletedProjectName] = useState<string>("");
    const [isDeleteProjectModalLoading, setIsDeleteProjectModalLoading] = useState<boolean>(false);

    const clerk = useClerk();
    // const { userId } = useAuth();
    const userId = 1;

    const handleNavigationClick = (event: any) => {
        const clickedProject = projects.find((project) => project.name === event.detail.text);
        if (clickedProject) {
            setSelectedProject(clickedProject.name);
            setDisplayedTasks(clickedProject.tasks);
        } else {
            setDisplayedTasks([]);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsCardsLoading(true);
                const response = await axios.get(`http://localhost:8080/projects/user/${userId}`);

                console.log("Projects fetched:", response.data);

                if (response.data.length === 0) {
                    setIsNewUser(true);
                } else {
                    setProjects(response.data);
                    setNavigationItems(
                        response.data.map((project: any) => ({
                            text: project.name,
                            href: `#`,
                            type: "link",
                            id: project.id,
                        }))
                    );
                    setSelectedProject(response.data[0].name);
                    setDisplayedTasks(response.data[0].tasks);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsCardsLoading(false);
            }
        };

        fetchProjects();
    }, [userId]);

    const handleSignOutConfirmClick = () => {
        setIsSignOutLoading(true);
        clerk.signOut();
    };

    const handleCreateNewProjectConfirmClick = async () => {
        setIsCreateNewProjectConfirmLoading(true);

        try {
            const response = await axios.post("http://localhost:8080/projects", {
                name: newProjectName,
                description: newProjectDescription,
                projectOwnerId: userId,
            });

            console.log("Project created:", response.data);

            const newProject = response.data;
            setProjects((prevProjects) => [...prevProjects, newProject]);

            setNavigationItems((prevNavigationItems) => [
                ...prevNavigationItems,
                {
                    text: newProject.name,
                    href: `#`,
                    type: "link",
                    id: newProject.id,
                },
            ]);

            setNewProjectName("");
            setNewProjectDescription("");
        } catch (error) {
            console.error("Error creating project:", error);
        } finally {
            setIsCreateNewProjectConfirmLoading(false);
            setIsCreateNewProjectOpen(false);
        }
    };


    const handleCreateNewTaskConfirmClick = async () => {
        setIsCreateNewTaskConfirmLoading(true);

        try {
            const response = await axios.post("http://localhost:8080/tasks", {
                title: newTaskName,
                description: newTaskDescription,
                projectId: newTaskProjectId,
            });

            console.log("Task created:", response.data);

            const updatedProjects = [...projects];
            const selectedProjectIndex = updatedProjects.findIndex(
                (project) => project.id === newTaskProjectId
            );

            if (selectedProjectIndex !== -1) {
                updatedProjects[selectedProjectIndex].tasks.push(response.data);
            }

            setProjects(updatedProjects);

            if (updatedProjects[selectedProjectIndex]?.name === selectedProject) {
                setDisplayedTasks(updatedProjects[selectedProjectIndex].tasks);
            }

            setNewTaskName("");
            setNewTaskDescription("");
        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            setIsCreateNewTaskConfirmLoading(false);
            setIsCreateNewTaskOpen(false);
        }
    };

    const handleEditTaskButtonClick = (taskId: number, taskName: string, taskDescription: string, taskStatus: string) => {
        setIsEditedTaskModalOpen(true);
        setEditedTaskId(taskId);
        setTaskNameToBeEdited(taskName);
        setEditedTaskName(taskName);
        setEditedTaskDescription(taskDescription);
        setEditedTaskStatus(taskStatus as TaskStatus);
    }

    const handleConfirmEditClick = async () => {
        try {
            const updatedTask = {
                title: editedTaskName,
                description: editedTaskDescription,
                status: editedTaskStatus,
            };

            const response = await axios.put(`http://localhost:8080/tasks/${editedTaskId}`, updatedTask);
            console.log("Updated task:", response.data);

            setDisplayedTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === editedTaskId ? { ...task, ...updatedTask } : task
                )
            );

            setProjects((prevProjects) =>
                prevProjects.map((project) => ({
                    ...project,
                    tasks: project.tasks.map((task: Task) =>
                        task.id === editedTaskId ? { ...task, ...updatedTask } : task
                    ),
                }))
            );
        } catch (error) {
            console.error(error);
        } finally {
            setIsEditedTaskModalOpen(false);
        }
    }

    const handleDeleteTaskButtonClick = (taskName: string, taskId: number) => {
        setIsDeleteTaskModalOpen(true);
        setDeletedTaskId(taskId);
        setDeletedTaskName(taskName);
    }

    const handleConfirmDeleteTaskClick = async () => {
        setIsDeleteTaskModalLoading(true);

        try {
            const response = await axios.delete(`http://localhost:8080/tasks/${deletedTaskId}`);
            console.log("Deleted task:", response.data);

            setDisplayedTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== deletedTaskId)
            );

            setProjects((prevProjects) =>
                prevProjects.map((project) => ({
                    ...project,
                    tasks: project.tasks.filter((task: Task) => task.id !== deletedTaskId),
                }))
            );

        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleteTaskModalLoading(false);
            setIsDeleteTaskModalOpen(false);
        }
    };

    const handleDeleteProjectButtonClick = (projectName: string, projectId: number) => {
        setIsDeleteProjectModalOpen(true);
        setDeletedProjectId(projectId);
        setDeletedProjectName(projectName);
    }

    const handleConfirmProjectDeleteClick = async () => {
        setIsDeleteProjectModalLoading(true);

        try {
            const response = await axios.delete(`http://localhost:8080/projects/${deletedProjectId}`);
            console.log("Deleted Project status:", response.status);
            console.log(deletedProjectName);
            setProjects((prevProjects) => prevProjects.filter(project => project.name !== deletedProjectName));
        } catch (error) {
            console.error("Error deleting project:", error);
        } finally {
            setIsDeleteProjectModalLoading(false);
            setIsDeleteProjectModalOpen(false);

            if (projects.length > 0) {
                setSelectedProject(projects[0].name);
            } else {
                setSelectedProject("");
            }
        }
    };

    return (
        <>
            <NavigationBar
                userLocation={UserLocation.dashboard}
                setIsSignOutConfirmOpen={setIsSignOutConfirmOpen}
                setIsCreateNewProjectOpen={setIsCreateNewProjectOpen}
                setIsCreateNewTaskOpen={setIsCreateNewTaskOpen}
            />

            <CreateNewTaskModal
                visible={isCreateNewTaskOpen}
                onDismiss={() => setIsCreateNewTaskOpen(false)}
                onCreate={handleCreateNewTaskConfirmClick}
                loading={isCreateNewTaskConfirmLoading}
                newTaskName={newTaskName}
                setNewTaskName={setNewTaskName}
                newTaskDescription={newTaskDescription}
                setNewTaskDescription={setNewTaskDescription}
                setNewTaskProjectId={setNewTaskProjectId}
                projects={projects}
            />

            <CreateNewProjectModal
                visible={isCreateNewProjectOpen}
                onDismiss={() => setIsCreateNewProjectOpen(false)}
                onCreate={handleCreateNewProjectConfirmClick}
                loading={isCreateNewProjectConfirmLoading}
                newProjectName={newProjectName}
                setNewProjectName={setNewProjectName}
                newProjectDescription={newProjectDescription}
                setNewProjectDescription={setNewProjectDescription}
            />

            <SignOutConfirmModal
                visible={isSignOutConfirmOpen}
                onDismiss={() => setIsSignOutConfirmOpen(false)}
                onConfirm={handleSignOutConfirmClick}
                loading={isSignOutLoading}
            />

            <EditTaskModal
                visible={isEditedTaskModalOpen}
                onDismiss={() => setIsEditedTaskModalOpen(false)}
                onConfirm={handleConfirmEditClick}
                loading={false}
                editedTaskName={editedTaskName}
                setEditedTaskName={setEditedTaskName}
                editedTaskDescription={editedTaskDescription}
                setEditedTaskDescription={setEditedTaskDescription}
                taskNameToBeEdited={taskNameToBeEdited}
                editedTaskStatus={editedTaskStatus}
                setEditedTaskStatus={setEditedTaskStatus}
            />

            <DeleteTaskModal
                visible={isDeleteTaskModalOpen}
                onDismiss={() => setIsDeleteTaskModalOpen(false)}
                loading={isDeleteTaskModalLoading}
                taskNameToBeDeleted={deletedTaskName}
                onConfirm={handleConfirmDeleteTaskClick}
            />

            <DeleteProjectModal
                visible={isDeleteProjectModalOpen}
                onDismiss={() => setIsDeleteProjectModalOpen(false)}
                loading={isDeleteProjectModalLoading}
                projectNameToBeDeleted={deletedProjectName}
                onConfirm={handleConfirmProjectDeleteClick}
            />


            <AppLayout
                headerSelector="#h"
                navigation={
                    <SideNavigation
                        header={{
                            href: "#",
                            text: "Projects",
                        }}
                        onFollow={handleNavigationClick}
                        items={navigationItems}
                    />
                }
                navigationHide={isNewUser}
                toolsHide={true}
                content={
                    <Cards
                        ariaLabels={{
                            itemSelectionLabel: (e, t) => `select ${t.name}`,
                            selectionGroupLabel: "Task selection",
                        }}
                        cardDefinition={{
                            header: (item: Task) => (
                                <Link fontSize="heading-m">
                                    {item.title}
                                </Link>

                            ),
                            sections: [
                                {
                                    id: "description",
                                    header: "Description",
                                    content: (item) => item.description,
                                },
                                {
                                    id: "status",
                                    header: "Status",
                                    content: (item) => item.status,
                                },
                                {
                                    id: "taskButtons",
                                    content: (item: Task) => <SpaceBetween size="m" direction="horizontal">
                                        <Button iconName="edit" variant="icon" onClick={() => handleEditTaskButtonClick(item.id, item.title, item.description, item.status)} />
                                        <Button iconName="remove" variant="icon" onClick={() => handleDeleteTaskButtonClick(item.title, item.id)} />
                                    </SpaceBetween>,
                                },
                            ],
                        }}
                        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 3 }]}
                        items={displayedTasks}
                        loading={isCardsLoading}
                        loadingText="Loading resources"
                        stickyHeader
                        variant="full-page"
                        empty={
                            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                                <SpaceBetween size="m">
                                    {projects.length === 0 ? (
                                        <>
                                            <b>No Projects</b>
                                            <Button onClick={() => setIsCreateNewProjectOpen(true)}>Create Project</Button>
                                        </>
                                    ) : (
                                        <>
                                            <b>No Tasks</b>
                                            <Button onClick={() => setIsCreateNewTaskOpen(true)}>Create Task</Button>
                                        </>
                                    )}
                                </SpaceBetween>
                            </Box>
                        }
                        filter={!isNewUser && <TextFilter filteringPlaceholder="Find resources" filteringText="" />}
                        header={!isNewUser &&
                            <SpaceBetween size="m" direction="horizontal">
                                <Header variant="awsui-h1-sticky">{selectedProject}</Header>
                                <Button variant="icon" iconName="remove" onClick={() => {
                                    const selectedProjectData = projects.find(
                                        (project) => project.name === selectedProject
                                    );
                                    if (selectedProjectData) {
                                        handleDeleteProjectButtonClick(selectedProjectData.name, selectedProjectData.id);
                                    }
                                }} />
                            </SpaceBetween>
                        }
                        pagination={!isNewUser && <Pagination currentPageIndex={1} pagesCount={2} />}
                    />
                }
            />
        </>
    );
};

