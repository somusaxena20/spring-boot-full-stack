import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

const notification = (title, description, status) => {
    toast({
        title,
        description, // Changed 'desc' to 'description'
        status,
        isClosable: true,
        duration: 4000,
    });
};

export const successNotification = (title, description) => {
    notification(
        title,
        description,
        "success" // Changed "Success" to lowercase
    );
};

export const errorNotification = (title, description) => {
    notification(
        title,
        description,
        "error" // Changed "Failed" to "error"
    );
};
