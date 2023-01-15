import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { AppStyle } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    findImg: '', 
  };

  handleFormSubmit = findImg => {
    this.setState({ findImg });
  };

  render() {
    return (
      <AppStyle>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer position="top-center" autoClose={3000} />
        <ImageGallery findImg={this.state.findImg} />
      </AppStyle>
    );
  }
};
