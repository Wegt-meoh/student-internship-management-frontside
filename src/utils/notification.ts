import Toastify from "toastify-js";

export function showNotification({
  text,
  duration,
}: {
  text: string;
  duration: number;
}) {
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
}
