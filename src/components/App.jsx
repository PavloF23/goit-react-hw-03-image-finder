import { Component } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { AppStyle } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'components/servicesApi';
// import { Audio } from "react-loader-spinner";

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    total: 0,
    status: "idle",
  }

  handleFormSubmit = findImg => {
    this.setState({ page:1, query: findImg, images: [] });
  };

  componentDidUpdate(prevProps, prevState){    
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ status: 'pending' });
      fetchImages({ query: this.state.query, page: this.state.page })
        .then(({ totalHits, hits }) => {
          if (totalHits) {
            this.setState(prevState => ({
              images: [...prevState.images, ...hits],
              total: totalHits,
              status: 'resolved',
            }));
          } else {
            this.setState({ status: 'rejected' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));       
    }    
  }
  

  render() {
    const { images, status, query } = this.state;

    if (status === "idle") {
      return (
        <AppStyle>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <p>Enter the name of the picture</p>
      </AppStyle>
      );
    }

    if (status === "pending") {
      return (
        <AppStyle>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <h1>loading....</h1>
      </AppStyle>       
      );
    }

    if (status === "resolved") {
    return (
      <AppStyle>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery items={images} />
      </AppStyle>
      );
    }

    if (status === "rejected") {
      return (
        <AppStyle>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <p>{`No results containing ${query} were found.`}</p>
        </AppStyle>
        );
    }
  }
};
