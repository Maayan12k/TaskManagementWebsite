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
import { useState } from "react";
import { NavigationBar } from "../shared-components/NavigationBar";
import { itemsProject1, itemsProject2 } from "./mock-data";
import { UserLocation } from "../constants-styles-types";

export const DashboardPage = (): JSX.Element => {
    const [selectedProject, setSelectedProject] = useState<string>("Project #1");

    const handleNavigationClick = (event: any) => {
        setSelectedProject(event.detail.text);
    };

    const selectedItems =
        selectedProject === "Project #1" ? itemsProject1 : itemsProject2;

    return (
        <>
            <NavigationBar userLocation={UserLocation.dashboard} />
            <AppLayout
                headerSelector="#h"
                navigation={
                    <SideNavigation
                        header={{
                            href: "#",
                            text: "Projects",
                        }}
                        onFollow={handleNavigationClick}
                        items={[
                            { type: "link", text: `Project #1`, href: "#" },
                            { type: "link", text: `Project #2`, href: "#" },
                        ]}
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
                            header: (item) => (
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
                                    <b>No resources</b>
                                    <Button>Create resource</Button>
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
