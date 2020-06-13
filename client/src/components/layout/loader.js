import React from 'react';

export default class Loader extends React.Component {
  render() {
    return (
        <div className="container text-cente trust-loader">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    );
  }
}