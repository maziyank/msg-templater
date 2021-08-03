import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PersonalTemplate from "./PersonalTemplate";
import Account from "./Account";
import TemplateList from "./TemplateList";
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';
import Composer from './Composer';
import { DataContext, Categories, StaticTemplates } from '../DataProvider';
import Editor from './Editor';

const Main = () => {
    let { path } = useRouteMatch();

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-none">
                <Header title={"Message Templater"} />
            </div>
            <div className="flex-grow overflow-auto bg-base-200">
                <DataContext.Provider value={{ Categories, StaticTemplates }}>
                    <Switch>
                        <Route exact path={path}>
                            <Account />
                        </Route>
                        <Route path={`${path}/template`}>
                            <TemplateList />
                        </Route>
                        <Route path={`${path}/account`}>
                            <Account />
                        </Route>
                        <Route path={`${path}/editor/:templateId`}>
                            <Editor />
                        </Route>               
                        <Route path={`${path}/editor`}>
                            <Editor />
                        </Route>                                                          
                        <Route path={`${path}/history`}>
                            <PersonalTemplate />
                        </Route>
                        <Route path={`${path}/compose/:templateId`}>
                            <Composer />
                        </Route>
                        <Route>
                            <TemplateList />
                        </Route>
                    </Switch>
                </DataContext.Provider>
            </div>
            <div className="flex-none">
                <BottomNav path={`${path}`} />
            </div>

        </div>
    );
};

export default Main
