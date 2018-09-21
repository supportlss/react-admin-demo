
export const setEchart = function(xData, runNumber, completeNumber, avgTime) {
	let option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999'
				}
			}
		},
		grid: {
			top: '20%',
			right: '15%',
			bottom: '13%'
		},
		legend: {
			data:['运行次数','达标次数', '平均耗时(秒)'],
			textStyle:{
				color: '#606A8E'
			}
		},
		xAxis: [
			{
				type: 'category',
				data: xData,
				axisPointer: {
					type: 'shadow'
				},
				axisLabel:{
					textStyle:{
						color: '#C3DEF9',
						fontSize: 12
					}
				},
				axisLine: {
					lineStyle: {
						color: '#606A8E',
						width: 1
					}
				}
			}
		],
		yAxis: [
			{
				type: 'value',
				min: 0,
				max: 250,
				interval: 50,
				axisLabel: {
					formatter: '{value}'
				},
				axisLabel:{
					textStyle:{
						color: '#606A8E',
						fontSize: 12
					}
				},
				axisLine: {
					lineStyle: {
						color: '#46A3FF',
						width: 1
					}
				},
				splitLine: {
					show: false
				}
			},
			{
				type: 'value',
				min: 0,
				max: 25,
				interval: 5,
				axisLabel: {
					formatter: '{value} 秒'
				},
				axisLabel:{
					textStyle:{
						color: '#606A8E',
						fontSize:12
					}
				},
				axisLine: {
					lineStyle: {
						color: '#FFD929',
						width: 1
					}
				},
				splitLine: {
					show: false
				}
			}
		],
		series: [
			{
				name:'运行次数',
				type:'bar',
				barWidth:10,
				itemStyle: {
					normal: {
						color : '#46A3FF',
						opacity : 1
					}
				},

				data: runNumber
			},
			{
				name: '达标次数',
				type: 'bar',
				barWidth: 10,
				itemStyle: {
					normal: {
						color: '#07F5FF',
						opacity: 1
					}
				},
				data: completeNumber
			},
			{
				name: '平均耗时(秒)',
				type: 'bar',
				barWidth: 10,
				itemStyle: {
					normal: {
						color: '#FEDA2A',
						opacity: 1
					}
				},
				yAxisIndex: 1,
				data: avgTime
			}
		]
	};
	return option;
}
