import React, { Key, useContext, useEffect, useState } from "react";
import TemplateCard from "../components/TemplateCard";
import { FirebaseContext } from "../firebase";
import { DataContext } from "../DataProvider";
import { Category, Template } from "../types/types";
import { useHistory } from "react-router-dom";
import { usePersistedState } from "../utils/util";

const TemplateList = () => {
  const history = useHistory();
  const { Categories, StaticTemplates } = useContext(DataContext);
  
  const categories: Array<Category> = Categories.categories;
  const templates: Array<Template> = StaticTemplates.templates;
  const [activeCategory, setActiveCategory] = usePersistedState('Template:posCategory', 1);
  const [scrollPosY, setScrollPosY] = usePersistedState('Template:scrollPosY', 0);
  const [scrollPosX, setScrollPosX] = usePersistedState('Template:scrollPosX', 0);

  const filteredTemplate = templates.filter(
    (msg: Template) => msg.category === activeCategory
  );

  useEffect(()=>{
    document.getElementById("scroll-area")?.scroll(0, scrollPosY || 0)
    document.getElementById("scroll-area2")?.scroll(scrollPosX || 0, 0)
  }, [])

  const handleCardClick= (event:any, id: any) => {
    history.push(`/main/compose/${id}`);
  }

  return (
    <React.Fragment>
      <div className="flex flex-col w-screen overflow-y-hidden h-full">
        <div className="flex-none flex px-3 mt-1 w-screen overflow-x-auto" id="scroll-area2" onScroll={(e)=>setScrollPosX(e?.target?.scrollLeft)}>
          {categories.map((item: Category, index: Key) => {
            return (
              <button
                className={`tab tab-lg tab-boxed ${
                  activeCategory == item.id ? "tab-active" : ""
                }`}
                key={item.id as Key}
                onClick={() => setActiveCategory(item.id)}
              >
                {item.text}
              </button>
            );
          })}
        </div>
        <div className="flex-grow p-3 w-full overflow-y-auto bg-base-100" id="scroll-area" onScroll={(e)=>setScrollPosY(e?.target?.scrollTop)}>
          {filteredTemplate.length ? (
            filteredTemplate.map((tpl: Template, index: Key) => (
              <TemplateCard 
                key={tpl.id}
                data={tpl}
                onCardClick={handleCardClick}
              />
            ))
          ) : (
            <div className="flex h-3/4">
              <p className="text-center m-auto">
                <span className="font-bold">Templates is empty.</span>
              </p>
            </div>
          )}
        </div>
      </div>

    </React.Fragment>
  );
};

export default TemplateList;
