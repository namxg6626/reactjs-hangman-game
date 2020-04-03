import React from "react";

export default function Header(props) {
  const { title, fb, github } = props;

  function getNonProtocolLink(linkWithProtocol) {
    const regex = /https?:\/\/([\D\d]+)/;
    return regex.exec(linkWithProtocol)[1];
  }

  return (
    <header className="header">
      <div className="header__split">
        <h2>{title}</h2>
        <label htmlFor="expand">ツ About me</label>
      </div>

      <input type="checkbox" name="expand" id="expand" />
      <div className="header__split" id="mobile-closable">
        <p>
          <i className="fab fa-github"></i>
          <a href={github} target="_blank" rel="noopener noreferrer">
            {getNonProtocolLink(github)}
          </a>
        </p>
        <p>
          <i className="fab fa-facebook"></i>
          <a href={fb} target="_blank" rel="noopener noreferrer">
            {getNonProtocolLink(fb)}
          </a>
        </p>
      </div>
    </header>
  );
}
