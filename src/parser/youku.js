import BaseParser from './base'

export default class YoukuParser extends BaseParser {

    parseArgsFromLink(link) {
        if(link.includes('youku.com/v_show/id')) {
            let result = link.match(/id_[A-Za-z0-9=]+./)
            if(result) {
                let vid = result[0].slice(3, -1)
                return {
                    vid: vid
                }
            }
        }
    }

    getEmbedTag(link) {
        let args = this.parseArgsFromLink(link)
        if(args) {
            let tpl = `<iframe
                height=${this.height}
                width=${this.width}
                src='http://player.youku.com/embed/${args.vid}'
                frameborder=0
                'allowfullscreen'></iframe>`
            return tpl
        }
        return ''
    }
}
