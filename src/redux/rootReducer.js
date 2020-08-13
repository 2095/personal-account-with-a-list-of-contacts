const initialState = {
    login: '',
    password: '',
    loggedIn: false,
    authorizedUser: '',
    contactList: [],
    newContact: '',
    term: '',
    visibleContacts: []
}


export function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'setLogin':
          return {
              ...state,
              login: action.payload  
        };
    
        case 'setPassword':
          return {
            ...state,
            password: action.payload  
      };
    
        case 'changeLoggedIn':
          return {
            ...state,
            loggedIn: !state.loggedIn  
      };

        case 'setAuthorizedUser': 
            return {
          ...state,
          authorizedUser: action.payload  
    };

        case 'addToContactList': 
            return {
            ...state,
            contactList: [...state.contactList ,action.payload]  
    };

        case 'setNewContact': 
            return {
            ...state,
            newContact: action.payload  
    };

        case 'setTerm': 
            return {
            ...state,
            term: action.payload  
    };

        case 'changeVisibleContacts': 
          return {
          ...state,
          visibleContacts: [...state.visibleContacts ,action.payload]  
    };

        case 'setContactListToNull': 
          return {
          ...state,
          contactList: []  
    };

        case 'setVisibleContactsToNull': 
          return {
          ...state,
          visibleContacts: []  
    };

    
        default:
          return state;
      }
}