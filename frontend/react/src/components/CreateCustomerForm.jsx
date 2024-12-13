import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import { saveCustomer } from "../services/client.js";
import { errorNotification, successNotification } from "../services/notification.js";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert status="error" mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select {...field} {...props}>
                {props.children}
            </Select>
            {meta.touched && meta.error ? (
                <Alert status="error" mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const CreateCustomerForm = ({ fetchCustomers }) => {
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                age: 0,
                gender: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Name is required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email address is required'),
                age: Yup.number()
                    .min(16, 'Must be at least 16 years of age')
                    .max(100, 'Must be less than 100 years of age')
                    .required('Age is required'),
                gender: Yup.string()
                    .oneOf(['MALE', 'FEMALE'], 'Invalid gender type')
                    .required('Gender is required'),
            })}
            onSubmit={(customer, { setSubmitting }) => {
                setSubmitting(true);
                saveCustomer(customer)
                    .then(res => {
                        successNotification("Customer Created", `${customer.name} was successfully created`);
                        fetchCustomers();
                    })
                    .catch(err => {
                        errorNotification(err.code, err.response.data.message);
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }}
        >
            {({ isValid, isSubmitting }) => (
                <Form>
                    <Stack spacing={4}>
                        <MyTextInput
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Jane"
                        />
                        <MyTextInput
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="jane@example.com"
                        />
                        <MyTextInput
                            label="Age"
                            name="age"
                            type="number"
                            placeholder="20"
                        />
                        <MySelect label="Gender" name="gender">
                            <option value="">Select a Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </MySelect>
                        <Button isDisabled={!isValid || isSubmitting} type="submit">
                            Submit
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default CreateCustomerForm;
