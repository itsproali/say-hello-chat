import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import Routes from "./routes/Routes";
import ThemeProvider from "./utils/ThemeProvider";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<p>Loading</p>} persistor={persistor}>
          <ThemeProvider>
            <BrowserRouter>
              <Toaster position="top-center" reverseOrder={false} />
              <Routes />
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
