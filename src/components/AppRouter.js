import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App';
import NotAccessibleApp from './NotAccessibleApp';

export default function AppRouter() {
  return (
    <Router>
     <Route path="/" exact component={App} />
     <Route path="/not-accessible" component={NotAccessibleApp} />
    </Router>
  );
}
