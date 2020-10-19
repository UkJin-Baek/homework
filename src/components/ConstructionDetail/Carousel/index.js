import React from 'react';
import PropTypes from 'prop-types';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Wrapper } from './utils';

const Caro = ({history, root, endpoint, images, match}) => {
    return (
    <Wrapper>
        <Carousel >
        {images.map((image, key) =>
            <>
                <img src={image.src} alt={image.description}/>
                {/* <p className="legend">{image.description}</p> */}
            </>
        )}
        </Carousel>
    </Wrapper>
  )
}

Caro.propTypes = {
  history: PropTypes.object,
  endpoint: PropTypes.string,
  root: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object),
}

Caro.defaultProps = {
  history: {},
  endpoint: '',
  root: '',
  images: [],
}

export default Caro;