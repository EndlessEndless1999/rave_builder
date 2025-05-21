package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// FileData Struct
type FileData struct {
	Base64   string `json:"base64"`
	MimeType string `json:"mimeType"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) ReadFile(path string) string {
	data, err := os.ReadFile(path)
	if err != nil {
		return ""
	}

	return base64.StdEncoding.EncodeToString(data)
}
