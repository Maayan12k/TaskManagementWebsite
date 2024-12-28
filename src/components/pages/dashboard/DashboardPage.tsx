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
import { useParams } from 'react-router-dom';
import { NavigationBar } from "../shared-components/NavigationBar";
import { exampleDashboard } from "./mock-data";
import { UserLocation } from "../constants-styles-types";
import { useClerk } from "@clerk/clerk-react";
import { CreateNewProjectModal } from "./CreateNewProjectModal";
import { SignOutConfirmModal } from "./SignOutConfirmModal";
import { CreateNewTaskModal } from "./CreateNewTaskModal";
import axios from "axios";

export const DashboardPage = (): JSX.Element => {
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [displayedTasks, setDisplayedTasks] = useState<any[]>([]);
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

    const clerk = useClerk();
    const { userId } = useParams();

    const handleNavigationClick = (event: any) => {
        setSelectedProject(event.detail.text);
    };

    const selectedItems = isNewUser
        ? []
        : selectedProject === "Project #1"
            ? exampleDashboard.projects[0]
            : selectedProject === "Project #2"
                ? exampleDashboard.projects[1]
                : [];

    useEffect(() => {

        const fetchProjects = async () => {
            try {
                setIsCardsLoading(true);
                const response = await axios.get(`http://localhost:8080/projects/user/${userId}`);

                console.log("Projects:", response.data);

                if (response.data.length === 0) {
                    setIsNewUser(true);
                    console.log("No projects found for user");
                } else {
                    const projects = response.data.map((project: any) => ({
                        text: project.name,
                        href: `#`,
                        type: "link",
                    }));

                    setNavigationItems(projects);
                    setSelectedProject(projects[0].text);
                }

            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsCardsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleSignOutConfirmClick = () => {
        setIsSignOutLoading(true);
        clerk.signOut();
    };

    const handleCreateNewProjectConfirmClick = () => {
        setIsCreateNewProjectConfirmLoading(true);
        // Create new project
    }

    const handleCreateNewTaskConfirmClick = () => {
        setIsCreateNewTaskConfirmLoading(true);
        // Create new task
    }

    type Item = {
        name: string;
        description: string;
        type: string;
        size: string;
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
            />

            <CreateNewProjectModal
                visible={isCreateNewProjectOpen}
                onDismiss={() => setIsCreateNewProjectOpen(false)}
                onCreate={handleCreateNewProjectConfirmClick}
                loading={isCreateNewProjectConfirmLoading}
                projectName={newProjectName}
                setNewProjectName={setNewProjectName}
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
                                    {item.name}
                                </Link>
                            ),
                            sections: [
                                {
                                    id: "description",
                                    header: "Description",
                                    content: (item) => item.description,
                                },
                                {
                                    id: "type",
                                    header: "Type",
                                    content: (item) => item.type,
                                },
                                {
                                    id: "size",
                                    header: "Size",
                                    content: (item) => item.size,
                                },
                            ],
                        }}
                        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
                        items={selectedItems}
                        loading={isCardsLoading}
                        loadingText="Loading resources"
                        stickyHeader
                        variant="full-page"
                        empty={
                            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                                <SpaceBetween size="m">
                                    <b>No Projects</b>
                                    <Button onClick={() => setIsCreateNewProjectOpen(true)}>Create Project</Button>
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

