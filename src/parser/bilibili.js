//http://www.bilibili.com/video/av9418782/

import BaseParser from './base'

export default class BilibiliParser extends BaseParser {

    parseArgsFromLink(link) {
        if(link.includes('bilibili.com/video/av')) {
            let result = link.match(/av[0-9_.]+/)
            if(result) {
                let aid = result[0].slice(2)
                return {
                    aid: aid
                }
            }
        }
    }

    getEmbedTag(tagType, link) {
        console.log(tagType)
        let args = this.parseArgsFromLink(link)
        let tpl = ''
        if(args) {
            switch(tagType) {
                case 'embed':
                    tpl = `<embed
                        height="${this.height}"
                        width="${this.width}"
                        quality="high"
                        allowfullscreen="true"
                        type="application/x-shockwave-flash"
                        src="//static.hdslb.com/miniloader.swf"
                        flashvars="aid=${args.aid}&page=1"
                        pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash">
                    </embed>`
                    break
                case 'iframe':
                    tpl = `<iframe
                        src="http://www.bilibili.com/html/html5player.html?aid=${args.aid}"
                        width="640"
                        height="480"
                        frameborder="0"
                        webkitallowfullscreen mozallowfullscreen allowfullscreen>
                    </iframe>`
                    break
                case 'flash':
                    tpl = `/static.hdslb.com/miniloader.swf?aid=${args.aid}&page=1`
                    break
                default:
                    console.warn(`unsupported tagtype: ${tagType}`)
            }
        }
        return tpl
    }
}
