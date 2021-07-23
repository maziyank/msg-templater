import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";
import { DataContext } from "../DataProvider";
import { Template, TemplateParam, anyObject } from "../types/types";
import { extractParams, toTitleCase } from "../utils/util";

import { ReactComponent as CopyIcon } from './../assets/icon/copy.svg';
import { ReactComponent as ShareIcon } from './../assets/icon/share.svg';
import { ReactComponent as CloseIcon } from './../assets/icon/close.svg';
import { FirebaseContext } from "../firebase";
import { RWebShare } from "react-web-share";

const Composer = () => {
  const { StaticTemplates } = useContext(DataContext);
  const { customTemplates } = useContext(FirebaseContext);
  const routeParams: any = useParams();
  const [currentContentRendered, setCurrentContentRendered] = useState("");
  const [params, setParams] = useState([] as Array<TemplateParam>);
  const [paramsValue, setParamsValue] = useState({} as anyObject);
  const [copyTooltip, setCopyTooltip] = useState(false);

  const history = useHistory();

  const activeTemplate = useState((): Template => {
    const found = StaticTemplates.templates.find(
      (item: Template) => item.id == routeParams.templateId
    ) || customTemplates.find(
      (item: Template) => item.id == routeParams.templateId
    );

    if (found) {
      setParams(extractParams(found.content));
      setCurrentContentRendered(found.content);
    }

    return found
  });


  const handleResultChange = (
    event: React.ChangeEvent<any>,
    capture: string | any
  ) => {
    const obj: anyObject = {}
    obj[capture] = event.target.value;

    setParamsValue(Object.assign(paramsValue, obj))
    if (paramsValue) {
      setCurrentContentRendered(applyParams(activeTemplate[0].content, paramsValue))
    }
  };

  const applyParams = (text: string, params: anyObject): string => {
    Object.keys(params).forEach(item => {
      text = text.replace(item, params[item] == '' ? item : params[item])
      setCurrentContentRendered(text)
    })

    return text
  }

  const CopyToClipboard = (event: any) => {
    setCopyTooltip(true);

    setTimeout(() => {
      setCopyTooltip(false);
      const textArea = document.getElementById("ResultTextArea") as HTMLInputElement;
      textArea.select();
      document.execCommand('copy');
    }, 1000);
  }

  return (
    <React.Fragment>
      <div className="flex flex-col absolute inset-y-0 inset-x-0 z-20 w-full h-screen bg-base-200">
        <div className="flex-none">
          <Header title="Compose"></Header>
        </div>
        <div id="form" className="px-5 pb-5 flex-grow flex flex-col space-y-2">
          {params.map((item: TemplateParam, index: any) => {
            if (item.type == "text") {
              return (
                <div className="flex-none form-control" key={index}>
                  <label className="label select-none">
                    <span className="label-text">{toTitleCase(item.name as string)}</span>
                  </label>
                  <input
                    type="text"
                    autoFocus={index == 0}
                    placeholder={toTitleCase(item.name as string)}
                    className="input input-bordered"
                    onChange={(event: React.ChangeEvent<any>) =>
                      handleResultChange(event, item.capture)
                    }
                  />
                </div>
              );
            }

            if (item.type == "select") {
              return (
                <div className="flex-none form-control" key={index}>
                  <label className="label select-none">
                    <span className="label-text">{toTitleCase(item.name as string)}</span>
                  </label>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={(event: React.ChangeEvent<any>) =>
                      handleResultChange(event, item.capture)
                    }
                  >
                    {(item.options as Array<string>).map((opt: string, index: any) => {
                      return <option key={opt} value={opt}>{opt}</option>;
                    })}
                  </select>
                </div>
              );
            }
          })}

          <div className="flex-grow form-control">
            <div data-tip="Copied to Clipboard" className={`tooltip tooltip-open ${copyTooltip ? '' : 'hidden'}`}></div>
            <label className="cursor-pointer label select-none">
              <span className="label-text">Result</span>
            </label>
            <textarea
              className="textarea h-full leading-none"
              placeholder="Result"
              id="ResultTextArea"
              readOnly
              value={currentContentRendered}
            />
          </div>
        </div>
        <div className="flex-none flex flex-row justify-center space-x-2 h-20">

          <button name="copy" className="btn btn-md btn-primary transition duration-500 ease-in-out" onClick={CopyToClipboard}><CopyIcon />{" "}Copy</button>
          <RWebShare
            sites= {["whatsapp", "copy", "twitter","linkedin","telegram","mail","linkedin","facebook"]}
            data={{
              title: 'Share Message',
              text: currentContentRendered
            }}
            onClick={() => console.log("shared successfully!")}
            >
            <button name="share" className="btn btn-md btn-secondary transition duration-500 ease-in-out"><ShareIcon />{" "}Share</button>
          </RWebShare>
          <button name="back" className="btn btn-md btn-accent transition duration-500 ease-in-out" onClick={() => history.goBack()}><CloseIcon />{" "}Close</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Composer;
