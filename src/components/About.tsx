import Section from "./Section";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";
import { personal } from "../data/personal";
import { skillGroups } from "../data/skills";
import { experience } from "../data/experience";

export default function About() {
  const learning = skillGroups.flatMap((g) => g.items).filter((s) => s.note === "learning").map((s) => s.name);
  const community = experience.find((e) => e.featured);
  return (
    <Section id="about" index="02" eyebrow="About" title="About me" intensity={0.5} focus={[0.15, 0.6]}>
      <div className="two-col about-grid">
        <Reveal>
          {personal.bio.map((para, i) => (
            <p key={para} className={i === 0 ? "prose lead" : "prose"}>
              {para}
            </p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <aside className="glass profile-card" aria-label="Profile summary">
            <div className="pc-head">
              <div className="pc-avatar">
                <b aria-hidden="true">{personal.firstName.charAt(0)}</b>
                <SafeImage src={personal.photo} alt={personal.photoAlt} sizes="64px" className="photo-img" />
              </div>
              <div>
                <p className="pc-name">{personal.name}</p>
                <p className="pc-role">{personal.roles[0]}</p>
              </div>
            </div>
            <dl className="pc-facts">
              <div>
                <dt>Studying</dt>
                <dd>Computer Science, {personal.university}</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{personal.location}</dd>
              </div>
              <div>
                <dt>Interests</dt>
                <dd>
                  <ul className="chips">
                    {personal.interests.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              {learning.length > 0 && (
                <div>
                  <dt>Learning</dt>
                  <dd>{learning.join(", ")}</dd>
                </div>
              )}
              {community && (
                <div>
                  <dt>Community</dt>
                  <dd>
                    {community.title}, {community.org}
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
