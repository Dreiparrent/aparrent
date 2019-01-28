import React, { Component } from "react";
import './Design.scss';
import { IdContent, DesignContent } from "../classes/design-content";

export class Design extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            content: DesignContent.Blank
        }
    }
    render() {
        return (
            <div id="design_outer">
                <div id="boxes">
                    <div id="row0" className="row">
                        <div id="box0" className="box" onClick={this.boxClick.bind(this, 2)}>
                            <img src="/assets/wmi-logo.png" />
                        </div>
                        <div id="box1" className="box" onClick={this.boxClick.bind(this, 1)}>
                            <img src="/assets/og-logo.png"/>
                        </div>
                        <div id="box2" className="box" onClick={this.boxClick.bind(this, 0)}>
                            <img src="/assets/og-logo.png" />
                        </div>
                    </div>
                    <div id="row1" className="row">
                        <div id="box3" className="box" onClick={this.boxClick.bind(this, 4)}>
                            <img src="/assets/ss-logo.png" />                            
                        </div>
                        <div id="box4" className="box" onClick={this.boxClick.bind(this, 3)}>
                            <img src="/assets/og-logo.png" />
                        </div>
                    </div>
                    <div id="row2" className="row">
                        <div id="box5" className="box" onClick={this.boxClick.bind(this, 5)}>
                            <img src="/assets/sour-logo.png" />
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
                    <h3>Link: {this.state.content.link}</h3>
                </div>
            </div>
        );
    }
    boxClick(index: number) {
        this.setState({
            content: DesignContent.getContent(index)
        });
    }
}
interface IProps {

}
interface IState {
    content: IdContent;
}