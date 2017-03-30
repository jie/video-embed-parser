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

    getEmbedTag(link) {
        let args = this.parseArgsFromLink(link)
        if(args) {
            let tpl = `<iframe
                src="http://www.tudou.com/programs/view/html5embed.action?type=${args.type}&code=${args.code}&lcode=${args.lcode}"
                allowtransparency="true"
                allowfullscreen="true"
                allowfullscreenInteractive="true"
                scrolling="no"
                border="0"
                frameborder="0"
                style="width:${this.width}px;height:${this.height}px;">
            </iframe>`
            return tpl
        }
        return ''
    }
}
