import { connect } from 'react-redux';
import ContactCard from './ContactCard';
import { fetchContacts } from '../actions/phonebook-actions';
import { useEffect } from 'react';

export const ContactList = ({ contacts, fetchAllContacts }) => {

    useEffect(fetchAllContacts, []);

    return <>
        <ul className="list-group">
            {
                contacts.map(c => <li className="list-group-item" key={c.id}>
                    <ContactCard contact={c} />
                </li>)
            }
        </ul>
    </>;
};

const stateAsProps = (store) => {
    return {
        contacts: store.contactsReducer
    }
};

export default connect(stateAsProps, { fetchAllContacts: fetchContacts })(ContactList);