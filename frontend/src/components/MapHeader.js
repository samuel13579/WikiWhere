import React, { Component } from 'react';
import { Layout, Typography, Button, Row, Modal, Spin} from 'antd';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './Styles/MainMapStyle.css';
import {
    LoadingOutlined
  } from '@ant-design/icons';

const { Title } = Typography;
const { Header } = Layout;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function LoadingBar(props){

    console.log("Changing loading bar. Loading is: ");
    console.log(props.doneLoading);
    if (props.doneLoading)
    {
        return (
            <div></div>
        )
    }
    else
    {
        return (
            <Row>
                <Spin indicator={antIcon} size="large" style={{marginTop: "10px"}}></Spin>
                <p style={{marginLeft: "10px", marginTop: "-8px"}}>Loading Wikipedia articles...</p>
            </Row>
        )
    }
}

class MapHeader extends Component {

    constructor(props){
        super(props);

        this.state ={
            visible: false,
            wikiDataLoaded: this.props.wikiDataLoaded
        };

        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.showModal = this.showModal.bind(this)
    }

    confirm(e) {
        return this.props.history.push('/');
    }
    
    cancel(e) {
        this.setState({
            visible: false
        });
    }

    showModal = () => {
        this.setState({
          visible: true,
        });

        this.forceUpdate();
    };

    render() {

        return(
            <div>
                <Header className="site-layout-background" style={{ padding: 10 }}>
                    <Row style={{position:"absolute"}}>
                        {/* Add some special font either through CSS or imported font */}
                        
                        <LoadingBar doneLoading ={this.props.wikiDataLoaded}></LoadingBar>
                        <Title style={{marginLeft: 745, position: 'fixed'}}>
                            WikiWhere 
                        
                        </Title>

                        <Button type="primary" size="large" style={{marginLeft: 1575, marginTop: 4, position: "absolute", float: "right"}} onClick={this.showModal}>
                            Log out
                        </Button>

                        <Modal
                            title="Logout"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.cancel}
                            footer={[
                                <Button key="back" onClick={this.cancel}>
                                No
                                </Button>,
                                <Button key="submit" type="primary" onClick={this.confirm}>
                                Yes
                                </Button>,
                            ]}>
                            <p>Are you sure you want to log out?</p>
                        </Modal>
                        {/* Add a log out methid */}
                    </Row>
                </Header>
            </div>
        )


    }
}

export default withRouter(MapHeader);               