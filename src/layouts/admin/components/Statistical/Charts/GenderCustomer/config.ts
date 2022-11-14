import { ChartGenderData } from '../interface';
export const INIT_STATE = [];

export const options = (data: ChartGenderData[]) => {
    const configData = data.map((gender) => ({
        name: gender.name,
        y: gender.amount,
    }));
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: 'Tỉ lệ giới tính người dùng',
        },
        tooltip: {
            pointFormat: 'Số lượng: <b>{point.y}</b>',
        },
        legend: {
            enabled: true,
        },
        colors: ['#A0E7E5', '#FFAEBC'],
        accessibility: {
            enabled: false,
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                },
                showInLegend: true,
            },
        },
        series: [
            {
                name: 'Giới tính',
                colorByPoint: true,
                data: configData,
            },
        ],
    };
};
