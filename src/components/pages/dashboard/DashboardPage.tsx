import {
    AppLayout,
    Box,
    Button,
    Cards,
    Header,
    Link,
    Modal,
    Pagination,
    SideNavigation,
    SpaceBetween,
    TextFilter,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { NavigationBar } from "../shared-components/NavigationBar";
import { exampleDashboard } from "./mock-data";
import { UserLocation } from "../constants-styles-types";
import { useClerk } from "@clerk/clerk-react";

export const DashboardPage = (): JSX.Element => {
    const [selectedProject, setSelectedProject] = useState<string>("Project #1");
    const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [navigationItems, setNavigationItems] = useState<any[]>([]);

    const clerk = useClerk();

    const handleNavigationClick = (event: any) => setSelectedProject(event.detail.text);

    const selectedItems =
        selectedProject === "Project #1" ? exampleDashboard.projects[0] : selectedProject === "Project #2" ? exampleDashboard.projects[1] : [];

    useEffect(() => {
        // Simulate data fetching
        const fetchProjects = async () => {
            // Fetch projects data from mock file (or an API in a real app)
            const projects = exampleDashboard.projects;
            const formattedItems = projects.map((_, index) => ({
                type: "link",
                text: `Project #${index + 1}`,
                href: "#",
            }));
            formattedItems.push({ type: "link", text: "New Project", href: "#" });
            setNavigationItems(formattedItems);
        };

        fetchProjects();
    }, []);

    const handleSignOutConfirmClick = () => {
        setLoading(true);
        clerk.signOut();
    };

    type Item = {
        name: string;
        description: string;
        type: string;
        size: string;
    };

    return (
        <>
            <NavigationBar userLocation={UserLocation.dashboard} setIsSignOutConfirmOpen={setIsSignOutConfirmOpen} />
            <Modal
                visible={isSignOutConfirmOpen}
                onDismiss={() => setIsSignOutConfirmOpen(false)}
                header='Confirm Sign Out?'
                size="medium"
                footer={
                    <Box float="right">
                        <SpaceBetween direction="horizontal" size="xs">
                            <Button variant="link" onClick={() => setIsSignOutConfirmOpen(false)}>Cancel</Button>
                            <Button variant="primary" loading={loading} onClick={() => handleSignOutConfirmClick()}>Sign Out</Button>
                        </SpaceBetween>
                    </Box>
                }
            >
                Are you sure you want to sign out?
            </Modal>
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
                toolsHide={true}
                content={
                    <Cards
                        ariaLabels={{
                            itemSelectionLabel: (e, t) => `select ${t.name}`,
                            selectionGroupLabel: "Item selection",
                        }}
                        cardDefinition={{
                            header: (item: Item) => (
                                <Link href="#" fontSize="heading-m">
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
                        loadingText="Loading resources"
                        stickyHeader
                        variant="full-page"
                        empty={
                            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                                <SpaceBetween size="m">
                                    <b>No Projects</b>
                                    <Button>Create Project</Button>
                                </SpaceBetween>
                            </Box>
                        }
                        filter={<TextFilter filteringPlaceholder="Find resources" filteringText="" />}
                        header={<Header variant="awsui-h1-sticky">{selectedProject} </Header>}
                        pagination={<Pagination currentPageIndex={1} pagesCount={2} />}
                    />
                }
            />
        </>
    );
};

