import { Modal, Box, SpaceBetween, Button } from "@cloudscape-design/components";

interface SignOutConfirmModalProps {
    visible: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const SignOutConfirmModal = ({ visible, onDismiss, onConfirm, loading }: SignOutConfirmModalProps): JSX.Element => {
    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            header="Confirm Sign Out"
            size="medium"
            footer={
                <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={onDismiss}>
                            Cancel
                        </Button>
                        <Button variant="primary" loading={loading} onClick={onConfirm}>
                            Sign Out
                        </Button>
                    </SpaceBetween>
                </Box>
            }
        >
            Are you sure you want to sign out?
        </Modal>
    );
};
