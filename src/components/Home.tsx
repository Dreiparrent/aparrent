import React, { Component } from "react";
import './Home.scss';
import { Pages } from "../App";

export class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return (
            <div id="home_outer">
                <div id="forfans">
                    <div id="arrow_fans">
                        <div className="curvedarrow"></div>
                    </div>
                    <h4>for my fans</h4>
                </div>
                <div id="myname">
                    <h3>my name</h3>
                    <div className="curvedarrow"></div>
                </div>
                <h1>Andrei Parrent</h1>
                <h4 className="text_bottom" id="text_scroll">Scroll for..</h4>
                <div className="text_bottom curvedarrow" id="text_scroll_arrow1" onClick={this.callScroll.bind(this, -1)}></div>
                <div className="text_bottom curvedarrow" id="text_scroll_arrow2" onClick={this.callScroll.bind(this, 1)}></div>
                <h4 className="text_bottom" id="text_photo" onClick={this.callScroll.bind(this, -1)}>Photography</h4>
                <h4 className="text_bottom" id="text_design" onClick={this.callScroll.bind(this, 1)}>Design</h4>
            </div>
        );
    }

    callScroll(index: number) {
        console.log('callScroll');
        setTimeout(() => {
            this.props.snapScroll(index);
        }, 250);
    }

}
interface IProps {
    snapScroll: (index: Pages) => void;
}
interface IState {

}