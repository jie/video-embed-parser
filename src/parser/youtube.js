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

    getEmbedTag(tagType, link, size) {
        let width = size.width || this.width
        let height = size.height || this.height
        let args = this.parseArgsFromLink(link)
        let tpl = ''
        if(args) {
            switch(tagType) {
                case 'iframe':
                    tpl = `<iframe
                        width="${width}"
                        height="${height}"
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
                        width="${width}"
                        height="${height}"
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
