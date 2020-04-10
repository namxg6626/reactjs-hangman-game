import React from "react";
import { Link } from "react-router-dom";
import { withConsumer } from "../context";

function Header(props) {
  const { title, fb, github } = props;
  const { author } = props.context;
  function getNonProtocolLink(linkWithProtocol) {
    const regex = /https?:\/\/([\D\d]+)/;
    return regex.exec(linkWithProtocol)[1];
  }

  return (
    <header className="header">
      <div className="header__split">
        <Link to="/">
          <h2>{title}</h2>
          {author && <p className="author">@{author.replace(/ /g, "")}</p>}
        </Link>
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
        <p>
          <Link to="/contribution">
            <i className="fas fa-question-circle"></i>
            Đóng góp câu hỏi
          </Link>
        </p>
      </div>
    </header>
  );
}

export default withConsumer(Header);
