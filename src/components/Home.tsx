import React, { Component } from "react";
import './Home.scss';

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
                
                <h4 className="text_bottom" id="text_photo">Photography</h4>
                <h4 className="text_bottom" id="text_design">Design</h4>
            </div>
        );
    }

}
interface IProps {

}
interface IState {

}