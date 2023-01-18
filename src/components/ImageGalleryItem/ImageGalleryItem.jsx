import PropTypes from 'prop-types';
import { GalleryItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  // largeImageURL,
  // onOpenModal,
}) => {
  return (
    <GalleryItem
      // onClick={() => {
      //   onOpenModal(largeImageURL, tags);
      // }}
    >
      <Img src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  // largeImageURL: PropTypes.string.isRequired,
  // onOpenModal: PropTypes.string.isRequired,
};