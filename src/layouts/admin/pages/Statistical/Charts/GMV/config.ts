import { ChartGMVData } from '../interface';

export const options = (data: ChartGMVData[]) => {
    const columnData = data.map((item) => item.money);
    const columnLabels = data.map((item) => `Tháng ${item.month}`);
    const pieData = data.map((item) => ({
        name: `Tháng ${item.month}`,
        y: item.money,
    }));
    return {
        title: {
            text: `Tổng doanh thu tour, ${data[0]?.year}`,
        },
        xAxis: {
            categories: columnLabels,
        },
        yAxis: {
            title: {
                text: 'Số tiền',
            },
        },
        accessibility: {
            enabled: false,
        },
        series: [
            {
                type: 'column',
                name: 'Doanh thu',
                data: columnData,
                dataLabels: {
                    enabled: false,
                    rotation: 0,
                    color: '#FFFFFF',
                    align: 'right',
                    y: 0, // 10 pixels down from the top
                },
            },

            {
                type: 'pie',
                name: 'Doanh thu',
                data: pieData,
                center: [80, 30],
                size: 100,
                color: '#28a745',
                showInLegend: false,
                dataLabels: {
                    enabled: false,
                },
            },
        ],
    };
};
