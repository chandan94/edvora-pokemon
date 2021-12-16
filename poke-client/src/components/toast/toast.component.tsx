import { Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { setToastComp } from '../../redux/toast/toast.actions';
import { selectToastHeader, selectToastMsg, selectToastShow, selectToastVariant } from '../../redux/toast/toast.selector';
import { ToastState } from '../../redux/toast/toast.types';

import { ToastProps } from './toast.types';

const ToastNotification = ({ show, showToast, msg, headerMsg, variant }: ToastProps) => {
    return (
        <Row>
            <Col xs={6}>
                <ToastContainer position="top-center" className="p-3">
                    <Toast onClose={() => showToast ? showToast({ show : false }) : null}
                        bg={variant} show={show} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">{headerMsg}</strong>
                        </Toast.Header>
                        <Toast.Body>{msg}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>
        </Row>
    )
};

export const mapStateToProps = createStructuredSelector({
    show: selectToastShow,
    headerMsg: selectToastHeader,
    msg: selectToastMsg,
    variant: selectToastVariant,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    showToast: (payload: ToastState) => dispatch(setToastComp(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToastNotification);