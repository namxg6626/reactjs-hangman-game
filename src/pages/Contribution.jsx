import React from "react";
import { uploadQuestion } from "../questions";
import XRegExp from "xregexp";

export default function Contribution() {
  const handleClick = (e) => {
    e.preventDefault();
    const regex = new XRegExp(`^[\\pL\\w\\s]+$`);
    const form = document.contribution;
    let inputControl = {};
    let pass = true;
    let questionObj = {};

    for (let prop of ["question", "answer", "author"]) {
      inputControl[prop] = form[prop];
      inputControl[prop].value = form[prop].value.trim();
      if (!regex.test(inputControl[prop].value)) pass = false;
    }
    if (pass) {
      for (let prop in inputControl)
        questionObj[prop] = inputControl[prop].value;

      uploadQuestion(questionObj);
      alert("Thanks " + questionObj.author);
    } else alert("Đã bảo là không có kí tự đặc biệt mà :((");
  };

  return (
    <>
      <form name="contribution">
        <label htmlFor="question">Câu hỏi </label>
        <input
          type="text"
          name="question"
          id="question"
          placeholder="blah blah..."
        />
        <label htmlFor="answer">Đáp án </label>
        <input
          type="text"
          name="answer"
          id="answer"
          placeholder="blah blah..."
        />
        <label htmlFor="author">Do ai đặt </label>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="blah blah..."
        />
        <input type="submit" value="Xác nhận" onClick={handleClick} />
        <ul>
          <li>Các thông tin chỉ bao gồm chữ, số và dấu cách</li>
          <li>
            Câu hỏi trùng nhau sẽ bị ghi đè (kể cả khác đáp án). Sẽ tìm cách
            khắc phục sớm :((
          </li>
        </ul>
      </form>
    </>
  );
}
