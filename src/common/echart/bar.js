import React from 'react'
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'

export default class Bar extends React.Component {
	constructor(props) {
		super(props);
		this.initPie = this.initPie.bind(this)
	}

	initPie() {
		const { option = {} } = this.props;
		let myChart = echarts.init(this.ID);
		myChart.setOption(option)
		window.onresize = function () {
			myChart.resize()
		}
	}

	componentDidMount() {
		this.initPie();
	}

	componentDidUpdate() {
		this.initPie();
	}

	render() {
		const { width = "100%", height="400px" } = this.props
		return <div ref={ID => this.ID = ID} style={{width, height}}></div>
	}
}

