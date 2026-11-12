import Section from "./Section";
import Reveal from "./Reveal";
import { skillGroups } from "../data/skills";
import { motionConfig } from "../config/design";

export default function Skills() {
  return (
    <Section id="skills" index="03" eyebrow="Toolkit" title="Skills & technologies" intensity={0.6} focus={[0.85, 0.5]}>
      <div className="skill-grid">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * motionConfig.stagger}>
            <div className="glass skill-card">
              <h3>{g.title}</h3>
              <ul className="chips">
                {g.items.map((s) => (
                  <li key={s.name}>
                    {s.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.logo} alt="" width={16} height={16} />
                    )}
                    {s.name}
                    {s.note && <em> ({s.note})</em>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
