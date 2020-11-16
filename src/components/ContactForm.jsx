import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { addContact } from '../actions/phonebook-actions';

const emptyContact = {
    firstname: '',
    lastname: '',
    gender: 'Male',
    email: '',
    phone: '',
    picture: 'http://kvinod.com/profile-pictures/default-profile.png'
};

const ContactForm = ({ addContact }) => {

    const [state, setState] = useState({ ...emptyContact });
    const [errs, setErrs] = useState({});
    const [touched, setTouched] = useState({});

    const submitHandler = (evt) => {
        evt.preventDefault();
        if (Object.keys(errs).length > 0) {
            alert('Please fix validation errors before submitting the form');
            return;
        }
        addContact(state);
        setState({ ...emptyContact });
        setTouched({});
    };

    const changeHandler = ({ target }) => {
        const { name, value } = target;
        setState({ ...state, [name]: value });
        setTouched({ ...touched, [name]: true });
    };

    useEffect(() => {
        //validations
        const errs = {};
        const { firstname, email, phone } = state;
        if (!firstname || firstname.length === 0) {
            errs.firstname = { required: 'Firstname is mandatory' };
        }
        else if (firstname.length < 3) {
            errs.firstname = { minLength: 'At least 3 letters required for firstname' };
        }

        if (!email || email.length === 0) {
            errs.email = { required: 'Email address is mandatory' };
        }
        else {
            const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (re.test(email) === false) {
                errs.email = { pattern: 'Invalid pattern for email' };
            }
        }

        if (!phone || phone.length === 0) {
            errs.phone = { required: 'Phone number is mandatory' };
        }
        else {
            const re = /^\d{10,12}$/;
            if (re.test(phone) === false) {
                errs.phone = { pattern: 'Expected 10 to 12 digits' };
            }
        }
        setErrs({ ...errs });
    }, [state]);

    return <>
        <h2>Add new contact details</h2>
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="firstname">Firstname</label>
                <input type="text" className="form-control" id="firstname"
                    name="firstname" value={state.firstname} onChange={changeHandler} />
                {
                    touched.firstname &&
                    <div className="text-danger"  >
                        <div>{errs.firstname && errs.firstname.required}</div>
                        <div>{errs.firstname && errs.firstname.minLength}</div>
                    </div>
                }
            </div>
            <div className="form-group">
                <label htmlFor="lastname">Lastname</label>
                <input type="text" className="form-control" id="lastname"
                    name="lastname" value={state.lastname} onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label>
                    <input type="radio" id="genderMale"
                        name="gender" value="Male" 
                        checked = {state.gender=='Male'}
                        onChange={changeHandler} /> Male
                </label>
                <label>
                    <input type="radio" id="genderFemale"
                        name="gender" value="Female" 
                        checked = {state.gender=='Female'}
                        onChange={changeHandler} /> Female
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email"
                    name="email" value={state.email} onChange={changeHandler} />
                {
                    touched.email &&
                    <div className="text-danger">
                        <div>{errs.email && errs.email.required}</div>
                        <div>{errs.email && errs.email.pattern}</div>
                    </div>
                }
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input type="tel" className="form-control" id="phone"
                    name="phone" value={state.phone} onChange={changeHandler} />
                {
                    touched.phone &&
                    <div className="text-danger">
                        <div>{errs.phone && errs.phone.required}</div>
                        <div>{errs.phone && errs.phone.pattern}</div>
                    </div>
                }
            </div>
            <div className="form-group">
                <label htmlFor="picture">Picture URL</label>
                <input type="url" className="form-control" id="picture"
                    name="picture" value={state.picture} onChange={changeHandler} />
            </div>
            <button disabled={Object.keys(errs).length > 0} 
                className="btn btn-primary">Submit</button>
        </form>
    </>;
};

export default connect(null, { addContact })(ContactForm);