import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";
import { FirebaseContext } from "../firebase";
import { Template } from "../types/types";


const Editor = () => {
  const history = useHistory();
  const routeParams: any = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const { user, writeTemplate, updateTemplate, deleteTemplate, customTemplates } = useContext(FirebaseContext);

  // const routeParams: any = useParams();
  // const { Categories } = useContext(DataContext);
  // const categories: Array<Category> = Categories.categories;

  // const [category, setCategory] = useState(routeParams.defaulCat);


  useState(() => {
    if (routeParams.templateId && customTemplates) {
      const found = customTemplates.find((item: Template) => item.keyField == routeParams.templateId);
      if (found) {
        setContent(found.content);
        setTitle(found.title);
      }
    };
  })

  const saveTemplate = () => {
    if (routeParams.templateId) {
      if (content != '' && title != '' && user) {
        const custom = true;
        updateTemplate(user.uid, { title, content, custom, keyField: routeParams.templateId });        
      }
    } else {
      if (content != '' && title != '' && user) {
        const id = new Date().valueOf();
        const custom = true;
        writeTemplate(user.uid, { id, title, content, custom });
      }
    }

    history.replace('/main/history');
  }

  const handleDeleteTemplate = () => {
    if (routeParams.templateId) {
      deleteTemplate(user.uid, { keyField: routeParams.templateId })
      history.replace('/main/history');
    }    
  }

  return (
    <React.Fragment>
      <div className="flex flex-col absolute inset-y-0 inset-x-0 z-20 w-screen h-screen bg-base-200">
        <div className="flex-none">
          <Header title={routeParams.templateId ? "Edit Template" : "New Template"}></Header>
        </div>
        <div id="form" className="px-5 pb-5 flex-grow flex flex-col space-y-2">
          <div className="flex-none form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              autoFocus
              placeholder="Title Here"
              className="input input-bordered"
              value={title} onChange={(e: React.ChangeEvent<any>) => setTitle(e.target.value)}
            />
          </div>
          {/* <div className="flex-none form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              value={category} onChange={(e: React.ChangeEvent<any>) => setCategory(e.target.value)}
            >
              { categories.map((item: Category, index: any) => {
                return <option key={item.id} value={item.id}>{item.text}</option>;
              })}
            </select>
          </div> */}
          <div className="flex-grow form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Template</span>
            </label>
            <textarea
              className="textarea h-full leading-none"
              placeholder="Template Text"
              value={content} onChange={(e: React.ChangeEvent<any>) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-none flex flex-row justify-center space-x-2 h-20">
          <button className="btn btn-md btn-primary transition duration-500 ease-in-out" disabled={content == '' || title == ''} onClick={saveTemplate}>Save</button>
          {routeParams.templateId && <button className="btn btn-md btn-secondary transition duration-500 ease-in-out" onClick={handleDeleteTemplate}>Delete</button>}
          <button className="btn btn-md btn-accent transition duration-500 ease-in-out" onClick={() => history.replace('/main/history')}>Cancel</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Editor;
