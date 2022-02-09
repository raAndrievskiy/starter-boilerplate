import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Table, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';

import Loading from 'components/shared-components/Loading';
import { showLoading } from 'redux/actions/Auth';
import EditProfile from './EditProfile';

export class UserList extends Component {

	state = {
		users: '',
		userProfileVisible: false,
		userEditVisible: false,
		selectedUser: null,
    showLoading: true,
	}

	deleteUser = userId => {
		this.setState({
			users: this.state.users.filter(item => item.id !== userId),
		})
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}

	showUserProfile = userInfo => {
		this.setState({
			userProfileVisible: true,
			selectedUser: userInfo
		});
	};

  showEditProfile = userEdit => {
		this.setState({
			userEditVisible: true,
			selectedUser: userEdit
		});
	};
	
	closeUserProfile = () => {
		this.setState({
			userProfileVisible: false,
			selectedUser: null
    });
	}

	closeEditProfile = () => {
		this.setState({
			userEditVisible: false,
			selectedUser: null
    });
	}

  componentDidMount() {
    const getUsers = async () => {
      try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        let users = await response.json();
        
        this.setState({
          users,
          showLoading: false
        })
        
        return users;
      } catch(error) {
        console.error(error);
      }
      
    }
    getUsers()
  }

	render() {
		const { users, userProfileVisible, userEditVisible, selectedUser, showLoading  } = this.state;

		const tableColumns = [
			{
				title: 'User',
				dataIndex: 'name',
				render: (_, record) => (
					<div className="d-flex">
						<AvatarStatus src={record.img} name={record.name} subTitle={record.username}/>
					</div>
				),
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
  						b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'ID',
				dataIndex: 'id',
				sorter: {
					compare: (a, b) => a.id.length - b.id.length,
				},
			},
      {
				title: 'Email',
				dataIndex: 'email',
				sorter: {
					compare: (a, b) => a.email.length - b.email.length,
				},
			},
			{
				title: 'Address',
        render: (record) => record.address.city,
				sorter: {
					compare: (a, b) => a.address.city.length - b.address.city.length,
				},
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_, elm) => (
					<div className="text-right">
						<Tooltip title="View">
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {this.showUserProfile(elm)}} size="small"/>
						</Tooltip>
						<Tooltip title="Edit">
							<Button type="primary" className="mr-2" icon={<SettingOutlined />} onClick={() => {this.showEditProfile(elm)}} size="small"/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={()=> {this.deleteUser(elm.id)}} size="small"/>
						</Tooltip>
					</div>
				)
			}
		];


		return (
			<Card bodyStyle={{'padding': '0px'}} >
				{showLoading  ?  <Loading /> : <Table columns={tableColumns} dataSource={users} rowKey='id' />}
				<UserView data={selectedUser} visible={userProfileVisible} close={()=> {this.closeUserProfile()}}/>
        <EditProfile data={selectedUser} visible={userEditVisible} close={()=> {this.closeEditProfile()}}  />
			</Card>
		)
	}
}

const mapStateToProps = ({auth}) => {
	const { loading } = auth;
  return { loading }
}

const mapDispatchToProps = {
	showLoading,
}

export default  connect(mapStateToProps, mapDispatchToProps)(UserList)
