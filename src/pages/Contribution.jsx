import React from "react";
import { uploadQuestionDirectly } from "../questions";
import XRegExp from "xregexp";

export default function Contribution() {
  const handleClick = (e) => {
    e.preventDefault();
    const regexUniCode = new XRegExp(`^[\\pL\\W\\s]+$`);
    const regex = /^[\w\s]+$/;
    const form = document.contribution;
    let pass = true;
    let questionObj = {};

    for (let prop of ["question", "answer", "author"]) {
      questionObj[prop] = form[prop].value.trim();
      if (!regexUniCode.test(form[prop].value)) pass = false;
    }
    // not unicode char in answer
    if (!regex.test(form.answer.value)) pass = false;
    if (pass) {
      for (let prop in questionObj) form[prop].value = "";

      questionObj.timestamp = parseInt(Date.now() / 1_000);
      console.log(questionObj);

      uploadQuestionDirectly(questionObj);
      alert("Thanks " + questionObj.author);
    } else alert("Phần đáp án không chứa kí tự có dấu và kí tự đặc biệt");
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
          <li>Câu hỏi và tác giả sẽ chấp nhận kí tự đặc biệt và unicode</li>
          <li>Phần đáp án chỉ chấp nhận tiếng Việt không dấu</li>
          <li>
            Tạm thời tất cả các câu hỏi sẽ được duyệt ngay sau khi xác nhận
          </li>
        </ul>
      </form>
    </>
  );
}
