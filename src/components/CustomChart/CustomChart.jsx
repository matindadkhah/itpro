import React, { useState, useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// ⚡️ فونت شبنم باید توی پروژه اضافه بشه (مثلاً توی index.css یا global.css)
const theme = createTheme({
    typography: {
        fontFamily: "Shabnam, Arial, sans-serif",
    },
});

export default function CustomChart({ data = [] }) {
    const [groupBy, setGroupBy] = useState("purchaseDate");

    const getYear = (dateStr) => new Date(dateStr).getFullYear();

    const chartData = useMemo(() => {
        if (!data || data.length === 0) return { labels: [], values: [] };

        const grouped = {};

        data.forEach((item) => {
            let key;
            switch (groupBy) {
                case "purchaseDate":
                    key = getYear(item.purchaseDate);
                    break;
                case "status":
                    key = item.status;
                    break;
                case "type":
                    key = item.type;
                    break;
                case "owner":
                    key = item.owner;
                    break;
                default:
                    key = "نامشخص";
            }
            grouped[key] = (grouped[key] || 0) + 1;
        });

        const labels = Object.keys(grouped);
        const values = Object.values(grouped);

        return { labels, values };
    }, [data, groupBy]);

    return (
        <ThemeProvider theme={theme}>


            <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 2 }}>
                {/* Dropdown انتخاب معیار */}
                <FormControl sx={{ mb: 3, minWidth: 200 }} size="small">
                    <InputLabel id="groupBy-label">نمایش بر اساس</InputLabel>
                    <Select
                        labelId="groupBy-label"
                        value={groupBy}
                        onChange={(e) => setGroupBy(e.target.value)}
                    >
                        <MenuItem value="purchaseDate">سال خرید</MenuItem>
                        <MenuItem value="status">وضعیت</MenuItem>
                        <MenuItem value="type">نوع</MenuItem>
                        <MenuItem value="owner">تکنسین</MenuItem>
                    </Select>
                </FormControl>

                {/* LineChart با gradient زیر خط */}
                <LineChart
                    xAxis={[
                        {
                            data: chartData.labels,
                            scaleType: "band",
                            label: "دسته‌بندی",
                        },
                    ]}
                    series={[
                        {
                            data: chartData.values,
                            label: "تعداد اموال",
                            color: "#FF6F61",
                            area: true, // 🔥 این باعث میشه زیر خط پر بشه
                            stack: "total",
                        },
                    ]}
                    height={300}
                    sx={{
                        "& .MuiAreaElement-series-auto-generated-id-0": {
                            fill: "url(#gradientFill)", // اتصال به gradient
                        },
                    }}
                >
                    <defs>
                        <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF6F61" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#FF6F61" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                </LineChart>
            </Box>
        </ThemeProvider>
    );
}
