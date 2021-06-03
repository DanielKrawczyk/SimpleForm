import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import Form from "./components/Form";
import Loading from './components/Loading';
import Info from './components/Info';
import store from './store/store';

function App() {
  return (
      <Provider store={store}>
        <RecoilRoot>
          <div className="container">
            <h1 className="font-amatic">Let's add some new dishes!</h1>
            <Form />
            <Loading />
            <Info />
          </div>
        </RecoilRoot>
      </Provider>
  );
}

export default App;
