import { TextField } from "@mui/material";

export const FormTextField = ({ name, label, defaultValue, required, type }) => (
    <TextField
        name={name}
        label={label}
        variant="filled"
        defaultValue={defaultValue}
        required={required}
        type={type}
    />
);