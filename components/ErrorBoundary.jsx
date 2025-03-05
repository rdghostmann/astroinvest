"use client";
import React from "react";

class ErrorBoundary extends React.Component {

  state = {
    hasError: false,
    error: null
  }
  static getDerivedState() {
    return {
      hasError: true,
      error: error
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div>Oops somethin wient wrong..</div>
          <div>{this.state.error?.message}</div>
        </div>
      )
    }
    return this.props.children;

  }
}

export default ErrorBoundary;