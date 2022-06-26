import 'materialize-css/dist/css/materialize.min.css';
import { StrictMode } from "react";
import ReactDOM from 'react-dom';

import App from './components/App';
//import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    rootElement
);
