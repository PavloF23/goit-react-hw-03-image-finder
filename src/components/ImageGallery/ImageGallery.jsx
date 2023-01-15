import PropTypes from 'prop-types';
import { Component } from "react";
import { Gallery } from './ImageGallery.styled';
import { fetchImages } from 'components/servicesApi';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
 
    loading: false,
    images: [],
    page: 1,
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.findImg !== this.props.findImg) {
    
      // this.setState({loading: true});
           fetchImages(this.props.findImg, this.state.page)
          .then(images =>   this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          page: prevState.page + 1,
        })))
           // .finally(() => this.setState({loading: false}));
    }
    
  }
  

render() {
  const images = this.state;
  return (
<Gallery>
    {/* {this.state.loding && <h1>LODING</h1>} */}
    {this.state.findImg && (images.map((image) => {
            return (
              <ImageGalleryItem
                key={image.id}
                tags={image.tags}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                />
                )}))}             
</Gallery>
)
}}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};