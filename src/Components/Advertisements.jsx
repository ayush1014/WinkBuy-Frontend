import Carousel from 'react-bootstrap/Carousel';
import Image from '../Utilities/ad_Images/image.jpg';
import './Advertisements.css'
import Banner1 from '../Utilities/ad_Images/banner1.gif'
import Banner2 from '../Utilities/ad_Images/banner2.gif'
import Banner3 from '../Utilities/ad_Images/banner3.gif'

function Advertisements() {
  return (
    <div className="carousel-container">
      <Carousel>
        <Carousel.Item>
          <img src={Banner1} alt="Banner 1" className="d-block carousel-image"/>
          <Carousel.Caption>
            {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Banner2} alt="Banner 2" className="d-block carousel-image"/>
          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Banner3} alt="Banner 3" className="d-block carousel-image"/>
          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Advertisements;