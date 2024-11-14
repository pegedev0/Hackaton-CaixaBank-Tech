import React, { useCallback } from 'react'
import { Button } from '@mui/material'
import { Download as DownloadIcon } from '@mui/icons-material'
import PropTypes from 'prop-types'

const ExportButton = React.memo(function ExportButton({ data, filename = 'data.csv', headers, label = 'Export CSV' }) {
    
    const handleExport = useCallback(() => {
        const csvContent = convertArrayOfObjectsToCSV()
        const blob = new Blob([csvContent], { type: 'text/csvcharset=utf-8' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }, [data, filename, headers])

    const convertArrayOfObjectsToCSV = () => {
        const headerRow = headers.join(',')
        const dataRows = data.map(row =>
            headers.map(field => JSON.stringify(row[field], null, '')).join(',')
        )
        return [headerRow, ...dataRows].join('\n')
    }

    return (
        <Button
            style={{ height: '3rem' }}
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={!data || data.length === 0}
        >
            {label || 'Export CSV'}
        </Button>
    )
})

ExportButton.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    filename: PropTypes.string,
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
}

export default ExportButton
