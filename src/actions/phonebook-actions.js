import Axios from 'axios';
import { ADD_CONTACT, DELETE_CONTACT, FETCH_CONTACTS } from './types';

const baseUrl = 'http://localhost:4000/contacts/';

export const fetchContacts = () => async (dispatch) => {
    const resp = await Axios.get(baseUrl);
    dispatch({
        type: FETCH_CONTACTS,
        data: resp.data
    });
};

export const addContact = (contact) => async (dispatch) => {
    const resp = await Axios.post(baseUrl, contact);
    dispatch({
        type: ADD_CONTACT,
        data: resp.data
    });
};

export const deleteContact = (id) => async (dispatch) => {
    await Axios.delete(baseUrl + id);
    dispatch({
        type: DELETE_CONTACT,
        data: id
    });
};