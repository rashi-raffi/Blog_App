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

var GetContactsFor = func(w http.ResponseWriter, r *http.Request) {

	id := r.Context().Value("user").(uint)
	data := models.GetContacts(id)
	resp := u.Message(true, "success")
	resp["data"] = data
	u.Respond(w, resp)
}
