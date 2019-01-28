import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, RouteProps, match } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
const Canvas = React.lazy(() => import('./components/Canvas'));
import { Mobile } from './components/Mobile'; // Left as non-lazy for speed (the pages are lazy)
import { RouteChildrenProps, withRouter, RouteComponentProps } from 'react-router';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class App extends Component<{}, { isMobile: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            isMobile: window.innerWidth < 800
        }
        this.getPage = this.getPage.bind(this);
        this.getMobile = this.getMobile.bind(this);
        // this.checkMobile = this.checkMobile.bind(this);
        // TODO: within render error on set state;
    }

    public checkMobile = () => {
        if (this.state.isMobile !== window.innerWidth < 800)
            this.setState({ isMobile: window.innerWidth < 800 });
    }

    private getMobile(props: { route: RouteComponentProps }) {
        if (this.state.isMobile) {
            if (!props.route.location.pathname.startsWith('/mobile')) {
                let subDir = '';
                if (props.route.location.pathname.length > 2)
                    subDir = props.route.location.pathname.split('/')[1];
                props.route.history.push(`/mobile/${subDir}`);
            }
            return <Mobile page={this.getPage(props.route.location.pathname)} route={props.route} checkMobile={this.checkMobile} />
        } else {
            if (props.route.location.pathname.startsWith('/mobile')) {
                let subDir = '';
                if (props.route.location.pathname.length > 8) {
                    subDir = props.route.location.pathname.split('/')[2];
                }
                props.route.history.push(`/${subDir}`);
            }
            return < Canvas page={this.getPage(props.route.location.pathname)} route={props.route} checkMobile={this.checkMobile}/>
        }
    }

    getPage(pathname: string) {
        const pathMatch = pathname.match(/(design)|(photography)/);
        switch (pathMatch ? pathMatch[0] : 0) {
            case Pages[-1]:
                return Pages.photography
            case Pages[1]:
                return Pages.design
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
                        <p>this is present for the font to load</p>
                        </Suspense>
                    )}/>

            </Router>
        );
    }
}

export default App;
// export default withRouter(App);
export enum Pages { 'home', 'design', 'photography' = -1 };
export interface IProps {
    page: Pages,
    route: RouteComponentProps,
    checkMobile: () => void;
}