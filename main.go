package main

import (
	"blog-app/app"
	"blog-app/controllers"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {

	router := mux.NewRouter().StrictSlash(true)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	})

	handler := c.Handler(router)

	// Handle request for creating a new user.
	router.HandleFunc("/api/user/new", controllers.CreateAccount).Methods("POST")

	// Handle request for login.
	router.HandleFunc("/api/user/login", controllers.Authenticate).Methods("POST")

	// Handle request for creating a new user.
	router.HandleFunc("/api/blogs/new", controllers.CreateBlog).Methods("POST")

	// Handle request for fetching a single blog.
	router.HandleFunc("/api/blog", controllers.GetBlog).Methods("GET")

	// Handle request for fetching all the blogs of a user.
	router.HandleFunc("/api/me/blogs", controllers.GetBlogsFor).Methods("GET")

	//Attach JWT auth middleware.
	router.Use(app.JwtAuthentication)

	// Resource not found handler.
	router.NotFoundHandler = app.NotFoundHandler(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000" //localhost
	}

	fmt.Println(port)

	err := http.ListenAndServe(":"+port, handler) //Launch the app, visit localhost:8000/api
	if err != nil {
		fmt.Print(err)
	}
}
