import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './example.css'
import { VideoParser } from '../src'

const parser = new VideoParser({width: 500, height: 400})

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            videoCode: ''
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

    render() {
        return <div className="container">
            <div className="controls">
                <input type="text" value={this.state.link} onChange={this.onChange}/>
                <button type="button" onClick={this.getEmbedTag}>获取嵌入视频代码</button>
            </div>
            <div className="wrapper">
                <div className="video" dangerouslySetInnerHTML={this.getMarkup()}></div>
                <div className="code"></div>
            </div>
        </div>
    }
}

ReactDOM.render(<MainApp />, document.getElementById('target'));
