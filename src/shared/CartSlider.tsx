import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { useStore } from "../contextApi/zustand/cartSilder.store";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CartSlider: React.FC = () => {
  const { Silder1 } = useStore();
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    speed: 500,
    dots: true,
    arrows: true,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const handleStartPage = () => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0); // 슬라이더를 첫 번째 슬라이드로 이동
    }
    setCurrentSlide(0); // currentSlide 상태를 0으로 초기화
  };

  return (
    <div>
      <h1>신규 해외 고객 구매</h1>
      <Slider {...sliderSettings} ref={sliderRef}>
        {Silder1.map((s, i) => (
          <div key={i}>
            <img src={s.imgs[0]} alt={`슬라이드 이미지 ${i}`} />
          </div>
        ))}
      </Slider>
      <div className="slider-controls">
        <button className="start-page-button" onClick={handleStartPage}>
          페이지 시작하기
        </button>
        <div className="page-indicator">
          {currentSlide + 1} / {Silder1.length}
        </div>
      </div>
    </div>
  );
};

export default CartSlider;
