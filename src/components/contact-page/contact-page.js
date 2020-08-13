import React from 'react';
import './contact-page.css';
import {connect} from 'react-redux';
import {addToContactList, setNewContact, setTerm, changeVisibleContacts, setVisibleContactsToNull,
  setContactListToNull} from '../../redux/actions';

const mapStateToProps = (state) => {
  return {
    contactList: state.contactList,
    newContact: state.newContact,
    authorizedUser: state.authorizedUser,
    term: state.term,
    visibleContacts: state.visibleContacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToContactList: (payload) => dispatch(addToContactList(payload)),
    setNewContact: (payload) => dispatch(setNewContact(payload)),
    setTerm: (payload) => dispatch(setTerm(payload)),
    changeVisibleContacts: (payload) => dispatch(changeVisibleContacts(payload)),
    setVisibleContactsToNull: () => dispatch(setVisibleContactsToNull()),
    setContactListToNull: () => dispatch(setContactListToNull())
    }
  };

class ContactPage extends React.Component  {


  addContact(){
    if(this.props.newContact !== ''){
      this.fetchNewContact()}
  }

  changeNewContact(e){
    this.props.setNewContact(e.target.value); 
  }

  fetchNewContact(){

    fetch('contacts',
    {
      method: 'POST', 
      body: JSON.stringify({user: this.props.authorizedUser, contact: this.props.newContact}),
      headers: {'Content-Type': 'application/json' }
    })
    
    fetch(`contacts?user=${this.props.authorizedUser}`)
    .then(response => response.json())
    .then(json => {
      this.props.setVisibleContactsToNull();
      this.props.setContactListToNull();
      for (let obj in json){
        this.props.addToContactList(json[obj]);
        this.props.changeVisibleContacts(json[obj]);
      }
    })
  }

  onSearchChange(e){
    this.props.setTerm(e.target.value);
    let visibleList = this.searchFilter(this.props.contactList, e.target.value);
    this.props.setVisibleContactsToNull();
    for (let obj in visibleList){
      this.props.changeVisibleContacts(visibleList[obj]);
    }
  }

  searchFilter(contacts, term){
    if(term.length === 0){
      return contacts;
    }

    return contacts.filter((obj) => {
      return obj.contact.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  deleteContact = (id) => {
    const idx = this.props.contactList.findIndex((el) => el.id === id);
    const newArray = [...this.props.contactList.slice(0, idx),...this.props.contactList.slice(idx+1)];

    this.props.setVisibleContactsToNull();
    this.props.setContactListToNull();
    
    for (let obj in newArray){
      this.props.changeVisibleContacts(newArray[obj]);
      this.props.addToContactList(newArray[obj]);
    }

    fetch('contacts/' + id, {
      method: 'DELETE',
    })
    .then(res => res.json()) 
    .then(res => console.log(res))
  };


  render()
  {
    return(
      <div className="contactPage">
        <h1>{this.props.authorizedUser}</h1>
        <input className="form-control search-input"  placeholder='Введите контакт для поиска' value={this.props.term}
          onChange={(e)=>this.onSearchChange(e)}/>
        <ul>
          {this.props.visibleContacts.map(name => {
                return (
                <li className='list-group-item' key={name.id}>
                      {name.contact}

                      <button type='button' className='btn btn-outline-danger btn-sm float-right' 
                      onClick={()=>this.deleteContact(name.id)}>
                        <i className="fa fa-trash-o" /></button>

                </li>  
                )
              })}
        </ul>
        <form className='contact-add-form d-flex'>
          <input type='text' className='form-control add' placeholder="Новый контакт" value={this.props.newContact} 
          onChange={(e)=>this.changeNewContact(e)}/>
          <button type='button' className='btn btn-outline-primary add' onClick={() => this.addContact()}>Добавить</button>
        </form>
      </div>
  )}
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);


