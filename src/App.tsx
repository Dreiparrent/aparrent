import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, RouteProps, match } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
const Canvas = React.lazy(() => import('./components/Canvas'));
import { Mobile } from './components/Mobile'; // Left as non-lazy for speed (the pages are lazy)
import { RouteChildrenProps, withRouter, RouteComponentProps, Redirect } from 'react-router';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class App extends Component<{}, { isMobile: boolean }> {
    // componentRef: React.RefObject<...others: any, onResize: any>;//

    constructor(props: any) {
        super(props);
        this.state = {
            isMobile: window.innerWidth < 800
        }
        this.getPage = this.getPage.bind(this);
        this.getMobile = this.getMobile.bind(this);
        this.isMobile = this.isMobile.bind(this);
        // this.componentRef = React.createRef();
        // this.checkMobile = this.checkMobile.bind(this);
        // TODO: within render error on set state;
    }

    public isMobile = () => {
        const _isMobile = window.innerWidth < 800;
        if (this.state.isMobile !== _isMobile)
            this.setState({ isMobile: _isMobile });
        return _isMobile;
    }

    private getMobile(props: { route: RouteComponentProps }) {
        const pathname = props.route.location.pathname;
        console.log(this.getRedirect(pathname));
        if (!this.getRedirect(pathname)) {
            if (this.state.isMobile) {
                if (!pathname.startsWith('/mobile')) {
                    let subDir = '';
                    if (pathname.length > 2)
                        subDir = pathname.split('/')[1];
                    props.route.history.push(`/mobile/${subDir}`);
                }
                return <Mobile
                    page={this.getPage(pathname)}
                    route={props.route}
                    isMobile={this.isMobile} />
            } else {
                if (pathname.startsWith('/mobile')) {
                    let subDir = '';
                    if (pathname.length > 8) {
                        subDir = pathname.split('/')[2];
                    }
                    props.route.history.push(`/${subDir}`);
                }
                return < Canvas
                    page={this.getPage(pathname)} route={props.route} isMobile={this.isMobile} />
            }
        } else return this.getRedirect(pathname) as any;
    }

    getRedirect(pathname: string) {
        const pathMatch = pathname.match(/(mobile\/?)?(resume)|(linked)|(git)|(opengarage)|(savvy-savings)|(wmi)|(kahani)/);
        switch (pathMatch ? pathMatch[0] : 0) {
            case Pages[3]:
                window.location = 'https://www.aparrent.com/resume/Andrei%20Parrent%20-%20Resume.pdf' as any;
                return true;
            case Pages[4]:
                window.location = 'https://www.linkedin.com/in/dreiparrent/' as any;
                return true;
            case Pages[5]:
                window.location = 'https://github.com/Dreiparrent/' as any;
                return true;
            case Pages[6]:
            case Pages[7]:
            case Pages[8]:
            case Pages[9]:
                this.subdirRedir(Pages[pathMatch[0] as any]);
                return true;
            default:
                return false;
        }
    }
    subdirRedir(page: any) {
        window.location = 'https://' + Pages[page] + '.aparrent.com' as any;
    }

    getPage(pathname: string) {
        const pathMatch = pathname.match(/(mobile\/?)?(design)|(photography)/);
        switch (pathMatch ? pathMatch[0] : 0) {
            case Pages[0]:
                return Pages.photography;
            case Pages[2]:
                return Pages.design;
            default:
                return Pages.home
        }
    }

    render() {
        return (
            <Router>
                    {/* TODO: Add Loading
                        Also ridirect?
                    */}
                    
                    <Route children={({ ...routeProps }: RouteChildrenProps<any, RouteProps>) => (
                        <Suspense fallback={<div>loading...</div>}>
                            <this.getMobile route={routeProps} />
                        <p className="fontText" >this is present for the font to load</p>
                        </Suspense>
                    )}/>

            </Router>
        );
    }
}

export default App;
// export default withRouter(App);
export enum Pages { 'photography', 'home', 'design', 'resume', 'linked', 'git', 'opengarage', 'savvy-savings', 'wmi', 'kahani' };
export interface IProps {
    page: Pages,
    route: RouteComponentProps,
    isMobile: () => boolean;
}