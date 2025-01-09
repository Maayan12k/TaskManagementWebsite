import { Modal, Box, SpaceBetween, Button } from "@cloudscape-design/components";

interface DeleteProjectModalProps {
    visible: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
    loading: boolean;
    projectNameToBeDeleted: string;
}

export const DeleteProjectModal = ({
    visible,
    onDismiss,
    onConfirm,
    loading,
    projectNameToBeDeleted,
}: DeleteProjectModalProps): JSX.Element => {

    const modalHeader = (name: string) => {
        return `Delete Project: ${name}`;
    }

    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            header={modalHeader(projectNameToBeDeleted)}
            size="medium"
            footer={
                <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={onDismiss}>
                            Cancel
                        </Button>
                        <Button variant="primary" loading={loading} onClick={onConfirm} >
                            Confirm Delete
                        </Button>
                    </SpaceBetween>
                </Box>
            }
        >
            Are you sure you want to delete this project?
        </Modal>
    );
};
