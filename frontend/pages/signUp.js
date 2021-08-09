import React, { Component } from 'react'
import axios from 'axios';
import router from 'next/router';
import Link from 'next/link'
import cookieCutter from 'cookie-cutter'

class SignUp extends Component {
    state = { 
        userName: '',
        email: '',
        password: ''
    }
    

    onFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:8000/api/user/new ", {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
          });
          if (response.data.status) {
            const token = response.data.account.token
            localStorage.setItem("token", token)
            router.push('/SignIn')
          }
        } catch (error) {
          console.log(error);
        };
    }

    isTokenValid = () => {
      const token = localStorage.getItem("token")
      if(token){
        console.log(token)
        router.push('/blogs')
      }
    }


    async componentDidMount() {
      this.isTokenValid()
    }
    


    render(){
        return(
          <div>
              <p>Sign Up with Password</p>
              <form onSubmit={this.onFormSubmit}>
                  <input type="text" placeholder="Name Name" value={this.state.userName} onChange={(e) => this.setState({ userName: e.target.value })} /><br />
                  <input type="text" placeholder="Email id" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}  /><br />
                  <input type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}  /><br />
                  <input type="submit" value="Submit" />
                  <div >
                    <p>Already Registered?<br/><Link href="/SignIn"><a>Signin</a></Link></p>
                  </div>
              </form>
          </div>
        );
      };
}

export default SignUp;