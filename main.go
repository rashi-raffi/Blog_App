package main

import (
	"blog-app/app"
	"blog-app/controllers"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter()

	router.HandleFunc("/api/user/new", controllers.CreateAccount).Methods("POST")
	router.HandleFunc("/api/user/login", controllers.Authenticate).Methods("POST")
	router.HandleFunc("/api/blogs/new", controllers.CreateBlog).Methods("POST")
	router.HandleFunc("/api/blog", controllers.GetBlog).Methods("GET")
	router.HandleFunc("/api/me/blogs", controllers.GetBlogsFor).Methods("GET")
	router.Use(app.JwtAuthentication) //attach JWT auth middleware

	router.NotFoundHandler = app.NotFoundHandler(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000" //localhost
	}

	fmt.Println(port)

	err := http.ListenAndServe(":"+port, router) //Launch the app, visit localhost:8000/api
	if err != nil {
		fmt.Print(err)
	}
}
