import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import * as HomeStore from '../store/Home';
import { ApplicationState } from '../store';
import { RouteComponentProps } from 'react-router';

// At runtime, Redux will merge together...
type HomeProps =
    HomeStore.HomeState // ... state we've requested from the Redux store
    & typeof HomeStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{}>;


class Home extends React.PureComponent<HomeProps, HomeStore.HomeState> {

    
    /** This method is called when the component is first added to the document*/
    public componentDidMount() {
        
    }

    /** This method is called when the route parameters change*/
    public componentDidUpdate() {
        
    }

    /** This method is called on Submit */
    private OnSubmit = (event: any) => {
        event.preventDefault();
        this.props.SubmitUser();
        
    }

    public render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.OnSubmit}>
                    <FormGroup>
                        <Label for="firstName">FirstName</Label>
                        <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.OnChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">LastName</Label>
                        <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.OnChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Email">Email</Label>
                        <Input type="email" name="email" id="Email" placeholder="Email" onChange={this.OnChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Selection">Select Activity</Label>
                        <Input type="select" name="activity" id="Selection" onChange={this.OnChange}>
                            <option>Activity 1</option>
                            <option>Activity 2</option>
                            <option>Activity 3</option>
                            <option>Activity 4</option>
                            <option>Activity 5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Comments">Comments</Label>
                        <Input type="textarea" name="comments" id="Comments" onChange={this.OnChange} />
                    </FormGroup>



                    <Button>Submit</Button>
                </Form>
            </React.Fragment>
        );
    }

    private OnChange = (event: any) => {
        const name = event.target.name;
        const val = event.target.value;

        /** Updates the HomeState*/
        this.props.UpdateField(name, val);

        
        
    }
}



export default connect(
    (state: ApplicationState) => state.Home, // Selects which state properties are merged into the component's props
    HomeStore.actionCreators // Selects which action creators are merged into the component's props
)(Home as any);
