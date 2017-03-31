//listplay
//albumplay
//programs

import BaseParser from './base'

export default class TudouParser extends BaseParser {

    parseArgsFromLink(link) {
        if(link.includes('tudou.com/listplay')) {
            let result = link.match(/tudou.com\/listplay\/[A-Za-z0-9_\-]+\/[A-Za-z0-9_\-]+/)
            if(result) {
                let lcode = result[0].split('/')[2]
                let code = result[0].split('/')[3]
                return {
                    lcode: lcode,
                    code: code,
                    type: 1
                }
            }
        }

        if(link.includes('tudou.com/albumplay')) {
            let result = link.match(/tudou.com\/albumplay\/[A-Za-z0-9_\-]+\/[A-Za-z0-9_\-]+/)
            if(result) {
                let lcode = result[0].split('/')[2]
                let code = result[0].split('/')[3]
                return {
                    lcode: lcode,
                    code: code,
                    type: 2
                }
            }
        }

        if(link.includes('tudou.com/programs')) {
            let result = link.match(/tudou.com\/programs\/view\/[A-Za-z0-9_\-]+/)
            if(result) {
                let code = result[0].split('/')[3]
                return {
                    lcode: '',
                    code: code,
                    type: 0
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
                        src="http://www.tudou.com/programs/view/html5embed.action?type=${args.type}&code=${args.code}&lcode=${args.lcode}"
                        allowtransparency="true"
                        allowfullscreen="true"
                        allowfullscreenInteractive="true"
                        scrolling="no"
                        border="0"
                        frameborder="0"
                        style="width:${width}px;height:${height}px;">
                    </iframe>`
                    break
                case 'embed':
                    tpl = `<embed src="http://www.tudou.com/v/${args.code}/v.swf"
                        type="application/x-shockwave-flash"
                        allowscriptaccess="always"
                        allowfullscreen="true"
                        wmode="opaque"
                        width="${width}"
                        height="${height}"></embed>`
                    break
                case 'flash':
                    tpl = `http://www.tudou.com/l/${args.code}/v.swf`
                    break
                default:
                    console.warn(`unsupported tagtype: ${tagType}`)
            }
        }
        return tpl
    }
}
