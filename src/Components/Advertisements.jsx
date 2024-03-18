import Carousel from 'react-bootstrap/Carousel';
import Image from '../Utilities/ad_Images/image.jpg';
import './Advertisements.css'

function Advertisements() {
  return (
    <div className="carousel-container">
      <Carousel>
        <Carousel.Item>
          <img src='https://m.media-amazon.com/images/I/71hDKwGd-KL._SX3000_.jpg' alt="First slide" className="d-block carousel-image"/>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src='https://m.media-amazon.com/images/I/61c12GI1TxL._SX3000_.jpg' alt="First slide" className="d-block carousel-image"/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src='https://m.media-amazon.com/images/I/61W2AYyzIZL._SX3000_.jpg' alt="First slide" className="d-block carousel-image"/>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Advertisements;