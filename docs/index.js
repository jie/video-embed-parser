import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VideoParser } from 'video-embed-parser'

const parser = new VideoParser({tagType:'iframe', width: 500, height: 400})

const wrapperStyle = {textAlign: 'center', margin: '15px auto'}

function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            videoCode: '',
            codeTag: '',
            showCode: 'none',
            tagType: 'iframe',
            width: 500,
            height: 400
        }
    }

    getParser() {
        return new VideoParser({tagType:this.state.tagType, width: this.state.width, height: this.state.height})
    }

    onChange =(e)=> {
        this.setState({link: e.target.value})
    }

    getEmbedTag =(e)=> {
        if(e) {
            e.preventDefault()
        }
        let parser = this.getParser()
        let code = parser.getEmbedTag(this.state.link)
        this.setState({videoCode: code})
        return code
    }

    getMarkup() {
        return {__html: this.state.videoCode}
    }

    getButton =()=> {
        if(this.state.videoCode) {
            return <div className="wrapper" style={wrapperStyle}>
                <button type="button" className="btn btn-info btn-xs" onClick={this.toggleCode}>show embed code</button>
            </div>
        }
    }

    toggleCode =()=> {
        if(this.state.showCode == 'none') {
            this.setState({showCode: 'block'})
        } else {
            this.setState({showCode: 'none'})
        }
    }

    componentDidMount() {
        let link = GetQueryString('link')
        let tagType = GetQueryString('tag')
        let width = GetQueryString('width')
        let height = GetQueryString('height')
        this.setState({
            width: width,
            height: height,
            tagType: tagType
        }, () => {
          setTimeout(() => {
              if(link) {
                  this.setState({link: link}, () => {
                    setTimeout(() => {
                      this.getEmbedTag()
                    }, 0)
                  })
              }
          }, 0)
        })
    }

    render() {
        return <div className="root container">
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6">
                  <div className="wrapper" style={wrapperStyle}>
                        <div className="input-group">
                          <input type="text" className="form-control" value={this.state.link} onChange={this.onChange} placeholder="Enter Video URL" />
                            <span className="input-group-btn">
                                <button className="btn btn-info" type="button" onClick={this.getEmbedTag}>Submit</button>
                            </span>
                        </div>
                    </div>
                    <div className="wrapper"  style={wrapperStyle}>
                        <div className="video" dangerouslySetInnerHTML={this.getMarkup()}></div>
                    </div>
                    {this.getButton()}
                    <div className="wrapper" style={{margin: '10px auto', display: this.state.showCode}}>
                        <pre><code className="html">{this.state.videoCode}</code></pre>
                    </div>
              </div>
              <div className="col-lg-3"></div>
            </div>
        </div>
    }
}

ReactDOM.render(<MainApp />, document.getElementById('target'));
