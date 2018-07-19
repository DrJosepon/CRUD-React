import React, { Component } from 'react'; 
import {
    Link,
    Route
} from 'react-router-dom';

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: []
        };

        this.match = this.props.match;
      }
      
    render() {
        return (
            //({ match }) => (
            <div>
                <ul>
                    <li><Link to={`${this.match.url}/technology`}>Technology</Link></li>
                    <li><Link to={`${this.match.url}/business`}>Business</Link></li>
                    <li><Link to={`${this.match.url}/economics`}>Economics</Link></li>
                </ul>


                <Route exact path={`${this.match.path}/technology`} render={() => (<div> This is technology </div>)}/>
                <Route path='/courses/business' component={() => (<div> This is business </div>)}/>
                <Route path={`${this.match.path}/economics`} component={() => (<div> This is economics </div>)}/>
            </div>
           // )
        );
          
    }

}

export default Courses;