import React from 'react';
import firestore from "./firestore";

class users extends React.Component {
    render() {
      return (
          <form>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
            />
            <input
              type="email"
              name="email"
              placeholder="Full name"
            />
            <button type="submit">Submit</button>
          </form>
          );
        }
     }
  export default users;
