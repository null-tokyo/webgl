# frontend-template
個人で利用しているフロントエンド開発環境です。

## Feature
- [x] タスクランナ- (gulp)
- [x] HTMLモジュール (EJS)
- [x] JSモジュールバンドラー (Webpack)
    - [x] cache-loader
    - [x] babel-loader
    - [x] eslint-loader
    - [x] style-loader
    - [x] css-loader
    - [x] sass-loader
    - [x] postcss-loader
    - [x] prettier
    - [x] webpack-glsl-loader
- [x] CSSのベンダープレフィックス付与自動化 (autoprefixer)
- [x] CSSの圧縮 (csswring)
- [x] ライブリロード (browser-sync)
- [ ] SVGスプライト生成
- [ ] CSSスプライト生成
- [ ] SVG Minify (SVGO)
- [x] HTM Minify (html-minifier)
- [ ] HTMLinter
- [ ] SassLinter

## Usage

### Install
```
$ npm i
```

### Start Tasks
```
$ npm run start
```

### Build By Development Mode
```
$ npm run dev
```

### Build By Production Mode
```
$ npm run prod
```

## Directories
```
├── .eslint
├── .gitignore
├── data.json //HTML内のtitleやdescriptionの設定
├── gulpfile.js
├── package.json
├── gulp
│   ├── tasks
│   ├── config.js
│   └── plugins.js
├── src
│   ├── images
│   ├── js
│   │   └── modules
│   ├── scss
│   │   ├── base
│   │   ├── component
│   │   ├── layout
│   │   ├── project
│   │   ├── style.scss
│   │   └── utility
│   └── view
│       ├── _template.ejs
│       ├── base
│       │   ├── _header.ejs
│       │   └── _footer.ejs
│       ├── modules
│       └── index.ejs
├── webpack.config.js
└── dist
```
