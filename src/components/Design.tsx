import React, { Component } from "react";
import './Design.scss';
import { IdContent, designContents, DContents } from "../classes/design-content";

export class Design extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            content: designContents[DContents.Blank],
            currentBox: null
        }
    }
    render() {
        return (
            <div id="design_outer">
                <div id="boxes">
                    <div id="row0" className="row">
                        <div id="box2" className="box" onClick={this.boxClick.bind(this, 2)}>
                            <img src="/assets/wmi-logo.png" />
                            <div></div>
                        </div>
                        <div id="box1" className="box" onClick={this.boxClick.bind(this, 1)}>
                            <img src="/assets/og-logo.png" />
                            <div></div>                            
                        </div>
                        <div id="box0" className="box" onClick={this.boxClick.bind(this, 0)}>
                            <img src="/assets/og-logo.png" />
                            <div></div>
                        </div>
                    </div>
                    <div id="row1" className="row">
                        <div id="box4" className="box" onClick={this.boxClick.bind(this, 4)}>
                            <img src="/assets/ss-logo.png" />
                            <div></div>                            
                        </div>
                        <div id="box3" className="box" onClick={this.boxClick.bind(this, 3)}>
                            <img src="/assets/og-logo.png" />
                            <div></div>
                        </div>
                    </div>
                    <div id="row2" className="row">
                        <div id="box5" className="box" onClick={this.boxClick.bind(this, 5)}>
                            <img src="/assets/sour-logo.png" />
                            <div></div>
                        </div>
                        <div id="content_header">
                            <h2>{this.state.content.name}</h2>
                        </div>
                    </div>
                </div>
                <div id="design_content">
                    <h3>{this.state.content.sub}</h3>
                    {/* <h4>Project Type:</h4> */}
                    <h4>Code Base: {this.state.content.code}</h4>
                    <h4>Completion: {this.state.content.completion}</h4>
                    <h3>Link: <a href={this.state.content.link}>{this.state.content.linkName}</a>
                    </h3>
                </div>
            </div>
        );
    }
    boxClick(index: number) {
        if (this.state.currentBox)
            this.state.currentBox.style.opacity = '0';
        const currentBox = document.getElementById(`box${index}`).getElementsByTagName('div')[0];
        currentBox.style.opacity = '0.4';     
        this.setState({
            content: designContents[index],
            currentBox: currentBox
        });
    }
}
interface IProps {
    
}
interface IState {
    content: IdContent;
    currentBox: HTMLDivElement;
}