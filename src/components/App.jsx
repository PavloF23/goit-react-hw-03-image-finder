import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { AppStyle } from "./App.styled";


export class App extends Component {
  state = {
    pictures: null,
    allLoaded: false,
    error: null,
    status: "idele",
    page: 1,
  };


  handleSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.elements.query.value.trim().toLowerCase();

    if (!query) {
      alert('Search box cannot be empty. Please enter the word.');
      return;
    }

    this.setState({
      page: 1,
      query,
      images: [],
    });

    evt.target.reset();
  };



  render() {
    return (
      <AppStyle>
        <Searchbar onSubmit={this.handleSubmit} />
      </AppStyle>
    );
  }
};
