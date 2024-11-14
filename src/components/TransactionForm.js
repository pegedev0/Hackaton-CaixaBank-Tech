import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FormTextField } from "./FormTextField";

export default function TransactionForm ({ handleSubmit, transactionToEdit, allCategories }) {
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: 'auto',
                height: 'auto',
                background: '#cfecfc',
                marginInline: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
            }}
        >
            <FormTextField
                name="description"
                label="Description"
                defaultValue={transactionToEdit?.description || ''}
                required={false}
            />

            <FormTextField
                name="amount"
                label="Amount"
                type="number"
                inputProps={{ step: "0.01" }}
                defaultValue={transactionToEdit?.amount || ''}
                required={true}
            />

            <FormControl variant="filled">
                <InputLabel>Type</InputLabel>

                <Select
                    name="type"
                    defaultValue={transactionToEdit?.type || ''}
                    required
                >
                    <MenuItem value="Income">Income</MenuItem>
                    <MenuItem value="Expense">Expense</MenuItem>
                </Select>
            </FormControl>

            {transactionToEdit && (
                <FormControl variant="filled">
                    <InputLabel>Category</InputLabel>
                    
                    <Select
                        name="category"
                        defaultValue={transactionToEdit?.category || ''}
                        required
                    >
                        {allCategories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <FormTextField
                name="date"
                label="Date"
                type="date"
                defaultValue={
                    transactionToEdit?.date || new Date().toISOString().split('T')[0]
                }
                required={true}
            />
            
            <Button type="submit" variant="contained" color="primary">
                {transactionToEdit ? 'Save Changes' : 'Add'}
            </Button>
        </Box>
    )
}