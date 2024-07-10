import homeHeroBg from "../../../../public/videos/home-hero.mp4";

export default function HeroVideo() {
  return (
    <section>
      <video
        autoPlay
        muted
        loop
        id="video-background"
      >
        <source
          src={homeHeroBg}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}
