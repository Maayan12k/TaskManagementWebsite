import { Modal, Box, SpaceBetween, Button } from "@cloudscape-design/components";

interface DeleteTaskModalProps {
    visible: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
    loading: boolean;
    taskNameToBeDeleted: string;
}

export const DeleteTaskModal = ({
    visible,
    onDismiss,
    onConfirm,
    loading,
    taskNameToBeDeleted,
}: DeleteTaskModalProps): JSX.Element => {

    const modalHeader = (name: string) => {
        return `Delete Task: ${name}`;
    }

    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            header={modalHeader(taskNameToBeDeleted)}
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
            Are you sure you want to delete this task?
        </Modal>
    );
};
