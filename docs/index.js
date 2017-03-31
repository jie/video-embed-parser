import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VideoParser } from '../src'

const parser = new VideoParser({width: 500, height: 400})

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            videoCode: '',
            codeTag: '',
            showCode: 'none'
        }
    }

    onChange =(e)=> {
        this.setState({link: e.target.value})
    }

    getEmbedTag =(e)=> {
        e.preventDefault()
        let code = parser.getEmbedTag( this.state.link)
        this.setState({videoCode: code})
        console.log(code)
        return code
    }

    getMarkup() {
        return {__html: this.state.videoCode}
    }

    getButton =()=> {
        if(this.state.videoCode) {
            return <div className="row" style={{marginTop: '10', textAlign: 'center'}}>
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
    render() {
        return <div className="container">
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6">
                  <div className="input-group">
                    <input type="text" className="form-control" value={this.state.link} onChange={this.onChange} placeholder="Enter Video URL" />
                    <span className="input-group-btn">
                      <button className="btn btn-info" type="button" onClick={this.getEmbedTag}>Submit</button>
                    </span>
                  </div>
              </div>
              <div className="col-lg-3"></div>
            </div>

            <div className="row" style={{marginTop: '30'}}>
                <div className="col-lg-3"></div>
                <div className="col-lg-6" style={{textAlign: 'center'}}>
                  <div className="video" dangerouslySetInnerHTML={this.getMarkup()}></div>
                </div>
                <div className="col-lg-3"></div>
            </div>
            {this.getButton()}
            <div className="row" style={{marginTop: '10', display: this.state.showCode}}>
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <pre><code className="html">{this.state.videoCode}</code></pre>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    }
}

ReactDOM.render(<MainApp />, document.getElementById('target'));
