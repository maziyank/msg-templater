import React, { Key, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TemplateCard from "../components/TemplateCard";
import { FirebaseContext } from "../firebase";
import { Template } from "../types/types";
import { usePersistedState } from "../utils/util";
import { ReactComponent as PlusIcon } from "./../assets/icon/plus.svg";

const PersonalTemplate = () => {
  const { user, customTemplates } = useContext(FirebaseContext);
  const history = useHistory();
  const [scrollPosY, setScrollPosY] = usePersistedState('personalTemplate:scrollPosY', 0);

  useEffect(()=>{
    document.getElementById("scroll-area")?.scroll(0, scrollPosY || 0)
  }, [])

  const handleCardClick= (event:any, id: any) => {
    history.push(`/main/compose/${id}`);
  }

  const handleCardLongPress = (event:any, id: any) => {
    history.push(`/main/editor/${id}`);
  }

  return (
    <React.Fragment>
      <div className="w-full">
        <div id="scroll-area" className="px-3 pt-3 pb-40 w-full h-screen overflow-y-auto bg-base-100 space-y-4" onScroll={(e: React.UIEvent<HTMLDivElement>)=>setScrollPosY((e.target as HTMLDivElement).scrollTop)}>
          {customTemplates && customTemplates.length==0 ? <div className="w-full h-full"><span className="block mt-40 text-center">Loading Data....</span></div>
          : customTemplates && customTemplates.map((tpl: Template, index: Key) => (
            <TemplateCard
              data={tpl}
              key={index}
              onLongPress={handleCardLongPress}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      {user && (
        <Link to={`/main/editor/`}>
          <button aria-label="add" className="fixed ring-1 ring-opacity-80 ring-purple-500 right-3 bottom-20 z-20 btn btn-circle btn-md bg-primary shadow-2xl transition ease-in duration-200">
            <PlusIcon />
          </button>
        </Link>
      )}
    </React.Fragment>
  );
};

export default PersonalTemplate;
