import React, { Component } from "react";
import router from "next/router";
import Link from "next/link";
import axios from "axios";
import BlogPost from "../../components/posts";
import ErrorMessage from "../../components/error";
import SuccessMessage from "../../components/success";

class Blogs extends Component {
    state = {
        token: "",
        title: "",
        blogContent: "",
        blogs: [],
        errMsg: "",
        succMsg: "",
    };

    isTokenValid = () => {
        if (typeof window !== "undefined" && window.localStorage) {
            const tkn = localStorage.getItem("token");
            if (tkn) {
                this.setState({ token: tkn });
                this.getBlog(tkn);
            } else {
                localStorage.clear();
                router.push("/SignIn");
            }
        } else {
            router.push("/SignIn");
        }
    };

    onFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/blogs/new ",
                {
                    title: this.state.title,
                    text: this.state.blogContent,
                },
                {
                    headers: {
                        Authorization: "token ".concat(this.state.token),
                    },
                }
            );
            if (response.data.status) {
                console.log("Blog Added..!");
                this.setState({
                    title: "",
                    blogContent: "",
                    succMsg: response.data.message,
                    errMsg: "",
                });
                this.getBlog(this.state.token);
            } else {
                console.log(response.data.message);
                this.setState({ errMsg: response.data.message });
            }
        } catch (error) {
            console.log(error);
        }
    };

    getBlog = async (tkn) => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/me/blogs ",
                {
                    headers: {
                        Authorization: "token ".concat(tkn),
                    },
                }
            );
            if (response.status) {
                this.setState({ blogs: response.data });
                console.log(response.data);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    async componentDidMount() {
        this.isTokenValid();
    }

    logOut() {
        localStorage.clear();
        router.push("/SignIn");
    }

    componentDidUpdate() {
        console.log("Rerendered.");
    }

    render() {
        return (
            <div className="ui container" style={{ marginTop: "20px" }}>
                <div>
                    <button>
                        <a onClick={this.logOut} href="/SignIn" class="ui item">
                            Logout
                        </a>
                    </button>
                </div>
                <form onSubmit={this.onFormSubmit} className="ui form error">
                    <div className="field">
                        <label htmlFor="BlogTitle">Title</label>
                        <input
                            type="text"
                            id="BlogTitle"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={(e) =>
                                this.setState({ title: e.target.value })
                            }
                        />
                    </div>
                    <div className="field">
                        <label>Text</label>
                        <textarea
                            type="text"
                            placeholder="Content"
                            value={this.state.blogContent}
                            onChange={(e) =>
                                this.setState({ blogContent: e.target.value })
                            }
                        />
                    </div>
                    <input type="submit" className="ui button" value="Submit" />
                    {this.state.errMsg ? (
                        <ErrorMessage message={this.state.errMsg} />
                    ) : (
                        <SuccessMessage message={this.state.succMsg} />
                    )}
                </form>
                <div>
                    <BlogPost blogs={this.state.blogs} />
                </div>
            </div>
        );
    }
}

export default Blogs;
