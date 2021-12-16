import React from 'react';
import { TypedFormik } from 'formik-typed';
import * as yup from 'yup';

import { Form, Button, Row, Col } from 'react-bootstrap';

import { setCurrentUser } from '../../redux/user/user.actions';
import { setToastComp } from '../../redux/toast/toast.actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import bcryptjs from 'bcryptjs'

import { LogInResponse } from './log-in.types';
import { ToastState } from '../../redux/toast/toast.types';

import ToastNotification from '../../components/toast/toast.component';
import pokeConstants from '../../constants/poke.constants';

import './log-in.styles.scss';

const LogIn = ({ setCurrentUser, showToast }: any) => {
    const navigate = useNavigate();

    const LoginSchema = yup.object().shape({
        email: yup.string()
            .email('Please enter a valid email address.')
            .required('Email is required.')
            .matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
            .trim(),
        password: yup.string()
            .required('Password is required.'),
    });

    return (
        <div>
            <TypedFormik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={values => {
                    const { USERS_URL, LOG_IN } = pokeConstants;
                    axios.post<LogInResponse, any, any>(USERS_URL + LOG_IN, {
                        email: values.email,
                        password: values.password,
                    }).then(async resp => {
                        const toast = {
                            show: true,
                            header: "Log In",
                            msg: "Email or password is wrong, please check",
                            variant: "warning",
                        };
                        if (resp.status === 200) {
                            const data = resp.data;
                            if (data.exists) {
                                const logIn = await bcryptjs.compareSync(values.password, data.user?.password);
                                if (logIn) {
                                    setCurrentUser(data.user?.email);
                                    navigate("/");
                                } else {
                                    showToast(toast);
                                }
                            } else {
                                showToast(toast)
                            }
                        }
                    })
                        .catch((err: any) => console.error(err));
                }}>
                {({
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => (
                    <Form className="log-in" onSubmit={handleSubmit}>
                        <h3>Log In</h3>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        className={touched.email && errors.email ? "error" : ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        touched.email && errors.email ?
                                            (<div className="error-message">{errors.email}</div>)
                                            : null
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password"
                                        placeholder="Password"
                                        className={touched.password && errors.password ? "error" : ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {
                                        touched.password && errors.password ?
                                            (<div className="error-message">{errors.password}</div>)
                                            : null
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="dark" type="submit" className="log-in-button">
                                    Log In
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </TypedFormik>
            <ToastNotification />
        </div>

    );
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
    setCurrentUser: (payload: any) => dispatch(setCurrentUser(payload)),
    showToast: (show: ToastState) => dispatch(setToastComp(show)),
});

export default connect(null, mapDispatchToProps)(LogIn);

