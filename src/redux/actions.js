export const setLogin = (payload) => ({type: 'setLogin', payload});

export const setPassword = (payload) => ({type: 'setPassword', payload});

export const changeLoggedIn = () => ({type: 'changeLoggedIn'});

export const setAuthorizedUser = (payload) => ({type: 'setAuthorizedUser', payload});

export const addToContactList = (payload) => ({type: 'addToContactList', payload});

export const setNewContact = (payload) => ({type: 'setNewContact', payload});

export const setTerm = (payload) => ({type: 'setTerm', payload});

export const changeVisibleContacts = (payload) => ({type: 'changeVisibleContacts', payload});

export const setVisibleContactsToNull = () => ({type: 'setVisibleContactsToNull'});

export const setContactListToNull = () => ({type: 'setContactListToNull'});
