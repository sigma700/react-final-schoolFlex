import Toast from "react-bootstrap/Toast";

export default function ToastElement() {
  return (
    <Toast className="bg-white text-black lg:text-[30px] rounded-[10px] p-[10px] font-light">
      <Toast.Header className="">
        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
        <strong className="me-auto bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Edu Find
        </strong>{" "}
        <br />
        <small>0 mins ago</small>
      </Toast.Header>
      <Toast.Body>Successfully verified....</Toast.Body>
    </Toast>
  );
}
