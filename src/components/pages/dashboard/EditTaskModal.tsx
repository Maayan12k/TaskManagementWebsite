import { Modal, Box, SpaceBetween, Button, Container, FormField, Input, Select } from "@cloudscape-design/components";
import { useState } from "react";
import { TaskStatus } from "../constants-styles-types/types";

interface EditTaskModalProps {
    visible: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
    loading: boolean;
    editedTaskName: string;
    setEditedTaskName: React.Dispatch<React.SetStateAction<string>>;
    editedTaskDescription: string;
    setEditedTaskDescription: React.Dispatch<React.SetStateAction<string>>;
    taskNameToBeEdited: string;
    editedTaskStatus: TaskStatus;
    setEditedTaskStatus: React.Dispatch<React.SetStateAction<TaskStatus>>;
}

export const EditTaskModal = ({
    visible,
    onDismiss,
    onConfirm,
    loading,
    editedTaskName,
    setEditedTaskName,
    editedTaskDescription,
    setEditedTaskDescription,
    taskNameToBeEdited,
    editedTaskStatus,
    setEditedTaskStatus
}: EditTaskModalProps): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<{ label?: string; value?: string }>({ label: editedTaskStatus as string, value: editedTaskStatus as string });

    const [showTaskNameError, setShowTaskNameError] = useState(false);

    const handleTaskNameChange = (value: string) => {
        setEditedTaskName(value);
        setShowTaskNameError(!value.trim());
    };

    const isCreateDisabled = !editedTaskName.trim() || !selectedOption.value;

    const handleSelectChange = (selectedOption: { label?: string; value?: string }) => {
        setSelectedOption(selectedOption);
        setEditedTaskStatus(selectedOption.value as TaskStatus);
    };

    const taskStatusOptions = Object.values(TaskStatus).map((status) => ({
        label: status,
        value: status,
    }));

    const modalHeader = (name: string) => {
        return `Edit Task: ${name}`;
    }

    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            header={modalHeader(taskNameToBeEdited)}
            size="medium"
            footer={
                <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={onDismiss}>
                            Cancel
                        </Button>
                        <Button variant="primary" loading={loading} onClick={onConfirm} disabled={isCreateDisabled}>
                            Confirm Edit
                        </Button>
                    </SpaceBetween>
                </Box>
            }
        >
            <Container>
                <SpaceBetween direction="vertical" size="l">
                    <FormField label="New Task Name" errorText={showTaskNameError ? "Task name cannot be empty." : undefined}>
                        <Input value={editedTaskName} onChange={({ detail }) => handleTaskNameChange(detail.value)} />
                    </FormField>
                    <FormField label="New Task Description" >
                        <Input value={editedTaskDescription} onChange={({ detail }) => setEditedTaskDescription(detail.value)} />
                    </FormField>
                    <FormField label="Update Status">
                        <Select
                            selectedOption={selectedOption}
                            onChange={({ detail }) => handleSelectChange(detail.selectedOption)}
                            options={taskStatusOptions}
                            placeholder="Status"
                        />
                    </FormField>
                </SpaceBetween>
            </Container>
        </Modal>
    );
};
