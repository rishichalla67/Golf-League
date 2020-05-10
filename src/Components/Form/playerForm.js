import React, {Fragment} from "react";
import { Formik, Field, Form, useField} from 'formik'
import { TextField, Button} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Menu from '../Menu/Menu'
import axios from 'axios'
import * as yup from 'yup';


const MyTextField = ({placeholder, ...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return(
        <TextField {...field} placeholder={placeholder} helperText={errorText} error={!!errorText}/>
    );
};
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({

    First: yup.string().required().min(1),
    Last: yup.string().required().min(1),
    Email: yup.string().required().email(),
    Phone: yup.string().required().matches(phoneRegExp, 'Phone Number is not valid')
})



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
                    validationSchema={validationSchema}
                    // validate={(values) => {
                    //     const errors = {};
                    //
                    //     if(!(values.First.includes(''))) {
                    //         errors.First = 'Please Enter a First Name'
                    //     }
                    //     if(!(values.Last.includes(''))) {
                    //         errors.Last = 'Please Enter a Last Name'
                    //     }
                    //     if(!(values.Email.includes('@'))) {
                    //         errors.Email = 'Please Enter a Valid Email'
                    //     }
                    //
                    //     return errors;
                    // }}
                    onSubmit={(values, {setSubmitting}) => {
                        if(values.Phone === ''){values.Phone = 'N/A'}
                        if(values.Handicap === ''){values.Handicap = 'N/A'}
                        handleSubmit(values);
                        setSubmitting(true);
                        alert('Player Added');
                        setSubmitting(false)
                        window.location.reload();
                    }}>
                    {({values, isSubmitting}) => (
                        <Form>

                            <MyTextField placeholder='First' name="First" type='input' as={TextField}/>
                            <div>
                                <MyTextField placeholder='Last' name="Last" type='input' as={TextField}/>
                            </div>
                            <div>
                                <MyTextField placeholder='Email' name="Email" type='input' as={TextField}/>
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

