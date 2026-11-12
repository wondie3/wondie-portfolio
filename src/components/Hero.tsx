import { Fragment } from "react";
import DotField from "./DotField";
import HeroProfile from "./HeroProfile";
import { resolveProfilePhoto } from "../lib/profilePhoto";
import { personal } from "../data/personal";

export default function Hero() {
  return (
    <header id="top" className="hero-wrap">
      <DotField intensity={1} focus={[0.28, 0.42]} />
      <div className="vignette" aria-hidden="true" />
      <div className="hero">
        <section aria-labelledby="name">
          <h1 id="name" className="rise">
            <span>{personal.firstName}</span>
            <span className="l2">
              {personal.lastName}
              <i className="cursor" aria-hidden="true" />
            </span>
          </h1>
          <p className="role rise d1">
            {personal.roles.map((r, i) => (
              <Fragment key={r}>
                {i > 0 && (
                  <span className="sep" aria-hidden="true">
                    |
                  </span>
                )}
                <span>{r}</span>
              </Fragment>
            ))}
          </p>
          <p className="intro rise d2">{personal.intro}</p>
          <div className="actions rise d3">
            <a className="btn primary" href="#projects">
              Explore my projects
            </a>
            <a className="btn ghost" href="#contact">
              Contact me
            </a>
            {/* The only CV button on the whole site */}
            <a className="btn ghost" href={personal.cv} download>
              Download CV
            </a>
          </div>
          <div className="links rise d3">
            <a href={personal.social.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </section>

        <HeroProfile
          name={personal.name}
          initial={personal.firstName.charAt(0)}
          university={personal.university}
          location={personal.location}
          photo={resolveProfilePhoto(personal.photo)}
          photoAlt={personal.photoAlt}
        />
      </div>
    </header>
  );
}
