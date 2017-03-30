import {
    BilibiliParser,
    TudouParser,
    YoukuParser
} from './parser'




class VideoParser {

    constructor(props) {
        this.bilibili = new BilibiliParser({width: props.width, height: props.height})
        this.youku = new YoukuParser({width: props.width, height: props.height})
        this.tudou = new TudouParser({width: props.width, height: props.height})
    }

    getEmbedTag(link) {
        if(link.includes('bilibili')) {
            return this.bilibili.getEmbedTag(link)
        } else if (link.includes('youku')) {
            return this.youku.getEmbedTag(link)
        } else if (link.includes('tudou')) {
            return this.tudou.getEmbedTag(link)
        }
    }
}


module.exports = {
  VideoParser: VideoParser
}
