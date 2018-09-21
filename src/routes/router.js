import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Layout from '../pages/layout/Layout'
import Login from '../pages/login/Login'
import AuthorizedRoute from './AuthorizedRoute'
import NoFound from '../pages/noFound/NoFound'
import Home from '../pages/home/Home'
import Order from '../pages/Order/Order'
import WorkOrder from '../pages/Order/WorkOrder'
import Operations from '../pages/operations/operations'

export const Router = () => (
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/login" component={Login} />
					<Redirect from="/" exact to="/login"/>{/*注意redirect转向的地址要先定义好路由*/}
					<AuthorizedRoute path="/layout" component={Layout} />
					<Route component={NoFound}/>
				</Switch>
			</div>
		</BrowserRouter>
)

export const menuObject = {
	'home': Home,
	'order': Order,
	'workOrder': WorkOrder,
	'operations': Operations
}

export const menus = [
	{
		id: 1,
		title: '主页',
		url: '/layout/home',
		component: 'home',
		isFullScreen: false
	},
	{
		id: 11,
		title: '运营管理',
		url: '/layout/operations',
		component: 'operations',
		isFullScreen: true
	},
	{
		id: 2,
		title: '监视管理',
		child: [
			{
				id: 3,
				title: '全业务监控视图',
				child: [
					{id: 6, title: '固网监控视图', url: '/layout/order1', component: 'order', isFullScreen: false},
					{id: 7, title: '移网监控视图', url: '/layout/order2', component: 'order', isFullScreen: false}
				]
			},
			{
				id: 5,
				title: '3*9大屏',
				url: '/layout/order3',
				component: 'order',
				isFullScreen: false
			}
		]
	}
];







