import React, { memo } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const BalanceOverTime = memo(({ data, dataKeyX, dataKeyY, lineColor = '#8884d8', labelX, labelY }) => {
    return (
        <ResponsiveContainer width="100%" height={300} style={{ padding: 18, borderRadius: '15px', background: `${localStorage.getItem('theme') === 'dark' ? '#222' : 'white'}`}}>
            <LineChart data={data}>
                <XAxis dataKey={dataKeyX} tickFormatter={(value) => value.slice(0, 10)} label={labelX} />
                <YAxis domain={['dataMin', 'dataMax']} label={labelY} />
                <Tooltip />
                <Line type="monotone" dataKey={dataKeyY} stroke={lineColor} />
            </LineChart>
        </ResponsiveContainer>
    )
})

export default BalanceOverTime
