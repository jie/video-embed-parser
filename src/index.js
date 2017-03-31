import {
    BilibiliParser,
    TudouParser,
    YoukuParser,
    YoutubeParser
} from './parser'




class VideoParser {

    constructor(props) {
        this.tagType = props.tagType || 'embed'
        this.bilibili = new BilibiliParser({width: props.width, height: props.height})
        this.youku = new YoukuParser({width: props.width, height: props.height})
        this.tudou = new TudouParser({width: props.width, height: props.height})
        this.youtube = new YoutubeParser({width: props.width, height: props.height})
    }

    getEmbedTag(link) {
        if(link.includes('bilibili')) {
            return this.bilibili.getEmbedTag(this.tagType, link)
        } else if (link.includes('youku')) {
            return this.youku.getEmbedTag(this.tagType, link)
        } else if (link.includes('tudou')) {
            return this.tudou.getEmbedTag(this.tagType, link)
        } else if (link.includes('youtube')) {
            return this.youtube.getEmbedTag(this.tagType, link)
        }
    }
}


module.exports = {
  VideoParser: VideoParser
}
