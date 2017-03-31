# video-embed-parser
A video embed tag parser for bilibili, youku, tudou and youtube.


## install
install from npm
``` bash
npm install --save video-embed-parser
```

install from yarn
``` bash
yarn add video-embed-parser
```

## using
``` javascript
import { VideoParser } from 'video-embed-parser'

const parser = new VideoParser()
let html = parser.getEmbedTag(this.state.link)
console.log(html)
```

## example
```
https://jie.github.io/video-embed-parser/
```
