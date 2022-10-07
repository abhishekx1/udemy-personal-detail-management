import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Classes from '../User/AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
    const [enteredUsername, seEnteredUSername] = useState('');
    const [enteredAge, seEnteredAge] = useState('');
    const [error, setError] = useState('');

    const getUsernameHandler = (event) => {
        seEnteredUSername(event.target.value);
    };

    const getAgeHandler = (event) => {
        seEnteredAge(event.target.value);
    };

    const addUserHandler = (event) => {
        event.preventDefault();
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input!',
                message: 'Please enter valid name and age (non-empty values)'
            });
            return;
        } else if (+enteredAge < 1) {
            setError({
                title: 'Invalid Age!',
                message: 'Please enter valid age (> 0)'
            });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
    };

    const errorHandler = () => {
        setError(null);
    };
    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={Classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor='username' value={enteredUsername}>Username</label>
                    <input id='username' type='text' onChange={getUsernameHandler} />
                    <label htmlFor='age' value={enteredAge}>Age (Years)</label>
                    <input id='age' type='number' onChange={getAgeHandler} />
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </div>
    );
};

export default AddUser;