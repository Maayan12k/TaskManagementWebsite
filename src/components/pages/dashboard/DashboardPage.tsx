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
import { Item } from "../constants-styles-types/types";

export const DashboardPage = (): JSX.Element => {
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [displayedTasks, setDisplayedTasks] = useState<any[] | null[]>([]);
    const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState<boolean>(false);
    const [isCreateNewProjectOpen, setIsCreateNewProjectOpen] = useState<boolean>(false);
    const [isCreateNewTaskOpen, setIsCreateNewTaskOpen] = useState<boolean>(false);
    const [isCreateNewTaskConfirmLoading, setIsCreateNewTaskConfirmLoading] = useState<boolean>(false);
    const [isSignOutLoading, setIsSignOutLoading] = useState<boolean>(false);
    const [isCreateNewProjectConfirmLoading, setIsCreateNewProjectConfirmLoading] = useState<boolean>(false);
    const [isCardsLoading, setIsCardsLoading] = useState<boolean>(false);

    const [isNewUser, setIsNewUser] = useState<boolean>(false);
    const [navigationItems, setNavigationItems] = useState<any[]>([]);

    const [newProjectName, setNewProjectName] = useState<string>("");
    const [newProjectDescription, setNewProjectDescription] = useState<string>("");

    const [newTaskName, setNewTaskName] = useState<string>("");
    const [newTaskDescription, setNewTaskDescription] = useState<string>("");
    const [newTaskProjectId, setNewTaskProjectId] = useState<number>(0);

    const clerk = useClerk();
    const { userId } = useAuth();

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

            const projects = navigationItems.map((project: any) => project.text);
            projects.push(newProjectName);

            setNavigationItems(projects.map((project: any) => ({
                text: project,
                href: `#`,
                type: "link",
            })));

            setSelectedProject(newProjectName);
            setNewProjectName("");
            setNewProjectDescription("");
        } catch (error) {
            console.error("Error creating project:", error);
        } finally {
            setIsCreateNewProjectConfirmLoading(false);
            setIsCreateNewProjectOpen(false);
        }

    }

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
                            selectionGroupLabel: "Item selection",
                        }}
                        cardDefinition={{
                            header: (item: Item) => (
                                <Link href="" fontSize="heading-m">
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
                            ],
                        }}
                        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
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
                        header={!isNewUser && <Header variant="awsui-h1-sticky">{selectedProject} </Header>}
                        pagination={!isNewUser && <Pagination currentPageIndex={1} pagesCount={2} />}
                    />
                }
            />
        </>
    );
};

