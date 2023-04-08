import Toastify from "toastify-js";

export function showNotification({
  text,
  duration,
}: {
  text: string | string[];
  duration: number;
}) {
  let arr = [];
  if (!Array.isArray(text)) {
    arr.push(text);
  } else {
    arr = text;
  }

  arr.forEach((text) => {
    Toastify({
      text: text,
      duration: duration,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        color: "#3a3a3a",
        background: "white",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  });
}
