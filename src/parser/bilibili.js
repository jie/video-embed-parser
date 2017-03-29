//http://www.bilibili.com/video/av9418782/

import BaseParser from './base'

class YoukuParser extends BaseParser {

    parseArgsFromLink(link) {
        if(link.includes('bilibili.com/video/av')) {
            let result = link.match(/av[0-9_.]+/)
            if(result) {
                let aid = result[0][]
                return {
                    aid: aid
                }
            }
        }
    }

    getIframeHtml(link) {
        let args = this.parseArgsFromLink(link)
        if(args) {
            let tpl = `<embed
                height="${this.height}"
                width="${this.width}"
                quality="high"
                allowfullscreen="true"
                type="application/x-shockwave-flash"
                src="//static.hdslb.com/miniloader.swf"
                flashvars="aid=${args.aid}&page=1"
                pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash">
            </embed>`
            return tpl
        }
        return ''
    }
}
