import React, { useEffect } from 'react';
import { ReactComponent as DarkIcon } from './../assets/icon/night.svg';
import { ReactComponent as LightIcon } from './../assets/icon/light.svg';
import { usePersistedState } from '../utils/util';

interface Props {
  title: string
}

const Header: React.FC<Props> = ({ title }) => {
  const [nightMode, setNightMode] = usePersistedState('nightMode', false);
  const ThemeIcon = nightMode ? DarkIcon : LightIcon;

  useEffect(()=>{
    const html = document.getElementsByTagName("html")[0];    
    html.setAttribute("data-theme", nightMode ? "dark" : "light");
  })

  const changeMode = () => {
    setNightMode(!nightMode);
  }

  return (
    <div className="navbar flex justify-between bg-base-200 text-light-content select-none">
      <div className="flex-none px-1 mx-1">
        <span className="text-lg font-bold">
          {title}
        </span>
      </div>
      <div className="flex-none">
        <button className="btn btn-outline btn-circle btn-sm" aria-label="night mode switch" onClick={changeMode}>
          <ThemeIcon />
        </button>
      </div>
    </div>
  );
};

export default Header
