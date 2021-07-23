import { Key } from "react";

export interface BottomNavMenu {
    text: string;
    to: string;
    icon: any;
}

export interface Category {
    id: number;
    text: string;
  }

export  interface Template {
    id: any;
    title: string;
    content: string;
    category?: number;
    tags?: Array<string>;
    lang?: string;
    keyField?: string;
    custom: boolean;
  }

  export  interface TemplateParam {
    type: string;
    name?: string;
    capture: string;
    options?: Array<string>;
  }
  
  export interface anyObject { [k: string]: any }