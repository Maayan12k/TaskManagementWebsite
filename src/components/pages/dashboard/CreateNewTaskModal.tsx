import { Modal, Box, SpaceBetween, Button, Container, Alert, FormField, Input, Select } from "@cloudscape-design/components";
import { useState } from "react";

interface CreateNewProjectModalProps {
    visible: boolean;
    onDismiss: () => void;
    onCreate: () => void;
    loading: boolean;
}

export const CreateNewTaskModal = ({ visible, onDismiss, onCreate, loading }: CreateNewProjectModalProps): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState({ label: "Option 1", value: "1" });
    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            header="Create New Task"
            size="medium"
            footer={
                <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={onDismiss}>
                            Cancel
                        </Button>
                        <Button variant="primary" loading={loading} onClick={onCreate}>
                            Create
                        </Button>
                    </SpaceBetween>
                </Box>
            }
        >
            <Container>
                <SpaceBetween direction="vertical" size="l">
                    <Alert type="info" dismissible>
                        Note: Task names within the same project must be unique.
                    </Alert>
                    <FormField label="Task Name">
                        <Input value={""} />
                    </FormField>
                    <FormField label="Select a project">
                        <Select
                            selectedOption={selectedOption}
                            onChange={({ detail }) =>
                                setSelectedOption({
                                    label: detail.selectedOption.label || "",
                                    value: detail.selectedOption.value || ""
                                })
                            }
                            options={[
                                { label: "Option 1", value: "1" },
                                { label: "Option 2", value: "2" },
                                { label: "Option 3", value: "3" },
                                { label: "Option 4", value: "4" },
                                { label: "Option 5", value: "5" }
                            ]}
                        />
                    </FormField>
                </SpaceBetween>
            </Container>
        </Modal>
    );
};
