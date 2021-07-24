import React, { Key, useContext, useEffect, useState } from "react";
import TemplateCard from "../components/TemplateCard";
import { DataContext } from "../DataProvider";
import { Category, Template } from "../types/types";
import { useHistory } from "react-router-dom";
import { usePersistedState } from "../utils/util";
import FilterTemplate from "../components/FilterTemplate";
import { ReactComponent as FilterIcon } from "./../assets/icon/filter.svg";

const TemplateList = () => {
  const history = useHistory();
  const { Categories, StaticTemplates } = useContext(DataContext);

  const categories: Array<Category> = Categories.categories;
  const templates: Array<Template> = StaticTemplates.templates;
  const [activeCategory, setActiveCategory] = usePersistedState('Template:posCategory', 1);
  const [scrollPosY, setScrollPosY] = usePersistedState('Template:scrollPosY', 0);
  const [scrollPosX, setScrollPosX] = usePersistedState('Template:scrollPosX', 0);

  // Filter Data
  const [filterOpen, setFilterOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [lang, setLang] = useState('');


  useEffect(() => {
    document.getElementById("scroll-area")?.scroll(0, scrollPosY || 0);
    document.getElementById("scroll-area2")?.scroll(scrollPosX || 0, 0);
  }, [])

  const filteredTemplate = templates.filter((tpl: Template) => tpl.category === activeCategory)
    .filter((tpl: Template) => (lang?.length > 0 ? lang == tpl.lang : true))
    .filter((tpl: Template) => (keyword?.length > 0 ? tpl.content.indexOf(keyword) > 0 : true));

  const handleCardClick = (event: any, id: any) => {
    history.push(`/main/compose/${id}`);
  }

  return (
    <React.Fragment>
      <div className="flex flex-col w-full overflow-y-hidden h-full">
        <div className="flex-none flex px-3 mt-1 w-full overflow-x-auto md:overflow-x-hidden" id="scroll-area2" onScroll={(e: React.UIEvent<HTMLDivElement>) => setScrollPosX((e.target as HTMLDivElement)?.scrollLeft)}>
          {categories.map((item: Category, index: Key) => {
            return (
              <button
                aria-label={`cat-${item.id}`}
                className={`tab tab-lg tab-lifted ${activeCategory == item.id ? "tab-active" : ""
                  }`}
                key={item.id as Key}
                onClick={() => setActiveCategory(item.id)}
              >
                {item.text}
              </button>
            );
          })}
        </div>
        <div className="flex-grow p-3 w-full overflow-y-auto bg-base-100" id="scroll-area" onScroll={(e: React.UIEvent<HTMLDivElement>) => setScrollPosY((e.target as HTMLDivElement)?.scrollTop)}>
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
                <span className="font-bold">Templates not found.</span>
              </p>
            </div>
          )}
        </div>
        {!filterOpen && <button onClick={() => setFilterOpen(true)} aria-label="add" className={`fixed ring-1 ring-opacity-80  ring-purple-500 right-5 bottom-20 z-20 btn btn-circle btn-md ${lang != '' || keyword != '' ? 'bg-purple-900' : 'bg-primary'} shadow-2xl transition ease-in duration-200`}>
          <FilterIcon />
        </button>}
        <FilterTemplate open={filterOpen} onApply={(kw: any, lng: any) => { setKeyword(kw); setLang(lng); }} onClose={() => setFilterOpen(false)} />
      </div>

    </React.Fragment>

  );
};

export default TemplateList;