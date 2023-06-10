# Lang Sys
- 日本語の音声を１つずつ積み重ねて学習できるサイト

## image
- [unsplash](https://unsplash.com)

## webm to mp3
https://cloudconvert.com/webm-to-mp3


## Chrome71 以降の自動再生制限の回避
-  [ボタンクリック時にコンテキストを生成する](https://www.wizard-notes.com/entry/javascript/web-audio-api-chrome-user-interaction)
```js
document.querySelector('button').addEventListener('click', function() {
  var context = new AudioContext();
  // Setup all nodes
  // ...
});
```

## Firebase Stroage SORS
```sh
gsutil cors get gs://lang-sys.appspot.com
gsutil cors set cors.json gs://lang-sys.appspot.com
```

## Use Absolute Paths
`tsconfig.json`
```json
{
  "compilerOptions":{
    "baseUrl": "src",
  }
}
```
`vite.config.ts`
```ts
const directories = ['views', 'assets', 'application', 'infrastracture'];

const alias = directories.reduce(
  (acc, cur) => ({ ...acc, [cur]: `/src/${cur}` }),
  { src: '/src' }
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias },
});
```