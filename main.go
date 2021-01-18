package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"net/http"
	"strconv"
)

type Todo struct {
	gorm.Model
	Todo      string `json:"todo"`
	Emergency uint64 `json:"emergency"`
}

func GetAll() []Todo {
	db, err := sqlConnect()
	if err != nil {
		panic(err.Error())
	}
	var todos []Todo
	db.Order("id asc").Find(&todos)
	return todos
}

func GetItem(id string) Todo {
	db, err := sqlConnect()
	if err != nil {
		panic(err.Error())
	}
	var todo Todo
	db.Where("id = ?", id).Find(&todo)
	return todo
}

func main() {
	db, err := sqlConnect()
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("接続成功")

	//わからない。
	db.AutoMigrate(&Todo{})

	engine := gin.Default()
	ua := ""
	engine.Use(func(c *gin.Context) {
		ua = c.GetHeader("User-Agent")
		headers := c.Request.Header.Get("Access-Control-Request-Headers")
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET,POST,PUT,HEAD,PATCH,DELETE,OPTIONS")
		c.Header("Access-Control-Allow-Headers", headers)

		if c.Request.Method == "OPTIONS" {
			c.Status(200)
			c.Abort()
		}
		c.Next()
	})
	engine.LoadHTMLGlob("templates/*")
	engine.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": GetAll(),
		})
		//c.HTML(http.StatusOK, "index.html", gin.H{
		//	"message": GetAll(),
		//})
	})
	engine.GET("/edit/:id", func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, gin.H{
			"data": GetItem(id),
		})
	})
	engine.POST("/update", func(c *gin.Context) {

		var todo Todo

		c.Bind(&todo)

		fmt.Println(todo)

		//id := c.Param("id")
		//ui,_ := strconv.ParseUint(id, 10, 32)
		//todoItem := c.PostForm("todo")
		//emergency := c.PostForm("emergency")
		//emergencyUint64, _ := strconv.ParseUint(emergency, 10, 64)

		//jsonStr := c.Request.FormValue("todo")
		//var todo Todo
		//json.Unmarshal([]byte(jsonStr), &todo)
		//c.JSON(201, todo)
		//db.First(&todo, id)
		//todo.Todo = todo.Todo
		//todo.Emergency = todo.Emergency
		//db.Save(&todo)

		//c.Redirect(http.StatusMovedPermanently, "/")
	})
	engine.POST("/add", func(c *gin.Context) {
		swap := func(a *int, b *int) {
			tmp := *a
			*a = *b
			*b = tmp
		}

		a := 1
		b := 2

		fmt.Println(a, b)

		swap(&a, &b)

		fmt.Println(a, b)

		todo := Todo{}

		err := c.Bind(&todo)
		if err != nil {
			log.Fatalln(err)
		}

		db.Create(&todo)

		c.JSON(201, "")

		//todo := c.PostForm("todo")
		//emergency := c.PostForm("emergency")
		//emergencyUint64, _ := strconv.ParseUint(emergency, 10, 64)
		//result := db.Create(&Todo{Todo: todo, Emergency: emergencyUint64})
		//if err := result.Error; err != nil {
		//	fmt.Println("ERROR occurred")
		//}
		//c.JSON(http.StatusOK, gin.H{
		//	"todo": todo,
		//	"emergency": emergency,
		//})
		//c.Redirect(http.StatusMovedPermanently, "/")
	})
	engine.POST("/delete/:id", func(c *gin.Context) {
		id := c.Param("id")
		ui, _ := strconv.ParseUint(id, 10, 32)
		var todo = Todo{
			Model: gorm.Model{
				ID: uint(ui),
			},
		}
		db.Delete(&todo)
		//c.Redirect(http.StatusMovedPermanently, "/")
	})
	engine.Run(":3001")
}

func sqlConnect() (database *gorm.DB, err error) {
	USER := "root"
	PASS := "password"
	PROTOCOL := "tcp(localhost:3306)"
	DBNAME := "go-to-do"

	CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DBNAME + "?charset=utf8mb4&parseTime=true&loc=Asia%2FTokyo"
	return gorm.Open(mysql.Open(CONNECT), &gorm.Config{})
}
