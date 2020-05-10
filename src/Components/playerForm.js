import React, {Fragment} from "react";
import { Formik, Field, Form} from 'formik'
import { TextField, Button} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Menu from './Menu'
import axios from 'axios'

function validateEmail(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

export default function playerForm() {

    const handleSubmit = (values) => {
        axios.post(`http://localhost:3004/users`, values)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .then((response) => {
                console.log(response);
                }, (error) => {
                    console.log(error);
                });
    };

    return (
        <Fragment classname='container'>
            <div className='bg'>
                <Menu/>
                <h1>Add Player</h1>
                <Formik
                    initialValues={{
                        First: '',
                        Last: '',
                        Email: '',
                        Phone: '',
                        Handicap: ''
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        if(values.First === ''){values.First = 'N/A'}
                        if(values.Last === ''){values.Last = 'N/A'}
                        if(values.Email === ''){values.Email = 'N/A'}
                        if(values.Phone === ''){values.Phone = 'N/A'}
                        if(values.Handicap === ''){values.Handicap = 'N/A'}
                        handleSubmit(values);
                        setSubmitting(true);
                        alert('Player Added');
                        setSubmitting(false)
                    }}>
                    {({values, isSubmitting, validateEmail, errors, touched}) => (
                        <Form>
                            <Field placeholder='First' name="First" type='input' as={TextField}/>
                            <div>
                                <Field placeholder='Last' name="Last" type='input' as={TextField}/>
                            </div>
                            <div>
                                <Field placeholder='Email' name="Email" type='input' as={TextField} validate={validateEmail}/>
                                {errors.email && touched.email && <div>{errors.email}</div>}
                            </div>
                            <div>
                                <Field placeholder='Phone' name="Phone" type='input' as={TextField}/>
                            </div>
                            <div>
                                <Field placeholder='Handicap' name="Handicap" type='input' as={TextField}/>
                            </div>
                            <div>
                                <Button disabled={isSubmitting} type="submit">Submit</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Fragment>
    );
}

