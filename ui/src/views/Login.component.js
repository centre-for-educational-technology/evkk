import React, {Component} from 'react';
import {postLogin} from "../Api";
import {withRouter} from "react-router-dom";
import {connectedComponent} from "../util/redux-utils";
import {selectStatus} from "../rootSelectors";
import {getStatus} from "../rootActions";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        emailAddress: '',
        password: ''
      }
    };
  }

  componentDidMount() {
    this.redirectToRootIfLoggedIn();
  }

  componentDidUpdate() {
    this.redirectToRootIfLoggedIn();
  }

  redirectToRootIfLoggedIn = () => {
    if (this.props.status.loggedInEmailAddress) this.props.history.push('/');
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {form} = this.state;
    const response = await postLogin(form.emailAddress, form.password);
    if (response.ok) {
      this.props.getStatus();
    } else {
      console.error("Not implemented");
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const {form = {}} = this.state;
    form[name] = value;
    this.setState({form});
  };

  render() {
    return (
      <div className={'container'}>
        <div className={'row justify-content-center'}>
          <div className={'col-lg-6'}>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">E-mail</label>
                <input name={'emailAddress'} onChange={this.handleInputChange} value={this.state.form.emailAddress}
                       type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="E-maili aadress"/>
                <small id="emailHelp" className="form-text text-muted">Teie e-mail millega kasutajakonto seotud on.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Parool</label>
                <input name={'password'} onChange={this.handleInputChange} value={this.state.form.password}
                       type="password" className="form-control" id="exampleInputPassword1" placeholder="Parool"/>
              </div>
              <div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Logi sisse</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  status: selectStatus()(state)
});

const mapDispatchToProps = {getStatus};

export default connectedComponent(withRouter(Login), mapStateToProps, mapDispatchToProps);
