import { ChartAmountOfCustomerData } from '../interface';
export const INIT_STATE = [];

export const options = (data: ChartAmountOfCustomerData[]) => {
    const configData = data.map((phase) => [phase.month, phase.amount]);
    const amounts = data.map((phase) => phase.amount);
    return {
        title: {
            text: 'Tổng số lượng người dùng đăng ký năm 2022',
        },

        colors: ['#A0E7E5'],
        xAxis: {
            type: 'category',
            labels: {
                style: {
                    rotation: 0,
                    fontSize: '13px',
                    fontWeight: 'bold',
                },
            },
            title: {
                text: 'Tháng',
            },
        },
        yAxis: {
            title: {
                text: 'Số lượng người dùng',
            },
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false,
                },
                pointStart: 1,
            },
        },
        tooltip: {
            pointFormat: ' <b>{point.y} người</b>',
        },
        accessibility: {
            enabled: false,
        },
        series: [
            {
                type: 'column',
                name: 'Số người dùng',
                data: configData,
                dataLabels: {
                    enabled: true,
                    rotation: 0,
                    color: '#FFFFFF',
                    align: 'right',
                    y: 0, // 10 pixels down from the top
                },
            },
            {
                type: 'spline',
                name: 'linh tinh',
                data: amounts,
                color: '#28a745',
            },
        ],
    };
};
