# Phrasal player Mobile/Web app

- Frontend -- [Ionic/React](https://ionicframework.com/)
- Backend -- [Supabase](https://supabase.com/)

You can always dive into their docs for more details.

In the root folder place the file `.env`:

```
REACT_APP_SUPABASE_URL=xxxxx
REACT_APP_SUPABASE_ANON_KEY=xxxxx
```

This keys (environment variables) you can get from your Supabase project page.

## Organize content

In a Supabase project storage admin panel create 3 buckets:

- audios
- subs
- translations

Create similar folder/file structure in all buckets. Use folder/file names that can be obviously ordered. E.g.: `1, 2, 3, ... 10, 11` will be ordered to `1, 10, 11, 2, 3, ... `, because string ordering works in such way. So you should use names like: `001, 002, 003, ..., 010, 011`.

In a `translations` bucket create folders for each language you want to add translation to it. E.g. `en`, `es`, `ar`, `ru`. Then create inside the folder/file structure exact like in `audios` and `subs`.

For example:

```
audios
	chapter001
		page001.mp3
		page002.mp3
	chapter002
		page001.mp3
		page002.mp3
subs
	chapter001
		page001.txt
		page002.ass
	chapter002
		page001.vtt
		page002.srt
translations
	ru
		chapter001
			page001.txt
			page002.txt
		chapter002
			page001.txt
			page002.txt
	en
		chapter001
			page001.txt
			page002.txt
		chapter002
			page001.txt
			page002.txt
```

A folder/file structure from Supabase storage admin panel will be automatically converted to navigation menu in your app.
