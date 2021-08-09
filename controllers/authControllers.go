package controllers

import (
	"blog-app/models"
	u "blog-app/utils"
	"encoding/json"
	"net/http"
)

var CreateAccount = func(w http.ResponseWriter, r *http.Request) {
	account := &models.Account{}
	err := json.NewDecoder(r.Body).Decode(account) //decode the request body into struct and failed if any error occur
	if err != nil {
		u.Respond(w, u.Message(false, "Invalid request"))
		return
	}

	resp := account.Create() //Create account

	// tkn := resp["token"].(string)
	// cookie := http.Cookie{Name: "token", Value: tkn}
	// http.SetCookie(w, &cookie)

	u.Respond(w, resp)
}

var Authenticate = func(w http.ResponseWriter, r *http.Request) {

	account := &models.Account{}
	err := json.NewDecoder(r.Body).Decode(account) //decode the request body into struct and failed if any error occur
	if err != nil {
		u.Respond(w, u.Message(false, "Invalid request"))
		return
	}

	resp := models.Login(account.Email, account.Password)

	// tkn := resp["token"].(string)
	// cookie := http.Cookie{Name: "token", Value: tkn}
	// http.SetCookie(w, &cookie)

	u.Respond(w, resp)
}
