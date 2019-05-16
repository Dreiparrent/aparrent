import React, { Component } from 'react';
import { IProps, Pages } from '../App';
import './Mobile.scss';
import { Design } from './Design';
import { Menus } from './Menus';
import { Home } from './Home';
import { Photography } from './Photography';
export class Mobile extends Component<IProps, IState> {

    public scrollRef: React.RefObject<HTMLDivElement>;
    public underRef: React.RefObject<HTMLDivElement>;
    private scrollTimer: any;
    private canScroll = true;
    private menusRef: React.RefObject<Menus>;
    private resetScroll = true;

    constructor(props: IProps) {
        super(props);
        const angle = this.getAngle();
        this.state = {
            rotationAngle: angle,
            scrollIndex: this.props.page
        }
        this.onResize = this.onResize.bind(this);
        this.scrollRef = React.createRef();
        this.underRef = React.createRef();
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.snapScroll = this.snapScroll.bind(this);
        this.menusRef = React.createRef();
    }
    componentWillMount() {
        this.onResize();
        window.addEventListener("resize", this.onResize);
    }
    componentDidMount() {
        this.scrollRef.current.addEventListener('scroll', this.onScroll, {passive: true});
        this.scrollRef.current.addEventListener('touchstart', this.onTouchStart, {passive: true});
        this.scrollRef.current.addEventListener('touchmove', () => clearTimeout(this.scrollTimer), {passive: true});
        this.scrollRef.current.addEventListener('touchcancel', () => this.canScroll = true);
        this.scrollRef.current.addEventListener('touchend', this.onTouchEnd);
        this.setScroll();
    }

    private setScroll() {
        const left = window.outerWidth < window.innerWidth ? window.innerWidth : window.outerWidth;
        if (this.resetScroll) {
            this.scrollRef.current.scrollLeft = this.state.scrollIndex * left + 1;
            this.scrollRef.current.scrollLeft = this.state.scrollIndex * left;
            this.resetScroll = false;
            setTimeout(() => {
                this.snapScroll(this.state.scrollIndex);
            }, 500);
        }
    }

    

    render() { // TODO: Add loader here so that the did mount will update properly
        return (
            <div id="mobile">
                <div id="underlay-scroller" ref={this.underRef}>
                    <div className="page" id="photography"
                        style={{ transform: `rotate(${this.state.rotationAngle}deg)` }}>
                        <div className="inner">
                            <Photography />
                            <h2>Photography</h2>
                        </div>
                    </div>
                    <div className="page" id="home" >
                        <div className="inner">
                            <Home snapScroll={this.snapScroll} />
                        </div>
                    </div>
                    <div className="page" id="design"
                        style={{ transform: `rotate(${-this.state.rotationAngle}deg)` }}>
                        <div className="inner">
                            <Design />
                            <h2>Design</h2>
                        </div>
                    </div>
                </div>
                <Menus page={this.state.scrollIndex} ref={this.menusRef}></Menus>
                <div id="overlay-scroller" ref={this.scrollRef} onClick={this.onClick.bind(this)}>
                    <div></div> {/* TODO: add clicks here */}
                </div>
            </div>
        )
    }

    private onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.currentTarget.style.display = 'none';
        const left = this.scrollRef.current.scrollLeft;
        const top = this.scrollRef.current.scrollTop;
        const elem = document.elementFromPoint(e.pageX - left, e.pageY - top) as HTMLDivElement;
        elem.click();
        e.currentTarget.style.display = 'block';
    }

    private onTouchStart() {
        if (this.menusRef.current && this.menusRef.current.wedgeRef) {
            this.menusRef.current.raiseWedge()
        }
        clearTimeout(this.scrollTimer);
        this.canScroll = false;
    }
    private onTouchEnd() {
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(() => {
            this.canScroll = true;
            this.snapScroll();
        }, 150);
    }

    private onScroll(e: Event) {
        this.canScroll = false;
        let width = window.outerWidth < window.innerWidth ? window.innerWidth : window.outerWidth            
        const rot = (e.srcElement.scrollLeft / width - 1) * this.state.rotationAngle;
        const rot2 = (e.srcElement.scrollLeft / width - 1) * 90; // TODO: add simplify rotation code
        this.underRef.current.style.transform = `rotate(${rot}deg)`;
        clearTimeout(this.scrollTimer);
        if (this.menusRef.current && this.menusRef.current.wedgeRef) {
            this.menusRef.current.wedgeRef.current.style.transform = `translateX(-50%) rotate(${rot2}deg)`;
        }
        this.scrollTimer = setTimeout(() => {
            this.canScroll = true;
            this.snapScroll();
        }, 150);
    }

    

    public snapScroll = (index?: Pages) => {
        clearTimeout(this.scrollTimer);
        if (this.canScroll || index !== undefined) {
            this.canScroll = true;
            let scrollLeft = index !== undefined ?
                index : 
                Math.round(this.scrollRef.current.scrollLeft / window.innerWidth);
            this.scrollRef.current.scrollTo({ left: scrollLeft * window.innerWidth, behavior: 'smooth' });
            this.setState({ scrollIndex: scrollLeft });
            this.props.route.history.push(`/${Pages[scrollLeft]}`);
            if (this.menusRef.current && this.menusRef.current.wedgeRef) {
                this.menusRef.current.resetWedge();
            }
        }
        this.menusRef.current.close();
    }


    private onResize() {
        if (this.props.isMobile()) {
            if (this.getAngle() !== this.state.rotationAngle)
                this.setState({ rotationAngle: this.getAngle() });
            if (!this.resetScroll) {
                this.resetScroll = true;
                this.setScroll();
            }
        } else clearTimeout(this.scrollTimer);
    }
    private getAngle() {
        const width = window.outerWidth < window.innerWidth ? window.innerWidth : window.outerWidth;
        const height = window.outerHeight < window.innerHeight ? window.innerHeight : window.outerHeight;
        const ratio = width / height;
        if (ratio < 0.6)
            return -30;
        else if (ratio < 1.5)
            return -45;
        else if (ratio < 1.8)
            return -65;
        else
            return -85;
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
        this.scrollRef.current.removeEventListener('scroll', this.onScroll);
        this.scrollRef.current.removeEventListener('touchstart', this.onTouchStart);
        this.scrollRef.current.removeEventListener('touchend', this.onTouchEnd);
    }
}
interface IState {
    rotationAngle: number;
    scrollIndex: number;
}