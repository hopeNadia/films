import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import PropTypes from 'prop-types';
import { bindActionCreators} from 'redux';
import { withRouter }  from 'react-router';

import * as actionCreators from "../Actions/";
import ReduxForm from '../Components/SignUpForm/';
import { trySignUp }  from '../services/';
import {  getSignupError, getDisableButtons } from '../Selectors/';

class Form extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            disables: false
        };
        this.submit = this.submit.bind(this);
    }


    submit (values) {
        this.props.actions.disableButtons();
        trySignUp(values).
            then(res => {
                if(!res.error) {
                    this.props.actions.login(res);
                    this.props.actions.enableButtons();
                    this.props.history.push('/success');
                    localStorage.setItem('user',JSON.stringify(res));
                }
                else{ this.props.actions.signupFail(res.error); }
        })
            .catch(error => console.log(error));
    }

    render() {
        let props = {
            onSubmit: this.submit,
            signError: this.props.signError,
            email: this.props.email,
            password: this.props.password,
            disable: this.props.disableButtons
        };
        return (
            <ReduxForm {...props}/>
        )
    }
}

Form.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

const  mapStateToProps = (state)=> {
    let data = { user : getFormValues('signUp')(state) };
    return {
        email: data.user && data.user.email || '',
        password:  data.user && data.user.password || '',
        signError:  getSignupError(state),
        disableButtons: getDisableButtons(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators,dispatch),
    }
};
const SignUpForm = connect(mapStateToProps,mapDispatchToProps)(Form);

export default withRouter(SignUpForm);

