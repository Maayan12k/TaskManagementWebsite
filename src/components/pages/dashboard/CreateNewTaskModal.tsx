import { Modal, Box, SpaceBetween, Button, Container, Alert, FormField, Input } from "@cloudscape-design/components";

interface CreateNewProjectModalProps {
    visible: boolean;
    onDismiss: () => void;
    onCreate: () => void;
    loading: boolean;
}

export const CreateNewTaskModal = ({ visible, onDismiss, onCreate, loading }: CreateNewProjectModalProps): JSX.Element => {
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
                    <FormField label="Project Name">
                        <Input value={""} />
                    </FormField>
                </SpaceBetween>
            </Container>
        </Modal>
    );
};
