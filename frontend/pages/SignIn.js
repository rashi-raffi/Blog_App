import React, { Component } from 'react'
import axios from 'axios';
import router from 'next/router';
import Link from 'next/link'
import cookieCutter from 'cookie-cutter'

class SignIn extends Component {
    state = { 
        userName: '',
        email: '',
        password: '',
        token: ''
    }

    isTokenValid = () => {
      const token = localStorage.getItem("token")
      if(token){
        console.log(token)
        router.push('/blogs')
      }
    }

    onFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:8000/api/user/login  ", {
            email: this.state.email,
            password: this.state.password
          });
          if (response.data.status) {
            localStorage.setItem("token", response.data.account.token)
            router.push('/blogs')
          }
        } catch (error) {
          console.log(error);
        };
    }

    async componentDidMount() {
      this.isTokenValid()
    }
    


    render(){
        return(
          <div>
              <p>Sign In </p>
              <form onSubmit={this.onFormSubmit}>
                  <input type="text" placeholder="Email id" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}  /><br />
                  <input type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}  /><br />
                  <input type="submit" value="Submit" />
                  <div >
                    <p>Not Already ?<br/><Link href="/SignUp"><a>Signin</a></Link></p>
                  </div>
              </form>
          </div>
        );
      };
}

export default SignIn;