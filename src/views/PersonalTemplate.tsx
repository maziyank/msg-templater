import React, { Key, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TemplateCard from "../components/TemplateCard";
import { FirebaseContext } from "../firebase";
import { Template } from "../types/types";
import { usePersistedState } from "../utils/util";
import { ReactComponent as PlusIcon } from "./../assets/icon/plus.svg";
import { ReactComponent as FilterIcon } from "./../assets/icon/filter.svg";
import FilterTemplate from "../components/FilterTemplate";

const PersonalTemplate = () => {
  const { user, customTemplates } = useContext(FirebaseContext);
  const history = useHistory();
  const [scrollPosY, setScrollPosY] = usePersistedState('personalTemplate:scrollPosY', 0);

  // Filter Data
  const [filterOpen, setFilterOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [lang, setLang] = useState('');

  const filteredTemplate = customTemplates && customTemplates.filter((tpl: Template) => (lang?.length > 0 ? lang == tpl.lang : true))
    .filter((tpl: Template) => (keyword?.length > 0 ? tpl.content.indexOf(keyword) > 0 : true));

  useEffect(() => {
    document.getElementById("scroll-area")?.scroll(0, scrollPosY || 0)
  }, [])

  const handleCardClick = (event: any, id: any) => {
    history.push(`/main/compose/${id}`);
  }

  const handleCardLongPress = (event: any, id: any) => {
    history.push(`/main/editor/${id}`);
  }

  return (
    <React.Fragment>
      <div className="w-full">
        <div id="scroll-area" className="px-3 pt-3 pb-40 w-full h-screen overflow-y-auto bg-base-100 space-y-4" onScroll={(e: React.UIEvent<HTMLDivElement>) => setScrollPosY((e.target as HTMLDivElement).scrollTop)}>
          {filteredTemplate && filteredTemplate.length == 0 ? <div className="w-full h-full"><span className="block mt-40 text-center">Loading Data....</span></div>
            : filteredTemplate && filteredTemplate.map((tpl: Template, index: Key) => (
              <TemplateCard
                data={tpl}
                key={index}
                onLongPress={handleCardLongPress}
                onCardClick={handleCardClick}
              />
            ))}
        </div>
      </div>
      {user && !filterOpen && <button onClick={() => setFilterOpen(true)} aria-label="add" className={`fixed ring-1 ring-opacity-80  ring-purple-500 right-5 bottom-20 z-20 btn btn-circle btn-md ${lang != '' || keyword != '' ? 'bg-purple-900' : 'bg-primary'} shadow-2xl transition ease-in duration-200`}>
        <FilterIcon />
      </button>}
      <FilterTemplate open={filterOpen} onApply={(kw: any, lng: any) => { setKeyword(kw); setLang(lng); }} onClose={() => setFilterOpen(false)} />

      {user && (
        <Link to={`/main/editor/`}>
          <button aria-label="add" className="fixed ring-1 ring-opacity-80 ring-purple-500 right-20 bottom-20 z-20 btn btn-circle btn-md bg-primary shadow-2xl transition ease-in duration-200">
            <PlusIcon />
          </button>
        </Link>
      )}
    </React.Fragment>
  );
};

export default PersonalTemplate;
