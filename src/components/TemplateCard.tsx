import React, {useCallback } from "react";
import { Link } from "react-router-dom";
import { Template } from "../types/types";
import { elipsis } from "../utils/util";
import { useLongPress } from 'use-long-press';
import { useState } from "react";
import { ReactComponent as TrashIcon } from "./../assets/icon/trash.svg";
import { ReactComponent as EditIcon } from "./../assets/icon/edit.svg";

interface Props {
  data: Template,
  onLongPress?: Function,
  onCardClick?: Function
}

const TemplateCard: React.FC<Props> = ({ data, onLongPress, onCardClick }) => {
  const [selected, setSelected] = useState(false);

  const callback = useCallback(event => {
    if (onLongPress) onLongPress(event, data.keyField);

  }, []);

  const bind = useLongPress(callback, {
    onStart: (event: any) => setSelected(true),
    onFinish: (event: any) => { setSelected(false); },
    onCancel: (event: any) => setSelected(false),
    threshold: 500,
  });


  return (
    <div>
      <div className={`card bordered w-full h-40 ${selected ? "bg-base-300" : "bg-base-200"} shadow-md compact select-none mb-3`} onClick={(event) => { if (onCardClick) onCardClick(event, data.id) }} {...bind}>
        {/* {selected && data.custom && (<ul className="absolute left-1/4 top-1/4 menu px-3 shadow-lg bg-base-100 rounded-box horizontal">
          <li>
            <a onClick={(event) => { if (onEdit) onEdit(event, data.keyField) }}>
              <EditIcon />
            </a>
          </li>
          <li>
            <a onClick={onDelete}>
              <TrashIcon />
            </a>
          </li>
        </ul>)} */}
        <div className="flex-col card-body">
          <h2 className="flex-none card-title text-sm">
            {data.title}
          </h2>
          <p className="flex-grow text-sm">
            {elipsis(data.content)}
          </p>
        </div>
      </div>
    </div >

  );
};

export default TemplateCard;
