import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import rootReducer from "./reducers/root-reducer";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const App = () => {
  return <Provider store={store}>
    <Header />
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <ContactForm />
        </div>
        <div className="col-md-8">
          <ContactList />
        </div>
      </div>
    </div>
  </Provider>;
}

export default App;
