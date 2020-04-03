export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

sessionStorage.setItem("username", "68091701");
// window.host = "http://lrc.nirain.com";
window.host = "";
