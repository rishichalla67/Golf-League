import React, {Fragment} from "react";
import { Formik, Field, Form} from 'formik'
import { TextField, Button } from "@material-ui/core";
import Menu from './Menu'
import axios from 'axios'

var idTracker = 0;

class playerForm extends React.Component {
    constructor() {
        super();

        //this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    /*
    handleChange = e  => {
        this.setState({ [e.target.name]: e.target.value })
    }*/

    async handleSubmit(values) {
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
    }


        render() {
        return (
            <Fragment>
                <div className='bg'>
                    <Menu/>
                    <h1>ADD PLAYER</h1>
                    <Formik
                        initialValues={{
                            First: '',
                            Last: '',
                            Email: '',
                            Phone: '',
                            Handicap: ''
                        }}
                        onSubmit={(values, {setSubmitting}) => {
                            idTracker = idTracker + 1;
                            this.handleSubmit(values)
                            setSubmitting(true)
                            alert('Player Added! Thank you!')
                            setSubmitting(false)
                        }}>
                        {({values, isSubmitting}) => (
                            <Form>

                                <Field placeholder='First' name="First" type='input' as={TextField}/>
                                <div>
                                    <Field placeholder='Last' name="Last" type='input' as={TextField}/>
                                </div>
                                <div>
                                    <Field placeholder='Email' name="Email" type='input' as={TextField}/>
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
                        )}</Formik>
                </div>
            </Fragment>

        );
    }
}

export default playerForm