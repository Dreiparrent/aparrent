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
    // public scrollIndex: number;
    private scrollTimer: any;
    private canScroll = true;
    private menusRef: React.RefObject<Menus>;

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
        // this.scrollIndex = this.props.page;
        this.onScroll = this.onScroll.bind(this);
        this.snapScroll = this.snapScroll.bind(this);
        this.menusRef = React.createRef();
    }
    componentWillMount() {
        this.onResize();
        window.addEventListener("resize", this.onResize);
    }
    componentDidMount() {
        this.scrollRef.current.addEventListener('scroll', this.onScroll);
        this.scrollRef.current.addEventListener('touchstart', () => {
            if (this.menusRef.current && this.menusRef.current.wedgeRef) {
                this.menusRef.current.raiseWedge()
            }
            clearTimeout(this.scrollTimer);
            this.canScroll = false;
        });
        this.scrollRef.current.addEventListener('touchmove', () => {
            console.log('move');
            clearTimeout(this.scrollTimer);
        });
        this.scrollRef.current.addEventListener('touchcancel', () => this.canScroll = true);
        this.scrollRef.current.addEventListener('touchend', () => {
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(() => {
                this.canScroll = true;
                this.snapScroll();
            }, 150);
        });
        if (this.scrollRef.current.scrollLeft === 0) {
            this.setScroll();
        }
    }

    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.currentTarget.style.display = 'none';
        const left = this.scrollRef.current.scrollLeft;
        const top = this.scrollRef.current.scrollTop;
        // this.scrollRef.current.click
        const elem = document.elementFromPoint(e.pageX - left, e.pageY - top) as HTMLDivElement;
        elem.click();
        e.currentTarget.style.display = 'block';
        // $(document.elementFromPoint(e.pageX - left, e.pageY - top)).click();
    }

    render() { // Add loader here so that the did mount will update properly
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

    setScroll() {
        // console.log('set scroll', this.scrollIndex);
        // if (window.innerWidth > window.innerHeight) // TODO: use more in depth setter
            // TODO: need refs here
        // this.scrollRef.current.style.marginLeft = '0';
        // this.scrollRef.current.scrollLeft = 0;
        // console.log('0', window.outerWidth);
        const left = window.outerWidth;
        // setTimeout(() => {
            switch (this.state.scrollIndex) {
                case Pages.photography:
                    this.scrollRef.current.scrollLeft = 0;
                    break;
                case Pages.design:
                    this.scrollRef.current.scrollLeft = 2.00 * window.outerWidth;
                    break;
                default:
                    // while (this.scrollRef.current.scrollLeft !== left) {
                        // this.scrollRef.current.scrollLeft = left;
                    // }
                    this.scrollRef.current.scrollLeft = window.outerWidth;
                    console.log(this.scrollRef.current.scrollLeft);
                    break;
            }
        // }, 500);
    }

    onScroll(e: Event) {
        // console.log('1', window.outerWidth);
        // console.log(this.scrollRef.current.scrollLeft / window.outerWidth);
        this.canScroll = false;
        const rot = (e.srcElement.scrollLeft / window.outerWidth - 1) * this.state.rotationAngle;
        const rot2 = (e.srcElement.scrollLeft / window.outerWidth - 1) * 90; // TODO: add simplify rotation code
        this.underRef.current.style.transform = `rotate(${rot}deg)`;
        // this.canScroll = false;
        clearTimeout(this.scrollTimer);
        if (this.menusRef.current && this.menusRef.current.wedgeRef) {
            this.menusRef.current.wedgeRef.current.style.transform = `translateX(-50%) rotate(${rot2}deg)`;
        }
        this.scrollTimer = setTimeout(() => {
            this.canScroll = true;
            this.snapScroll();
        }, 150);
    }

    

    snapScroll = (index?: Pages) => {
        clearTimeout(this.scrollTimer);
        if (this.canScroll || index !== null) {
            let scrollLeft = this.scrollRef.current.scrollLeft;
            if (index === Pages.design)
                scrollLeft = window.innerWidth * 2;
            else if (index === Pages.photography)
                scrollLeft = 0;
            if (scrollLeft > window.innerWidth * 1.5) {
                this.scrollRef.current.scrollTo({ left: window.innerWidth * 2, behavior: 'smooth' });
                this.setState({ scrollIndex: Pages.design });
                this.props.route.history.push('/design');
            }
            // this.scrollRef.current.scrollLeft = window.innerWidth * 2;
            else if (scrollLeft > window.innerWidth * 0.5) {
                this.scrollRef.current.scrollTo({ left: window.innerWidth, behavior: 'smooth' });
                this.setState({ scrollIndex: Pages.home });
                this.props.route.history.push('/home');
            }
            // this.scrollRef.current.scrollLeft = window.innerWidth;
            else {
                this.scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                this.setState({ scrollIndex: Pages.photography });
                this.props.route.history.push('/photography');
            }
            // this.scrollRef.current.scrollLeft = 0;
            if (this.menusRef.current && this.menusRef.current.wedgeRef) {
                this.menusRef.current.resetWedge();
            }
        }
        this.menusRef.current.close();
    }


    onResize() {
        if (this.getAngle() !== this.state.rotationAngle)
            this.setState({ rotationAngle: this.getAngle() });
        /*
        switch () {
            case value:
                
                break;
        
            default:
                break;
        }
        */
        // console.log('2', window.outerWidth);
        // this.setScroll();
        this.props.checkMobile();
    }
    getAngle() {
        const ratio = window.outerWidth / window.outerHeight;
        console.log('r', ratio);
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
    }
}
interface IState {
    rotationAngle: number;
    scrollIndex: number;
}