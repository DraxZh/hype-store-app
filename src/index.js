import React from 'react';
import ReactDom from 'react-dom';
import Router from 'Router';
import App from 'pages/App';
import 'css/app.scss';
import 'css/style.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'commons/auth';

ReactDom.render(<div>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover/>
                    <Router />
                </div>, document.getElementById('root'));