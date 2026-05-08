import HeroSection from '../components/landing/HeroSection';
import ZodiacLogoLoop from '../components/landing/ZodiacLogoLoop';
import MissionSection from '../components/landing/MissionSection';
import MagicBento from '../components/ui/MagicBento';
import CTASection from '../components/landing/CTASection';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <ZodiacLogoLoop />
      <MissionSection />
      <MagicBento 
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect={true}
        spotlightRadius={400}
        particleCount={12}
        glowColor="139, 92, 246"
        disableAnimations={false}
      />
      <CTASection />
    </div>
  );
};

export default Home;
