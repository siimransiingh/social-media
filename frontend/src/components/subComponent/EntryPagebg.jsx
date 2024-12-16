
import image1 from '/images/img1.svg';
import image3 from '/images/img3.svg';
import image4 from '/images/img4.svg';
import image5 from '/images/img5.svg';
import image6 from '/images/img6.svg';
import image7 from '/images/img7.svg';
import image8 from '/images/img8.svg';
import image9 from '/images/img9.svg';
import image10 from '/images/img10.svg';

const EntryPagebg = () => {
    const images = [image1, image3, image4, image5, image6, image7, image8, image9, image10];

    return (
        <div className='masonry-layout-mob masonry-layout z-10 '>
            {images.map((image, index) => (
                <img 
                    src={image} 
                    key={index} 
                    alt={`Background ${index + 1}`} 
                   className='masonry-item-mob min-h-full min-w-full'
                />
            ))}
        </div>
    );
};

export default EntryPagebg;
