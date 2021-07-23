import React, { useEffect } from "react";
import { TemplateParam } from "../types/types";

export const elipsis = (text: string, n: number = 175) => {
   if (text.length > n) {
      return text.substring(0, n) + '...';
   }
   return text;
};

export const extractParams = (text: string): Array<TemplateParam> => {
   text = text.replace('}', '}.');
   return text.split('.').map((s: string) => {
      return parseParam(s)
   }).filter((s: TemplateParam) => s.type != "invalid");
}

export const parseParam = (text: string): TemplateParam => {
   let found;

   if (found = text.match(/\{(.*):(.*)\}/i)) {
      return {
         type: "select",
         capture: found[0],
         name: found[1],
         options: found[2].split('|')
      }
   }

   if (found = text.match(/\{(.*)\}/i)) {
      return {
         type: "text",
         capture: found[0],
         name: found[1]
      }
   }

   return { type: "invalid", capture: "invalid" }


}

export const toTitleCase = (text: string): string => {
   return text.replace(
      /\w\S*/g,
      (text: string) => {
         return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
      }
   );
}


export const usePersistedState = (key: string, defaultValue: any) => {
   const [state, setState] = React.useState(
     () => JSON.parse(localStorage.getItem(key) as string) || defaultValue
   );
   useEffect(() => {
     localStorage.setItem(key, JSON.stringify(state));
   }, [key, state]);
   return [state, setState];
 }