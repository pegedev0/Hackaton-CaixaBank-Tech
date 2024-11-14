import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function TableOfTransactions ({ paginatedTransactions, handleEdit, handleDeleteTransaction }) {
    return (
        <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount (€)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedTransactions.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell>{new Date(transaction.date).toLocaleDateString('en-US')}</TableCell>
                                
                                <TableCell sx={{ display: 'flex', gap: '10px' }}>
                                    <Button onClick={() => handleEdit(transaction)} variant="contained" sx={{ background: '#09f' }}>
                                        Edit
                                    </Button>

                                    <Button onClick={() => handleDeleteTransaction(transaction.id)} variant="contained" sx={{ background: '#fc4242' }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}