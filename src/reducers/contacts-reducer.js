import { ADD_CONTACT, DELETE_CONTACT, FETCH_CONTACTS } from "../actions/types";

const contactsReducer = (state = [], action) => {
    switch(action.type) {
        case FETCH_CONTACTS:
            return [...action.data];
        case ADD_CONTACT:
            return [action.data, ...state];
        case DELETE_CONTACT:
            const contacts = [...state];
            const index = contacts.findIndex(c=>c.id===action.data);
            if(index!==-1){
                contacts.splice(index, 1);
            }
            return [...contacts];
        default:
            return state;
    }
}

export default contactsReducer;