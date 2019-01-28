import React, { Component } from "react";
import './Menus.scss';

export class Menus extends Component<IProps, IState> {
    public wedgeClip: React.RefObject<HTMLDivElement>;
    public wedgeRef: React.RefObject<HTMLDivElement>;

    private fansMenu: React.RefObject<HTMLDivElement>;
    private navMenu: React.RefObject<HTMLDivElement>;
    private subMenu: React.RefObject<HTMLDivElement>;
    private navMenuInner: React.RefObject<HTMLDivElement>;
    private fansComingSoon: React.RefObject<HTMLDivElement>;
    constructor(props: IProps) {
        super(props);
        this.state = {
            navActive: false,
            navSubDesignActive: true,
            fansActive: false
        } 
        this.wedgeRef = React.createRef();
        this.wedgeClip = React.createRef();
        this.fansMenu = React.createRef();
        this.subMenu = React.createRef();
        this.navMenu = React.createRef();
        this.navMenuInner = React.createRef();
        this.fansComingSoon = React.createRef();
        this.wedgeClick = this.wedgeClick.bind(this);
        this.getSubMenu = this.getSubMenu.bind(this);
    }
    getSubMenu(props: {active: boolean}) {
        if (this.state.navSubDesignActive) {
            return (
                <div>
                    <h3>Kahani</h3>
                    <h3>Open Garage</h3>
                    <h3>WMi</h3>
                    <h3>Dance Database</h3>
                </div>
                
            )
        } else {
            return (
                <div>
                    <h3>All Photos</h3>
                    <h3>Client Photos</h3>
                    <h3>Portfolio</h3>
                </div>
            )
        }
    }
    render() {
        return (
            <div id="menu_outer">
                <div className="menu" id="menu_fans" ref={this.fansMenu} onClick={this.fansClick.bind(this)}>
                    <p ref={this.fansComingSoon}>coming soon</p>
                </div>
                <div id="menu_nav_sub" ref={this.subMenu}>
                    <div id="menu_nav_sub_inner">
                        <h2 onClick={this.navClick.bind(this)}>x</h2>
                        <this.getSubMenu active={this.state.navSubDesignActive}></this.getSubMenu>
                    </div>
                </div>
                <div className="menu" id="menu_nav" onClick={this.navClick.bind(this)} ref={this.navMenu}>
                    <div id="menu_nav_inner" ref={this.navMenuInner}>
                        <h2 onClick={this.designClick.bind(this)} style={{
                            textShadow: this.state.navSubDesignActive ? '2px 2px grey' : 'none'
                        }}>Design</h2>
                        <h2 onClick={this.photoClick.bind(this)}
                            style={{
                                textShadow: this.state.navSubDesignActive ? 'none' : '2px 2px grey'
                        }}>Photography</h2>
                    </div>
                </div>
                <div className="menu" id="menu_scroll">
                    <div id="wedge_clip" ref={this.wedgeClip}>
                        <div id="wedge_rotate" ref={this.wedgeRef}>
                            <div className="wedge" id="wedgep" onClick={this.wedgeClick}></div>
                            <div className="wedge" id="wedgeh" onClick={this.wedgeClick}></div>
                            <div className="wedge" id="wedged" onClick={this.wedgeClick}></div>
                        </div>
                    </div>
                </div>
                <div className="menu" id="menu_home">
                    
                </div>
            </div>
        )
    }
    private fansClick() {
        if (this.state.fansActive) {
            this.fansMenu.current.style.width = '200px';
            this.fansMenu.current.style.height = '200px';
            this.fansComingSoon.current.style.opacity = '0';
        } else {
            this.fansMenu.current.style.width = '450px';
            this.fansMenu.current.style.height = '450px';
            this.fansComingSoon.current.style.opacity = '1';
        }
        this.setState({fansActive: !this.state.fansActive})
    }
    private navClick(e?: React.MouseEvent<HTMLDivElement, MouseEvent>, reset = false) {
        console.log('open');
        if (!e || this.state.navSubDesignActive && e.currentTarget.tagName !== 'DIV') {
            this.subMenu.current.style.left = '-400px';
            this.navMenu.current.style.borderTop = '50px solid transparent';
            this.navMenu.current.style.borderLeft = '100px solid #00FFFF';
            this.navMenu.current.style.borderBottom = '50px solid transparent';
            this.navMenu.current.style.left = '0';
            this.navMenu.current.style.boxShadow = 'none';
            this.navMenuInner.current.style.opacity = '0';
            setTimeout(() => {
                this.setState({navActive: false})
            }, 500);
        } else {
            this.subMenu.current.style.left = '40px';
            this.navMenu.current.style.borderTop = '100px solid transparent';
            this.navMenu.current.style.borderLeft = '200px solid #00FFFF';
            this.navMenu.current.style.borderBottom = '100px solid transparent';
            this.navMenu.current.style.left = '20px';
            this.navMenuInner.current.style.opacity = '1';
            // this.navMenu.current.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);';
            this.setState({ navActive: true });
        }
    }
    private designClick() {
        this.setState({ navSubDesignActive: true });
        // this.subDesignAcive = true;
        console.log('design');
    }
    private photoClick() {
        this.setState({ navSubDesignActive: false });
        // this.subDesignAcive = false;
        console.log('photo');
    }
    private wedgeClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>, reset = false) {
        // e.currentTarget.style.borderTop = '500px solid #146BCC';
        // e.currentTarget.style.borderRight = '300px solid transparent';
        // e.currentTarget.style.borderLeft = '300px solid transparent';
        // e.currentTarget.style.marginBottom = '470px';
        // this.wedge2.current.style.clipPath = 'polygon(0 0, 100% 200%, 200% 0);'
        console.log();
    }
    public reset() {
        console.log('reset');
    }
    close() {
        if (this.state.fansActive)
            this.fansClick();
        if (this.state.navActive)
            this.navClick()
    }
}
interface IProps {

}
interface IState {
    navActive: boolean;
    navSubDesignActive: boolean;
    fansActive: boolean;
}