package main

import (
	"context"
	"fmt"
	"strings"
)

// App struct
type App struct {
	ctx context.Context
}

type IdealLimitDataResponse struct {
	Words       map[string]Word      `json:"words"`
	Size        int                  `json:"size"`
	Frequencies map[string]Frequency `json:"frequencies"`
}

type Word struct {
	Count     int     `json:"count"`
	Frequency float64 `json:"frequency"`
}

type Frequency struct {
	Value float64 `json:"value"`
	Count int     `json:"count"`
	Total float64 `json:"total"`
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


func (a *App) GetCharacters(words string) IdealLimitDataResponse {
	uniqueCharacters := make(map[rune]struct{})

	size := len(words)
	frequencies := make(map[string]Frequency)

	for _, character := range words {
		if character == ' ' {
			continue
		}
		uniqueCharacters[character] = struct{}{}
	}

	wordCount := make(map[string]Word)
	for character := range uniqueCharacters {
		count := strings.Count(words, string(character))
		wordCount[string(character)] = Word{Count: count}
	}

	for key, value := range wordCount {
		value.Frequency = float64(value.Count) / float64(size)
		wordCount[key] = value
	}

	for _, value := range wordCount {
		frequencies[fmt.Sprintf("%f", value.Frequency)] =
			Frequency{Value: value.Frequency, Count: frequencies[fmt.Sprintf("%f", value.Frequency)].Count + 1,
				Total: value.Frequency * float64(frequencies[fmt.Sprintf("%f", value.Frequency)].Count+1)}
	}

	return IdealLimitDataResponse{Words: wordCount, Size: size, Frequencies: frequencies}
}
