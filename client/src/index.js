import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './store/configureStore'
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./routes/ScrollToTop";
import './reset.css'
import './index.css'

// Sentry settings for errors tracking
Sentry.init({
  dsn: "https://7633099b3880475cb170dc0c5d1ec1bb@o510589.ingest.sentry.io/5606474",
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
      <ScrollToTop />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
