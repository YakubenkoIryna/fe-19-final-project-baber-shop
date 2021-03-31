import React from "react";
import {Button, Col, Result, Row} from "antd";
import {useHistory} from "react-router";
import {useSelector} from "react-redux";
import * as Sentry from "@sentry/react";

const ErrorPageBoundary = ({errorInfo, error, eventId}) => {
  const {isAdmin} = useSelector(store => ({...store.user}));
  const history = useHistory();

  return (
    <Result
      status="warning"
      title={error.message || "There are some problems with your operation."}
      extra={
        <>
          <Row gutter={[16, 16]} justify={"center"}>
            <Col spn={16}>
              <p>{(errorInfo && errorInfo.componentStack.toString()) || "Error info"}</p>
            </Col>
          </Row>
          <Button
            style={{width: 160}}
            type="primary"
            key="err_return-home"
            onClick={() => {
              if (isAdmin) {
                history.push("/admin/category");
              } else {
                history.push("/");
              }
            }}>
            Return to Home
          </Button>
          <Button
            style={{width: 160}}
            type="primary"
            key="crash-report"
            onClick={() => Sentry.showReportDialog({eventId})}>
            Create Crash Report
          </Button>
        </>
      }
    />
  );
};

export default ErrorPageBoundary;