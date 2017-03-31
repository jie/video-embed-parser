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

    getEmbedTag(tagType, link) {
        let args = this.parseArgsFromLink(link)
        let tpl = ''
        if(args) {
            switch(tagType) {
                case 'iframe':
                    tpl = `<iframe
                       height=${this.height}
                       width=${this.width}
                       src='http://player.youku.com/embed/${args.vid}'
                       frameborder=0
                       'allowfullscreen'></iframe>`
                    break
                case 'embed':
                    tpl = `<embed
                        src='http://player.youku.com/player.php/sid/${args.vid}/v.swf'
                        allowFullScreen='true'
                        quality='high'
                        width='${this.width}'
                        height='${this.height}'
                        align='middle' allowScriptAccess='always'
                        type='application/x-shockwave-flash'>
                    </embed>`
                    break
                case 'flash':
                    tpl = `http://player.youku.com/player.php/sid/${args.vid}/v.swf`
                default:
                    console.warn(`unsupported tagtype: ${tagType}`)
            }
        }
        return tpl
    }
}
