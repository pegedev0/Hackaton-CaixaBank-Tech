import React from 'react'
import { Alert, Button } from '@mui/material'
import { Download as DownloadIcon } from '@mui/icons-material'
import { profilerData } from '../utils/profilerData'

function DownloadProfilerData() {

    const handleDownload = () => {
        if (profilerData.length === 0) {
            <Alert severity="warning" sx={{ mb: 2 }}>
                No data available for download.
            </Alert>
            return
        }

        const jsonContent = JSON.stringify(profilerData, null, 2)
        const blob = new Blob([jsonContent], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'profilerData.json')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Button
            style={{ height: '3rem' }}
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
        >
            Download Profiler Data
        </Button>
    )
}

export default DownloadProfilerData
