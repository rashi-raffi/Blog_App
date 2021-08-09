import React, { Component } from 'react'
import axios from 'axios';
class BlogPost extends Component {
    state = {
        blogs: []
    }
    
    // componentDidMount() {
    //     this.getBlog();
    // }
    
    render() { 
        const BlogsList = this.props.blogs.data
        if(BlogsList){
        console.log(Object.values(BlogsList).length)
        if(Object.values(BlogsList).length > 0){
            return (<div>
                {Object.values(BlogsList).map((bgs, index) => (
                    <div key={index}>
                        <div> {bgs.title} </div>
                        <div> {bgs.text} </div>
                    </div>
                    
                ))}
                </div>);
        }
        }
        return(
            <div>
                No post found..!
            </div>)
    }
}
 
export default BlogPost;