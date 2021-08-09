import React, { Component } from 'react'
import router from 'next/router';

class Blogs extends Component {

    state = {
        token: ''
    }

    isAuthenticated(){
        
    }
    isTokenValid = () => {
        let token = ''
        if(typeof window !== "undefined" && window.localStorage){
            token = localStorage.getItem("token")
            
        }
        if(token){
          console.log(token)
          this.setState({ token : token })
        }
        else{
            router.push("/SignIn")
        }
    }

    async componentDidMount() {
        this.isTokenValid()
    }
    
    componentDidUpdate() {
        console.log("Rerendered")
    }

    render() { 
        return ( 
            <div>All blogs are here..! {this.state.token} </div>
         );
    }
}
 
export default Blogs;