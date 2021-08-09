import React, { Component } from 'react'
import router from 'next/router';
import Link from 'next/link';
import axios from 'axios';

class Blogs extends Component {

    state = {
        token: '',
        title: '',
        blogContent: ''
    }

    isTokenValid = () => {
        if(typeof window !== "undefined" && window.localStorage){
            const tkn = localStorage.getItem("token")
            if(tkn !== "undefined"){
                this.setState({ token : tkn })
            }
            else{
                localStorage.clear();
                router.push('/SignIn')
            }
            
        }
        else{
            router.push("/SignIn")
        }
    }

    onFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/blogs/new ", {
                title : this.state.title,
                text : this.state.blogContent
            },
            {
                headers:{
                    "Authorization" : 'token '.concat(this.state.token)
                },
            },
            );
            if(response.data.ststus){
                console.log("Blog Added..!")
            }
            else{
                console.log(response.data.message)
            }
        }
        catch (error) {
          console.log(error);
        };
    }

    async componentDidMount() {
        this.isTokenValid()
    }
    
    // componentDidUpdate() {
    //     console.log("Rerendered")
    // }

    render() { 
        return ( 
            <div>
                <p>All blogs are here..!</p>
                <p>Add Blogs</p>
              <form onSubmit={this.onFormSubmit}>
                  <input type="text" placeholder="Title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })}  /><br />
                  <input type="text" placeholder="Content" value={this.state.blogContent} onChange={(e) => this.setState({ blogContent: e.target.value })}  /><br />
                  <input type="submit" value="Submit" />
              </form>
            </div>
         );
    }
}
 
export default Blogs;