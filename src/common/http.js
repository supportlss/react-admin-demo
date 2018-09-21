import fetch from 'isomorphic-fetch';
import 'es6-promise'
import _ from 'lodash';

class Http {
	checkStatus(response) {//检查响应状态
		if(response.status >= 200 && response.status < 300) {//响应成功
			return response;
		}
		if(response.status === 301 || response.status === 302) {//重定向
			window.location = response.headers.get('Location');
		}
		const error = new Error(response.statusText);
		error.data = response;
		throw error;
	}

	async parseResult(response) {//解析返回的结果
		const contentType = response.headers.get('Content-Type');
		if(contentType != null) {
			if(contentType.indexOf('text') > -1) {
				return await response.text()
			}
			if(contentType.indexOf('form') > -1) {
				return await response.formData();
			}
			if(contentType.indexOf('video') > -1) {
				return await response.blob();
			}
			if(contentType.indexOf('json') > -1) {
				return await response.json();
			}
		}
		return await response.text();
	}

	async processResult(response) {
		let _response = this.checkStatus(response)
		_response = await this.parseResult(_response);
		return _response;
	}

	async _request(url, init, headers = {}) {
		try {
			let options = _.assign(
					{
						credentials: 'include',//允许跨域
					},
					init
			);
			options.headers = Object.assign({}, options.headers || {}, headers || {});
			let response = await fetch(url, options);
			response = await this.processResult(response);//这里是对结果进行处理。包括判断响应状态和根据response的类型解析结果
			return response;
		} catch(error) {
			throw error;
			return null;
		}
	}

	async get(api, data = {}, headers = {}, config = {}) {
		const query = _.isEmpty(data) ? '' : `json=${encodeURIComponent(JSON.stringify(data))}`;
		return await this._request(`${api}?${query}`, headers, {}, config);
	}

	async post(api, data = {}, headers = {}, config = {}) {
		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			...headers,
		};
		let formBody = null;
		if(_headers['Content-Type'] && _headers['Content-Type'].indexOf('application/x-www-form-urlencoded')>-1) {
			formBody = new URLSearchParams();
			for(let k in data) {//遍历一个对象
				if(typeof(data[k]) === 'object') {
					formBody.append(k, JSON.stringify(data[k]));
				} else {
					formBody.append(k, data[k]);
				}
			}
		}
		return await this._request(
				api,
				{
					method: 'POST',
					headers: _headers,
					body: formBody,
				},
				{},
				config,
		)
	}
}

let http = new Http();
export default http;
