import { Modal, Box, SpaceBetween, Button, Container, Alert, FormField, Input, Select } from "@cloudscape-design/components";
import { useState } from "react";
import { Project } from "../constants-styles-types/types";

interface CreateNewTaskModalProps {
    visible: boolean;
    onDismiss: () => void;
    onCreate: () => void;
    loading: boolean;
    newTaskName: string;
    setNewTaskName: React.Dispatch<React.SetStateAction<string>>;
    newTaskDescription: string;
    setNewTaskDescription: React.Dispatch<React.SetStateAction<string>>;
    setNewTaskProjectId: React.Dispatch<React.SetStateAction<number>>;
    projects: Project[];
}

export const CreateNewTaskModal = ({
    visible,
    onDismiss,
    onCreate,
    loading,
    newTaskName,
    setNewTaskName,
    newTaskDescription,
    setNewTaskDescription,
    setNewTaskProjectId,
    projects
}: CreateNewTaskModalProps): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<{ label?: string; value?: string }>({ label: "Select a project" });
    const [showTaskNameError, setShowTaskNameError] = useState(false);

    const resetForm = () => {
        setSelectedOption({ label: "Select a project" });
        setNewTaskName("");
        setNewTaskDescription("");
        setNewTaskProjectId(NaN);
        setShowTaskNameError(false);
    };

    const handleDismiss = () => {
        onDismiss();
        resetForm();
    };

    const handleCreate = () => {
        onCreate();
        resetForm();
    };

    const handleTaskNameChange = (value: string) => {
        setNewTaskName(value);
        setShowTaskNameError(!value.trim());
    };

    const isCreateDisabled = !newTaskName.trim() || !selectedOption.value;

    const handleSelectChange = (selectedOption: { label?: string; value?: string }) => {
        setSelectedOption(selectedOption);

        const projectId = selectedOption.value ? parseInt(selectedOption.value, 10) : NaN;
        setNewTaskProjectId(projectId);
    };

    return (
        <Modal
            visible={visible}
            onDismiss={handleDismiss}
            header="Create New Task"
            size="medium"
            footer={
                <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={handleDismiss}>
                            Cancel
                        </Button>
                        <Button variant="primary" loading={loading} onClick={handleCreate} disabled={isCreateDisabled}>
                            Create
                        </Button>
                    </SpaceBetween>
                </Box>
            }
        >
            <Container>
                <SpaceBetween direction="vertical" size="l">
                    <Alert type="info" dismissible>
                        Note: Must select an existing project.
                    </Alert>
                    <FormField label="Task Name" errorText={showTaskNameError ? "Task name cannot be empty." : undefined}>
                        <Input value={newTaskName} onChange={({ detail }) => handleTaskNameChange(detail.value)} />
                    </FormField>
                    <FormField label="Task Description" >
                        <Input value={newTaskDescription} onChange={({ detail }) => setNewTaskDescription(detail.value)} />
                    </FormField>
                    <FormField label="Select a project">
                        <Select
                            selectedOption={selectedOption}
                            onChange={({ detail }) => handleSelectChange(detail.selectedOption)}
                            options={projects.map((project) => ({
                                label: project.name,
                                value: project.id.toString(),
                            }))}
                            placeholder="Choose a project"
                        />
                    </FormField>
                </SpaceBetween>
            </Container>
        </Modal>
    );
};
