import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";

export default function Slider() {
    const images = [
        { url: "/assets/images/1.jpg" },
        { url: "/assets/images/2.jpg" },
        { url: "/assets/images/3.jpg" },
        { url: "/assets/images/4.jpg" },
    ];
    return (
        <div>
            <SimpleImageSlider
                width={'100%'}
                height={504}
                images={images}
                showBullets={true}
                showNavs={true}
            />
        </div>
    )
}
