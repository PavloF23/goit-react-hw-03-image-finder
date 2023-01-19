import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery ({items}) {

  return (
    <Gallery>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          item={item}
          webformatURL={item.webformatURL}
          tags={item.tags}     
          largeImageURL={item.largeImageURL}
        />
      ))}           
    </Gallery>
  )
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};