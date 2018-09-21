import React from 'react'
import utils from '../../common/utils'

import 'isomorphic-fetch'
import 'es6-promise'
import styles from './home.scss'

const PREFIX = 'amap-layer';
const cx = utils.classnames(PREFIX, styles);//得到cx方法


function get(url) {
	var result = fetch(url, {
		credentials: 'include',
		headers: {
			'Accept': 'application/json, text/plain, */*'
		}
	})
	return result;
}

class Home extends React.Component {
	render() {
		return <div className={`${cx('container')}`}>
					主页
				</div>
	}
}


export default Home