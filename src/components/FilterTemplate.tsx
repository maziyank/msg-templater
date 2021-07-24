import React, { useEffect } from 'react';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'

interface Props {
    open: boolean,
    lang?: string,
    keyword?: string,
    onApply?: Function,
    onClose?: Function
}

const FilterTemplate: React.FC<Props> = ({ open, onApply, onClose }) => {
    const [keyword, setKeyword] = useState('');
    const [lang, setLang] = useState('');

    return (
        <BottomSheet open={open}>
            <div className="p-5 card bg-base-200">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Keyword</span>
                    </label>
                    <input value={keyword} type="text" placeholder="Keyword" className="input" onChange={(event: React.ChangeEvent<any>) =>
                        setKeyword((event.target as HTMLInputElement).value)
                    } />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Language</span>
                    </label>
                    <select value={lang} className="select select-bordered" onChange={(event: React.ChangeEvent<any>) =>
                        setLang((event.target as HTMLSelectElement).value)
                    }>
                        <option value="">Select All</option>
                        <option value="en">English</option>
                        <option value="id">Indonesia</option>
                        <option value="jv">Javanese</option>
                    </select>
                </div>
                <div className="flex flex-row justify-center space-x-2 h-20 mt-5">
                    <button onClick={() => {onApply && onApply(keyword, lang); onClose && onClose(false);}} aria-label="filter" className="btn btn-md btn-primary transition duration-500 ease-in-out">Apply</button>
                    <button onClick={() => {setLang(''); setKeyword('');}} aria-label="clear" className="btn btn-md btn-secondary transition duration-500 ease-in-out">Clear</button>
                    <button onClick={() => {onClose && onClose(false)}} aria-label="close" className="btn btn-md btn-accent transition duration-500 ease-in-out">Close</button>
                </div>
            </div>
        </BottomSheet >
    );
};

export default FilterTemplate