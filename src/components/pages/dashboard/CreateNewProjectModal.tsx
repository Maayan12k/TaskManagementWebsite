import { Modal, Box, SpaceBetween, Button, Container, Alert, FormField, Input } from "@cloudscape-design/components";
import { SetStateAction } from "react";

interface CreateNewProjectModalProps {
    visible: boolean;
    onDismiss: () => void;
    onCreate: () => void;
    loading: boolean;
    projectName: string;
    setNewProjectName: React.Dispatch<React.SetStateAction<string>>;
}

export const CreateNewProjectModal = ({ visible, onDismiss, onCreate, loading, projectName, setNewProjectName }: CreateNewProjectModalProps): JSX.Element => {
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
                        Note: Project names must be unique.
                    </Alert>
                    <FormField label="Project Name">
                        <Input value={projectName} onChange={({ detail }) => setNewProjectName(detail.value)} />
                    </FormField>
                </SpaceBetween>
            </Container>
        </Modal>
    );
};
