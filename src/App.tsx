import React, { useState, useEffect, useCallback, useMemo } from "react";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AfroStyles from "./afroStyles";

interface StyleItem {
  id: number;
  title: string;
  description: string;
  alt: string;
  src: string;
}

const NextArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => (
  <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
      <div className="next-slick-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
      </div>
  </div>
);

const PrevArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => (
  <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
      <div className="next-slick-arrow rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
      </div>
  </div>
);

const App: React.FC = () => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slider1, setSlider1] = useState<Slider | null>(null);

  useEffect(() => {
    setNav1(slider1);
  }, [slider1]);

  const goToSlide = useCallback((idx: number) => {
    slider1?.slickGoTo(idx);
  }, [slider1]);

  const settings = useMemo(() => ({
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    onReInit: () => {
      const innerSlider = slider1?.innerSlider as any;
      if (innerSlider && innerSlider.state) {
        setCurrentSlide(innerSlider.state.currentSlide);
      }
    },    
    autoplaySpeed: 1000,
    lazyLoad: false,
    asNavFor: nav1,
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  }), [slider1, nav1]);

  return (
    <div className="content">
      <h1 className="header">Afro Styles Fashion Store</h1>
      <div className="container">
        <Slider {...settings} asNavFor={nav1} ref={setSlider1}>
          {AfroStyles.map((item: StyleItem) => (
            <div key={item.id}>
              <div className="img-body">
                <img src={item.src} alt={item.alt} />
                <p>{item.title}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </Slider>
        <div className="thumb-wrapper">
          {AfroStyles.map((item: StyleItem, idx: number) => (
            <div
              key={item.id}
              className={`thumb ${currentSlide === idx ? "active" : ""}`}
              onClick={() => goToSlide(idx)}
            >
              <img src={item.src} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
