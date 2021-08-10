import React, { Component } from "react";
import axios from "axios";
class BlogPost extends Component {
    state = {
        blogs: [],
    };
    render() {
        const BlogsList = this.props.blogs.data;
        if (BlogsList) {
            console.log(Object.values(BlogsList).length);
            if (Object.values(BlogsList).length > 0) {
                return (
                    <div className="container" style={{ marginTop: "50px" }}>
                        {Object.values(BlogsList).map((bgs, index) => (
                            <div
                                className="ui card"
                                key={index}
                                style={{ width: "auto" }}
                            >
                                <div className="content">
                                    <div className="header">{bgs.title}</div>
                                    <div className="meta">
                                        <span>{Date(bgs.CreatedAt)}</span>
                                    </div>
                                    <p>{bgs.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }
        }
        return (
            <div className="container" style={{ margin: "50px" }}>
                <div className="ui card" style={{ width: "auto" }}>
                    <div className="content">
                        <div className="header">No Posts found...!</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogPost;
