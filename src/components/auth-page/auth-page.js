import React from 'react';
import './auth-page.css';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {setLogin, setPassword, changeLoggedIn, setAuthorizedUser, addToContactList, changeVisibleContacts} 
  from '../../redux/actions';


const mapStateToProps = (state) => {
  return {
      login: state.login,
      password: state.password,
      loggedIn: state.loggedIn,
      authorizedUser: state.authorizedUser,
      contactList: state.contactList
    }};
  
const mapDispatchToProps = (dispatch) => {
  return {
      setLogin: (payload) => dispatch(setLogin(payload)),
      setPassword: (payload) => dispatch(setPassword(payload)),
      changeLoggedIn: () => dispatch(changeLoggedIn()),
      setAuthorizedUser: (payload) => dispatch(setAuthorizedUser(payload)),
      addToContactList: (payload) => dispatch(addToContactList(payload)),
      changeVisibleContacts: (payload) => dispatch(changeVisibleContacts(payload))
    }
    }; 

class AuthPage extends React.Component{
 

  fetchLogin(){
    const sLogin = this.props.login;
    const sPassword = this.props.password;

    fetch(`users?login=${sLogin}&password=${sPassword}`)
    .then(response => response.json())
    .then(json => {
      if(json.length > 0){
        this.props.changeLoggedIn();
        this.props.setAuthorizedUser(this.props.login);
        this.fetchContacts(this.props.authorizedUser);
      }
    })
  }

  fetchContacts(user){
    fetch(`contacts?user=${user}`)
    .then(response => response.json())
    .then(json => {
      for (let obj in json){
        this.props.addToContactList(json[obj]);
        this.props.changeVisibleContacts(json[obj]);
      }
    })
  }

  fetchData(){
    fetch('users',
    {
      method: 'POST', 
      body: JSON.stringify({login: this.props.login, password: this.props.password}),
      headers: {'Content-Type': 'application/json' }
    })
    this.props.setLogin('');
    this.props.setPassword('');
  }

  loginChange(e){
    this.props.setLogin(e.target.value)
  }

  passwordChange(e){
    this.props.setPassword(e.target.value)
  }

  render()
    {
      if(this.props.loggedIn){
        return <Redirect to="/contacts"/>
      }
      
      return(
      <div className = "login-form"> 
          <input type="email" className="form-control" placeholder="Введите логин" value={this.props.login}
          onChange={(e)=>this.loginChange(e)}/>
          <input type="email" className="form-control" placeholder="Введите пароль" value={this.props.password} 
          onChange={(e)=>this.passwordChange(e)}/>
          <button type="submit" className="btn btn-primary btn-block" onClick={()=>this.fetchData()}>Регистрация</button>
          <button type="submit" className="btn btn-primary btn-block" onClick={()=>this.fetchLogin()}>Войти</button>
      </div>
  )}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
