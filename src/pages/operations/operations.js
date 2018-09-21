import React from 'react'
import utils from "../../common/utils"
import styles from './styles/operations.scss'
const PREFIX = 'operations-ctrl';
const cx = utils.classnames(PREFIX, styles);//得到cx方法


class Operations extends React.Component {
	constructor(props) {
		super();
	}
	render() {
		return <div className={`${cx('container')}`}>全屏页面</div>
	}
}

export default Operations