package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"text/template"
)

type Page struct {
	Name string
	Url  string
}

func fileHandler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	if path == "/" {
		path = "/index.html"
		homeHandler(w, r)
		return
	}

	filePath := filepath.Join("pages", filepath.Clean(path))

	fmt.Println("Filepath", filePath)
	fmt.Println("Path", path)

	if info, err := os.Stat(filePath); os.IsNotExist(err) {
		fmt.Println("Info: ", info)
		fmt.Println("Error: ", err)
		http.NotFound(w, r)
		return
	}
	http.ServeFile(w, r, filePath)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	items := []Page{{Name: "This is not a Vape", Url: "/thisIsNotAVape/"},
		{Name: "HedgeHog", Url: "/hedgehog/"},
		{Name: "Moving Box", Url: "/movingBox/"},
		{Name: "Solar System", Url: "/solarSystem/"},
		{Name: "Bouncing Balls", Url: "/bouncingBalls/"},
	}
	tmpl, err := template.ParseFiles("./pages/index.html")
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Unable to parse template", http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, items)
	if err != nil {
		http.Error(w, "Unable to execute template", http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/", fileHandler)
	fmt.Println("Listening in port 8000...")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
