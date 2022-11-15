import { ChartBookedCategoriesData } from '../interface';

export const options = (data: ChartBookedCategoriesData) => {
    const pieData = [
        {
            name: 'Sinh thái khám phá',
            y: data.discoveryEcology,
        },
        {
            name: 'Nghỉ dưỡng',
            y: data.leisure,
        },
        {
            name: 'Di tích lịch sử',
            y: data.historicalSite,
        },
    ];
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: `Tỉ lệ thể loại tour được đặt, ${data.year}`,
        },
        colors: ['#FF97C1', '#81C6E8', '#8D9EFF'],
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
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
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        series: [
            {
                name: 'Thể loại tour ',
                colorByPoint: true,
                data: pieData,
            },
        ],
    };
};
