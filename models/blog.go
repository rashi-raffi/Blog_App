package models

import (
	u "blog-app/utils"
	"fmt"

	"github.com/jinzhu/gorm"
)

type Blog struct {
	gorm.Model
	BlogID string `json:"blogID" gorm:"-"`
	Title  string `json:"title" gorm:"not null"`
	Text   string `json:"text" gorm:"not null"`
	UserId uint   `json:"userid" gorm:"not null"` //The user that this contact belongs to
}

/*
 This struct function validate the required parameters sent through the http request body

returns message and true if the requirement is met
*/

func (blog *Blog) Validate() (map[string]interface{}, bool) {

	if blog.Title == "" {
		return u.Message(false, "Blog Title should be on the payload."), false
	}

	if blog.Text == "" {
		return u.Message(false, "Blog text should be on the payload"), false
	}

	if blog.UserId <= 0 {
		return u.Message(false, "User is not recognized"), false
	}

	//All the required parameters are present
	return u.Message(true, "success"), true
}

func (blog *Blog) Create() map[string]interface{} {

	if resp, ok := blog.Validate(); !ok {
		return resp
	}

	GetDB().Create(blog)

	resp := u.Message(true, "success")
	resp["contact"] = blog
	return resp
}

func GetBlog(id string) *Blog {

	blog := &Blog{}
	err := GetDB().Table("blogs").Where("id = ?", id).First(blog).Error
	if err != nil {
		return nil
	}
	return blog
}

func GetBlogs(user uint) []*Blog {

	blogs := make([]*Blog, 0)
	err := GetDB().Table("blogs").Where("user_id = ?", user).Find(&blogs).Error
	if err != nil {
		fmt.Println(err)
		return nil
	}

	return blogs
}
