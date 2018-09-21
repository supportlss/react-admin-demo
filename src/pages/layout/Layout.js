import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { menus, menuObject } from '../../routes/router'
import { Tabs, Avatar, Menu, Icon } from 'antd';
import NoFound from '../noFound/NoFound';
import './layout.scss'
import { Route } from 'react-router-dom'

const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const menuList = [];//链式菜单对象，用于动态生成tabs的时候使用

class CreateMenuList extends React.Component {
	createMenu(data) {
		const childMenuData = data.child;
		let childMenu = <div></div>;
		if (childMenuData && childMenuData.length) {
			childMenu = childMenuData.map((item) => {
				return this.createMenu(item);
			});
			return <SubMenu key={data.id} title={data.title}>{childMenu}</SubMenu>
		} else {
			menuList.push({...data});
			return <Menu.Item key={data.id}><NavLink to={data.url} onClick={this.props.addTabs}>{data.title}</NavLink></Menu.Item>
		}
	}
	render() {
		return (
				<Menu mode="vertical" theme="dark">
					{
						menus.map((item) => {
							return this.createMenu(item);
						})
					}
				</Menu>
		);
	}
}

class Layout extends React.Component  {
	constructor(props) {
		super(props);
		this.newTabIndex = 1;
		this.state = {
			collapsed: false,
			activeKey: 'newTab0',
			isFullScreen: false,
			panes: []
		};
	}
	logout = () => {
		this.props.history.push('/login')
	}
	goHome = () => {
		this.setState({isFullScreen: false});
		let matchHomePane = this.getExitPane('title', '主页');
		if(matchHomePane !== null) {
			this.setState({activeKey: matchHomePane.key});
			this.props.history.push(matchHomePane.url);
			return;
		}
		let homePaneObject = menuList.filter((item) => item.title === '主页')[0];
		homePaneObject.key = `newTab${this.newTabIndex++}`;
		this.props.history.push(homePaneObject.url);
		this.setState(function(prevState, props) {
			prevState.panes.push(homePaneObject);
			return {
				panes: prevState.panes,
				activeKey: homePaneObject.key
			};
		});
	}
	add = (event) => {
		let url = event.currentTarget.getAttribute('href');
		let exitPane = this.getExitPane('url', url);
		if(exitPane != null) {
			this.setState({activeKey: exitPane.key, isFullScreen: exitPane.isFullScreen});
			return;
		}
		//创建新的tab项
		let matchMenus = menuList.filter((item) => item.url === url);
		if(matchMenus.length > 0) {
			let activeKey = `newTab${this.newTabIndex++}`;
			this.setState((prevState) => {
				matchMenus[0].key = activeKey;
				prevState.panes.push(matchMenus[0]);
				return {
					panes: prevState.panes,
					activeKey,
					isFullScreen: matchMenus[0].isFullScreen
				}
			})
		}
	}

	getExitPane = (propertyName, value) => {
		let matchPanes = this.state.panes.filter((item) => item[propertyName] === value);
		if(matchPanes.length > 0) {
			return matchPanes[0];
		}
		return null;
	}

	onChange = (activeKey) => {
		let exitPane = this.getExitPane('key', activeKey);
		if(exitPane !== null) {
			this.setState({
				isFullScreen: exitPane.isFullScreen
			})
			this.props.history.push(exitPane.url);
			this.setState({ activeKey });
		}
	}

	onEdit = (targetKey, action) => {
		this[action](targetKey);
	}

	remove = (targetKey) => {
		const panes = this.state.panes.filter(pane => pane.key !== targetKey);
		let length = panes.length;
		if(length > 0) {
			let activeKey = this.state.panes[length - 1].key;
			this.setState({ panes, activeKey });
			this.props.history.push(this.state.panes[length - 1].url);
		}
	}
	render() {
		var fulllScreenClass = this.state.isFullScreen ? 'fullScreen' : '';
		return <div className={"layout " + fulllScreenClass}>
			<div className="header">
				<span>指标监控管理系统</span>
				<span>
					<span><Avatar icon="user" />&nbsp;&nbsp;欢迎您&nbsp;{sessionStorage.getItem('userName')}</span>
					<Icon type="home" onClick={this.goHome.bind(this)}/>
					<Icon type="logout" onClick={this.logout.bind(this)}/>
				</span>
			</div>
			<div className={"content"}>
				<nav className="nav-content">
					<CreateMenuList addTabs={this.add}/>
				</nav>

				<div className="page-content">
					<Tabs
							onChange={this.onChange}
							activeKey={this.state.activeKey}
							type="editable-card"
							onEdit={this.onEdit}
					>
						{this.state.panes.map(
								pane => {
									let route = null;
									if(menuObject.hasOwnProperty(pane.component)) {
										route = <Route path={pane.url} exact component={menuObject[pane.component]} />;
									} else {
										route = <Route component={NoFound}/>;
									}
									return <TabPane tab={pane.title} key={pane.key}>
										{route}
									</TabPane>
								}
						)}
					</Tabs>
				</div>
			</div>
		</div>
	}
	componentDidMount() {
		let url = this.props.history.location.pathname;//获取当前url
		let matchMenus = menuList.filter((item) => item.url === url);//获取当前路由匹配的菜单信息
		let paneObject = menuList.filter((item) => item.title === "主页")[0];//从菜单获取主页的tab对象信息
		paneObject.key = 'newTab0';
		if(matchMenus.length > 0) {//如果有匹配到当前路由的菜单信息，就修改paneObject为当前路由的信息
			Object.assign(paneObject, paneObject, matchMenus[0]);//对象合并方法，matchMenus[0]覆盖修改paneObject的同名属性值。
		}
		this.setState({//更新panes对象
			panes: [paneObject],
			isFullScreen: paneObject.isFullScreen
		})
	}
}
export default withRouter(Layout)