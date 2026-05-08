import React from 'react';
import { CardContainer, CardBody, CardItem } from '../ui/ThreeDCard';
import { Sparkles } from 'lucide-react';
import ctaImage from '../../assets/cta-wisdom.png';
import './CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-header">
          <span className="section-badge">
            <Sparkles className="w-4 h-4 mr-2" />
            Connect with the Cosmos
          </span>
          <h2 className="section-title">Ready to align with your true purpose?</h2>
        </div>

        <CardContainer className="inter-var">
          <CardBody className="three-d-card-body">
            <CardItem
              translateZ="50"
              className="three-d-title"
            >
              Elevate Your Cosmic Journey
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="three-d-description"
            >
              Step into a realm of ancient wisdom and celestial guidance. Let the stars illuminate your path towards clarity and fulfillment.
            </CardItem>
            <CardItem translateZ="100" className="three-d-image-container">
              <img
                src={ctaImage}
                className="three-d-image"
                alt="Ancient wisdom and cosmic perspective"
              />
            </CardItem>
            <div className="three-d-footer">
              <CardItem
                translateZ={20}
                as="a"
                href="/services"
                className="three-d-link"
              >
                Explore Services →
              </CardItem>
              <CardItem
                translateZ={20}
                as="button"
                className="three-d-button"
              >
                Book a Reading
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </section>
  );
};

export default CTASection;

