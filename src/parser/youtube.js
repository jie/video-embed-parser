//http://www.bilibili.com/video/av9418782/

import BaseParser from './base'

export default class YoutubeParser extends BaseParser {

    parseArgsFromLink(link) {
        if(link.includes('youtube.com')) {
            let result = link.match(/\?v=[A-Za-z0-9]+/)
            if(result) {
                let vid = result[0].slice(3)
                return {
                    vid: vid
                }
            }
        }
    }

    getEmbedTag(tagType, link) {
        let args = this.parseArgsFromLink(link)
        let tpl = ''
        if(args) {
            switch(tagType) {
                case 'iframe':
                    tpl = `<iframe
                        width="${this.width}"
                        height="${this.height}"
                        src="https://www.youtube.com/embed/${args.vid}"
                        frameborder="0"
                        allowfullscreen>
                    </iframe>`
                    break
                case 'embed':
                    tpl = `<embed
                        src="http://www.youtube.com/v/${args.vid}?version=3&rel=0&amp;autohide=1&amp"
                        wmode="transparent"
                        type="application/x-shockwave-flash"
                        width="${this.width}"
                        height="${this.height}"
                        allowfullscreen="true"
                        title="Adobe Flash Player">
                    </embed>`
                    break
                default:
                    console.warn(`unsupported tagtype: ${tagType}`)
            }
        }
        return tpl
    }
}
