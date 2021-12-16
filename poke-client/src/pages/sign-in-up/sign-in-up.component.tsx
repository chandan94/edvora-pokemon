import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import LogIn from '../../components/log-in/log-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import { selectCurrentUser } from "../../redux/user/user.selector";
import './sign-in-up.styles.scss';

const SignInUpPage = ({ currentUser }: any) => {
    const [key, setKey] = useState('sign-up');

    return (
        <div className="sign-in-up">
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k: any) => setKey(k)}
                className="tab-group"
                defaultActiveKey={`${currentUser} ? 'login' : 'sign-up'`}
            >
                <Tab eventKey="sign-up" title="SignUp">
                    <SignUp />
                </Tab>
                <Tab eventKey="login" title="Log In">
                    <LogIn />
                </Tab>
            </Tabs>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SignInUpPage);