import React from 'react';
import Categories from './static/categories.json';
import StaticTemplates from './static/templates.json';
import { Template } from './types/types';

const DataContext: React.Context<any> = React.createContext({});
const DataProvider: React.Provider<any> = DataContext.Provider;

export { StaticTemplates, Categories, DataContext, DataProvider }