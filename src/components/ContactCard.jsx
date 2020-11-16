import { connect } from "react-redux";
import { deleteContact } from '../actions/phonebook-actions';

export const ContactCard = ({ contact, removeContact }) => {

    return <>
        <div className="row">
            <div className="col-md-3">
                <img style={{ maxHeight: '150px', borderRadius: '50%', border: '1px solid black' }}
                    src={contact.picture} alt={contact.firstname} />
            </div>
            <div className="col-md-8">
                <h4>
                    {contact.gender === 'Male' ? 'Mr.' : 'Ms.'}
                    {contact.firstname} {contact.lastname}</h4>
                <br />
                <p>Email: {contact.email}</p>
                <p>Phone: {contact.phone}</p>
            </div>
            <div className="col-md-1">
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure to delete this?')) {
                            removeContact(contact.id);
                        }
                    }}
                    className="btn btn-link text-danger">x</button>
            </div>
        </div>
    </>;
}

export default connect(null, { removeContact: deleteContact })(ContactCard);