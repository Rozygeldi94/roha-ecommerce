import { Box, Image } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
register();

const bannerImages = [
  { id: 1, title: "swiper-image-1", src: "Swiper_Images/swiper_image__1.webp" },
  { id: 2, title: "swiper-image-2", src: "Swiper_Images/swiper_image__2.webp" },
  { id: 3, title: "swiper-image-3", src: "Swiper_Images/swiper_image__3.webp" },
  { id: 4, title: "swiper-image-4", src: "Swiper_Images/swiper_image__4.webp" },
  { id: 5, title: "swiper-image-5", src: "Swiper_Images/swiper_image__5.webp" },
  { id: 6, title: "swiper-image-6", src: "Swiper_Images/swiper_image__6.webp" },
  { id: 7, title: "swiper-image-7", src: "Swiper_Images/swiper_image__7.webp" },
];

export const Banner = () => {
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      grabCursor: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
      injectStyles: [
        `
        .swiper{
            padding-bottom: 25px;
        }
        .swiper-button-next,
        .swiper-button-prev {
            width: 20px ;
            height: 20px;
            background-color: white;
            padding: 8px 8px;
            border-radius: 50%;
            border: 2px solid #e52e6b;
            color: #4e82f1;
        }     
        .swiper-button-prev {     
            left: 0;
        }
        .swiper-button-next{
            right: 0;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
            background: #f3f5f8;
            cursor: pointer;
        }
        .swiper-pagination{
            bottom: -6px !important;
        }
        .swiper-pagination:hover{
            cursor: default;
      }
        .swiper-pagination-bullet{
            width: 8px;
            height: 8px;
            background-color: #4b51fa;
        }
        .swiper-button-prev svg,
        .swiper-button-next svg {
            width: 40%;
        }
      `,
      ],
    };

    if (swiperContainer) {
      Object.assign(swiperContainer, params);
      swiperContainer.initialize();
    }
  }, []);
  useEffect(() => {
    const progressCircle = document.querySelector(
      ".autoplay-progress svg"
    ) as HTMLElement;
    const progressContent = document.querySelector(
      ".autoplay-progress span"
    ) as HTMLElement;

    const swiperEl = document.querySelector("swiper-container") as HTMLElement;

    swiperEl.addEventListener("autoplaytimeleft", (e) => {
      const [swiper, time, progress] = (e as CustomEvent).detail;
      progressCircle.style.setProperty("--progress", (1 - progress).toString());
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    });
  }, []);

  return (
    <swiper-container
      init="false"
      ref={swiperRef}
      pagination="true"
      pagination-clickable="true"
      navigation="true"
      space-between="30"
      centered-slides="true"
      autoplay-delay="6000"
      autoplay-disable-on-interaction="false"
    >
      {bannerImages.map((image) => (
        <swiper-slide key={image?.id}>
          <Image
            width="1080px"
            height="350px"
            margin="0 auto"
            maxH="400px"
            src={image?.src}
            alt={image?.title}
            borderRadius="10px"
            _hover={{ cursor: "grab" }}
          />
        </swiper-slide>
      ))}
      <Box
        className="autoplay-progress"
        slot="container-end"
        _hover={{ cursor: "default" }}
      >
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span></span>
      </Box>
    </swiper-container>
  );
};
