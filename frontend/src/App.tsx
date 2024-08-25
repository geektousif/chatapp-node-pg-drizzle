import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Provider } from "react-redux";

import { router } from "./routes";
import { Loader } from "./components/common/Loader";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./pages/ErrorPage";
import { store } from "./app/store";
// import AuthWrapper from "./components/common/AuthWrapper";
function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </Suspense>
    </Provider>
  );
}

export default App;
