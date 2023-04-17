# Ionic learning app template (core)

This is a template for educational app. You can easily change example content and styles with yours and run your own educational app.

## Config

### Languages/Layers

This section of `config` tells the app, which languages and layers exist in the app, and can be chosen by user. They will be loaded and displayed with any opened page. E.g.:

- main text
- translation
- transliteration
- notes
- comments

An example (`/public/config.json`)

```json
{
	"languages": [
		{
			"code": "en",
			"title": "English",
			"layers": [
				{ "code": "main", "title": "translation" },
				{ "code": "notes", "title": "notes" }
			]
		},
		{
			"code": "ru",
			"title": "Russian",
			"layers": [
				{ "code": "main", "title": "translation" },
				{ "code": "transcription", "title": "transcription" }
			]
		}
	]
}
```

Then you should place related to each layer files to path: `/content/folder/layers/code_of_lang/code_of_layer`, e.g.:

- `content/alices-adventures/en/main`
- `content/alices-adventures/en/notes`
- `content/alices-adventures/ru/transliteration`
