import { Component } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { AppStyle } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'components/servicesApi';
import { LoadMore } from "./LoadMore/LoadMore";

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    total: 0,
    status: "idle",
  }

  handleFormSubmit = query => {
    this.setState({ page:1, query, images: [] });
  };

  componentDidUpdate(prevProps, prevState){    
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ status: 'pending' });
      console.log(this.state.query);
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

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  render() {
    const { images, status, query, total } = this.state;

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
        {images.length < total && <LoadMore onClick={this.loadMore} />}
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
