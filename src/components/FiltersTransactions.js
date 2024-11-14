import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export default function FiltersTransactions ({ filterCategory, setFilterCategory, filterType, setFilterType, sortField, setSortField, allCategories  }) {
    return (
        <Box sx={{ display: 'flex', gap: 2, my: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-category-label" style={{ paddingInline: 8, background: `${localStorage.getItem('theme') === 'dark' ? '#222' : '#c1b3e4'}` }}>Category</InputLabel>

                    <Select
                        labelId="filter-category-label"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        style={{ background: `${localStorage.getItem('theme') === 'dark' ? '#222' : '#c1b3e4'}` }}
                    >
                        <MenuItem value="">All</MenuItem>

                        {allCategories.map(category => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-type-label" style={{ paddingInline: 8, background: `${localStorage.getItem('theme') === 'dark' ? '#222' : '#c1b3e4'}` }}>Type</InputLabel>

                    <Select
                        labelId="filter-type-label"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{ background: `${localStorage.getItem('theme') === 'dark' ? '#222' : '#c1b3e4'}` }}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="sort-field-label" style={{ paddingInline: 8, background: `${localStorage.getItem('theme') === 'dark' ? '#222' : '#c1b3e4'}` }}>Sort By</InputLabel>
                    
                    <Select
                        labelId="sort-field-label"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                        style={{ background: `${localStorage.getItem('theme') === 'dark' ? '#222' : '#c1b3e4'}` }}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="amount">Amount</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                    </Select>
                </FormControl>
            </Box>
    )
}