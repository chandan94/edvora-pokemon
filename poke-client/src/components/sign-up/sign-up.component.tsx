import { TypedFormik } from 'formik-typed';
import * as yup from 'yup';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import { Form, Button, Col } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import { setToastComp } from '../../redux/toast/toast.actions';
import { ToastState } from '../../redux/toast/toast.types';
import { SignUpProps, SignUpResponse } from './sign-up.types';

import pokeConstants from '../../constants/poke.constants';
import ToastNotification from '../../components/toast/toast.component';

import './sign-up.styles.scss';

const SignupSchema = yup.object().shape({
    email: yup.string()
        .email('Please enter a valid email address.')
        .required('Email is required.')
        .matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "Please enter a valid email address."),
    password: yup.string()
        .required()
        .min(8, "Password should be of 8 characters at least.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Password should have at least 1 capital letter, small letter, 1 number and 1 special character among !@#$%^&*"),
    confirm: yup.string()
        .required("Re-enter password.")
        .oneOf([yup.ref("password")], 'Passwords do not match.'),
});

const initialValues = {
    email: '',
    password: '',
    confirm: '',
}
const SignUp = ({showToast} :SignUpProps) => {
    // const navigate = useNavigate();
    return (
        <div className="sign-up">
        <TypedFormik
            initialValues={initialValues}
            validationSchema={SignupSchema}
                onSubmit={(values) => {
                    const saltRounds = 10;
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hashdPwd = bcrypt.hashSync(values.password, salt);
                    const body = {
                        email: values.email,
                        password: hashdPwd,
                    };
                    const { USERS_URL , SIGN_UP } = pokeConstants;
                    axios.post<SignUpResponse, any, any>(USERS_URL + SIGN_UP, body)
                        .then(resp => {
                            const toast = {
                                show: true,
                                header: "Sign Up User",
                                msg: "User signed up successfully",
                                variant: "success",
                            };
                            if (resp.status === 200) {
                                if (resp.data.exists) {
                                    toast.msg = "User already exists, please log in";
                                    toast.variant = "warning"
                                }
                                // navigate("/login");
                            }
                            showToast(toast);
                        })
                        .catch((err: any) => console.error(err));
                }}
        >
    {({
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit
    }) => (
        <Form className="sign-up" onSubmit={handleSubmit} >
            <h3 className="mb-3">Sign Up</h3>
            <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    className={touched.email && errors.email ? "error" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {
                    touched.email && errors.email ?
                        (<div className="error-message">{errors.email}</div>)
                        : null
                }
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={touched.password && errors.password ? "error" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {
                    touched.password && errors.password ?
                        (<div className="error-message">{errors.password}</div>)
                        : null
                }
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridconfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm"
                    className={touched.confirm && errors.confirm ? "error" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {
                    touched.confirm && errors.confirm ?
                        (<div className="error-message">{errors.confirm}</div>)
                        : null
                }
            </Form.Group>
            <Button variant="dark" type="submit" className="sign-up-button">
                Sign Up
            </Button>
        </Form>
    )}
        </TypedFormik >
        <ToastNotification/>
        </div>
    );
}

const mapDispatchToProps = (dispatch : Dispatch) => ({
    showToast: (show: ToastState) => dispatch(setToastComp(show)),
});

export default connect(null, mapDispatchToProps)(SignUp);