import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
// import { Navbar, Nav } from "react-bootstrap";

import app from "./components/base";

function App() {
  const [files, setFiles] = React.useState(null);
  const handleFilesChange = e => {
    setFiles(e.target.files);
  };
  const handleUpload = () => {
    console.log(files);
    if (files) {
    //   files.forEach(file => {
      for(let i = 0; i < files.length; i++){
        const image = files[i];
        const imageName = image.name;
        const uploadTask = app
          .storage()
          .ref(`images/${imageName}`)
          .put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {},
          () => {
            app
              .storage()
              .ref("images")
              .child(imageName)
              .getDownloadURL()
              .then(url => {
                app
                  .database()
                  .ref()
                  .child("data/")
                  .push({ url: url });
              });
          }
        );
      }
    //   });
    }
  };
  const handleLogin = () => {};
  const handleLogout = () => {};

  return (
    <div className="App">
//       <Navbar expand="lg">
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto">
//             <Nav.Link
//               className="btn_select_download"
//               href="#"
//               onClick={handleLogin}
//             >
//               Login
//             </Nav.Link>
//             <Nav.Link
//               className="btn_select_download"
//               href="#"
//               onClick={handleLogout}
//             >
//               Logout
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
      <div className="content">
        <div className="comp_container">
          <input
            type="file"
            className="upload_file"
            multiple="multiple"
            onChange={handleFilesChange}
          />
          <input
            type="button"
            className="upload_button btn btn-success"
            value="upload"
            onClick={handleUpload}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
