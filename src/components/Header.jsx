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
      </div>
      <div className="header__split">
        <p>
          <i class="fab fa-github"></i>
          <a href={github}>{getNonProtocolLink(github)}</a>
        </p>
        <p>
          <i class="fab fa-facebook"></i>
          <a href={fb}>{getNonProtocolLink(fb)}</a>
        </p>
      </div>
    </header>
  );
}