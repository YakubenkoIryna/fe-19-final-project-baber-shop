import React, {PureComponent} from "react";
import * as Sentry from "@sentry/react";
import ErrorPageBoundary from "../../pages/ErrorPage_Boundary";

// used class component as Hooks for ErrorBoundary are not available

export default class ErrorBoundary extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      eventId: "",
      errorInfo: "",
      hasError: false
    };
  }

  // use to log an error in Sentry
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      hasError: true
    })
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({eventId, errorInfo, error});
    });
  }

  render() {
    const {hasError, errorInfo, error, eventId} = this.state;
    if (hasError) {
      return <ErrorPageBoundary errorInfo={errorInfo} error={error} eventI={eventId}/>
    }
    return this.props.children;
  }
}
