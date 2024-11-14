import {
    Button,
    Box,
    Typography,
    TablePagination
} from '@mui/material'
import { allCategories } from '../constants/categories'
import { useManageTransactions } from '../hooks/useManageTransactions'
import { useFilterTransactions } from '../hooks/useFilterTransactions'
import { usePaginateTransactions } from '../hooks/usePaginateTransactions'
import TransactionForm from './TransactionForm'
import FiltersTransactions from './FiltersTransactions'
import TableOfTransactions from './TableOfTransactions'

function TransactionList() {
    const { showTransactionForm, handleDeleteTransaction, handleEdit, handleAddTransaction, handleSubmit, transactionToEdit } = useManageTransactions()
    const { filteredAndSortedTransactions, filterCategory, setFilterCategory, filterType, setFilterType, sortField, setSortField } = useFilterTransactions()
    const { paginatedTransactions, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePaginateTransactions({ filteredAndSortedTransactions })

    return (
        <Box p={{ xs: 0, sm: 4 }} >
            <Typography variant="h2" gutterBottom fontWeight={600} color={localStorage.getItem('theme') === 'dark' ? 'white' : '#222'} textAlign={{ xs: 'center', sm: 'left' }}>
                Transaction List
            </Typography>

            <Box display='flex' flexDirection={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems='center' gap={{ xs: 2, sm: 0 }} textAlign="center">
                <Box bgcolor='#b4cad8' width='fit-content' px='20px' py='20px' borderRadius='15px'>
                    <Button variant="contained" color="primary" onClick={handleAddTransaction} style={{ height: '3rem' }}>
                        Add Transaction
                    </Button>
                </Box>
                
                {
                    showTransactionForm && 
                        <TransactionForm 
                            handleSubmit={handleSubmit} 
                            transactionToEdit={transactionToEdit} 
                            allCategories={allCategories} 
                        />
                }

                <Box bgcolor='#c1b3e4' width='fit-content' px='20px' borderRadius='15px' textAlign="center">
                    <FiltersTransactions
                        filterCategory={filterCategory}
                        setFilterCategory={setFilterCategory}
                        filterType={filterType}
                        setFilterType={setFilterType}
                        sortField={sortField}
                        setSortField={setSortField}
                        allCategories={allCategories} 
                    />
                </Box>
            </Box>
            
            <Box mt={2} mb={8} style={{ padding: 24, borderRadius: '15px', marginTop: '20px', background: '#fcdf71', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <TableOfTransactions
                    paginatedTransactions={paginatedTransactions} 
                    handleEdit={handleEdit} 
                    handleDeleteTransaction={handleDeleteTransaction}        
                />

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredAndSortedTransactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{ color: '#222' }}
                    sx={{
                        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { textAlign: { xs: 'center', sm: 'left' }},
                        '& .MuiTablePagination-toolbar': { justifyContent: { xs: 'center', sm: 'space-between' }}
                    }}
                />
            </Box>
        </Box>
    )
}

export default TransactionList
