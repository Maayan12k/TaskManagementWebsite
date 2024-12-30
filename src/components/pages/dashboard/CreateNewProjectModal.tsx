import { Modal, Box, SpaceBetween, Button, Container, Alert, FormField, Input } from "@cloudscape-design/components";
import { useState } from "react";

interface CreateNewProjectModalProps {
    visible: boolean;
    onDismiss: () => void;
    onCreate: () => void;
    loading: boolean;
    newProjectName: string;
    setNewProjectName: React.Dispatch<React.SetStateAction<string>>;
    newProjectDescription: string;
    setNewProjectDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const CreateNewProjectModal = ({
    visible,
    onDismiss,
    onCreate,
    loading,
    newProjectName,
    setNewProjectName,
    newProjectDescription,
    setNewProjectDescription
}: CreateNewProjectModalProps): JSX.Element => {
    const [showError, setShowError] = useState(false);

    const handleProjectNameChange = (value: string) => {
        setNewProjectName(value);
        setShowError(!value.trim());
    };

    const isCreateDisabled = !newProjectName.trim();

    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            header="Create New Project"
            size="medium"
            footer={
                <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={onDismiss}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            loading={loading}
                            onClick={onCreate}
                            disabled={isCreateDisabled}
                        >
                            Create
                        </Button>
                    </SpaceBetween>
                </Box>
            }
        >
            <Container>
                <SpaceBetween direction="vertical" size="l">
                    <Alert type="info" dismissible>
                        Note: Project names must be unique.
                    </Alert>
                    <FormField
                        label="Project Name"
                        errorText={showError ? "Project name cannot be empty." : undefined}
                    >
                        <Input
                            value={newProjectName}
                            onChange={({ detail }) => handleProjectNameChange(detail.value)}
                        />
                    </FormField>
                    <FormField label="Project Description">
                        <Input
                            value={newProjectDescription}
                            onChange={({ detail }) => setNewProjectDescription(detail.value)}
                        />
                    </FormField>
                </SpaceBetween>
            </Container>
        </Modal>
    );
};
