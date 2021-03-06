import React from "react";
import XRegExp from "xregexp";
import axios from "axios";

export default function Contribution() {
  const handleClick = (e) => {
    e.preventDefault();
    const regexAnswer = XRegExp(`^[\\pL\\sa-z]+$`, "i");
    const regex = /^[\w\s]+$/;
    const form = document.contribution;
    let pass = true;
    let questionObj = {};

    for (let prop of ["question", "answer", "author"]) {
      questionObj[prop] = form[prop].value.trim();
      if (!regexAnswer.test(form[prop].value)) pass = false;
    }

    // not unicode char, number in answer
    if (!regex.test(questionObj.answer)) pass = false;

    if (pass) {
      for (let prop in questionObj) form[prop].value = "";

      const { author, question, answer } = questionObj;
      axios({
        method: "POST",
        url: "https://express-hangman.herokuapp.com/upload-question",
        data: {
          author,
          question,
          answer,
        },
      }).then((result) => {
        console.log(result);
      });

      alert("Thanks " + author);
    } else {
      alert("Bỏ trống trường nào đó hoặc nhập sai dữ liệu");
    }
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
          <li>Phần đáp án chỉ viết tiếng Việt không dấu, không có số và kí tự đặc biệt</li>
        </ul>
      </form>
    </>
  );
}
