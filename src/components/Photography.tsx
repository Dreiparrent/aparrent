import React, { Component } from "react";
import './Photography.scss';

export class Photography extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return (
            <div id="photography_outer">
                <div id="photography_inner">
                    <div className="box_photo" onClick={this.onClick}>
                        <div className="section_photo_head"></div>
                        <div className="section_photo_body">
                            <h3>Albums</h3>
                        </div>
                        <div className="section_photo_foot"></div>
                    </div>
                    <div className="box_photo" onClick={this.onClick}>
                        <div className="section_photo_head"></div>
                        <div className="section_photo_body">
                            <h3>Client Portal</h3>                            
                        </div>
                        <div className="section_photo_foot"></div>                        
                    </div>
                    <div className="box_photo" onClick={this.onClick}>
                        <div className="section_photo_head"></div>
                        <div className="section_photo_body">
                            <h3>Portfolio</h3>
                        </div>
                        <div className="section_photo_foot"></div>
                    </div>
                </div>
            </div>
        )
    }

    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const text = e.currentTarget.getElementsByTagName('h3')[0];
        const currentText = text.innerHTML;
        if (currentText !== 'coming soon') {   
            text.innerHTML = 'coming soon';
            setTimeout(() => {
                text.innerHTML = currentText;
            }, 1000);
        }
    }

}
interface IProps {

}
interface IState {

}