package controllers

import (
	"blog-app/models"
	u "blog-app/utils"
	"encoding/json"
	"net/http"
)

var CreateBlog = func(w http.ResponseWriter, r *http.Request) {

	user := r.Context().Value("user").(uint) //Grab the id of the user that send the request
	blog := &models.Blog{}

	err := json.NewDecoder(r.Body).Decode(blog)
	if err != nil {
		u.Respond(w, u.Message(false, "Error while decoding request body"))
		return
	}

	blog.UserId = user
	resp := blog.Create()
	u.Respond(w, resp)
}

var GetBlogsFor = func(w http.ResponseWriter, r *http.Request) {

	id := r.Context().Value("user").(uint)
	data := models.GetBlogs(id)
	resp := u.Message(true, "success")
	resp["data"] = data
	u.Respond(w, resp)
}

var GetBlog = func(w http.ResponseWriter, r *http.Request) {
	blog := &models.Blog{}
	err := json.NewDecoder(r.Body).Decode(blog) //decode the request body into struct and failed if any error occur
	if err != nil {
		u.Respond(w, u.Message(false, err.Error()))
		return
	}
	//id := r.Context().Value("id").(uint)
	id := blog.BlogID
	data := models.GetBlog(id)
	resp := u.Message(true, "success")
	resp["data"] = data
	u.Respond(w, resp)
}
