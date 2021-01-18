import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const OnSubmit = (event: any) => {

};



const Home = () => (
    <Form>
        <FormGroup>
            <Label for="firstName">FirstName</Label>
            <Input type="text" name="firstName" id="firstName" placeholder="First Name" />
        </FormGroup>
        <FormGroup>
            <Label for="lastName">LastName</Label>
            <Input type="text" name="lastName" id="lastName" placeholder="Last Name" />
        </FormGroup>
        <FormGroup>
            <Label for="Email">Email</Label>
            <Input type="email" name="email" id="Email" placeholder="Email" />
        </FormGroup>
        <FormGroup>
            <Label for="Selection">Select Activity</Label>
            <Input type="select" name="select" id="Selection">
                <option>Activity 1</option>
                <option>Activity 2</option>
                <option>Activity 3</option>
                <option>Activity 4</option>
                <option>Activity 5</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label for="Comments">Comments</Label>
            <Input type="textarea" name="text" id="Comments" />
        </FormGroup>
        
        
        
        <Button>Submit</Button>
    </Form>
);

export default connect()(Home);
