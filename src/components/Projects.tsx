import Section from "./Section";
import Reveal from "./Reveal";
import ProjectSlider from "./ProjectSlider";
import CaseStudyButton from "./CaseStudyButton";
import ProjectGrid from "./ProjectGrid";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";
import { getProjectImages } from "../lib/projectImages";
import { motionConfig } from "../config/design";

export default function Projects() {
  const list = projects.filter((p) => p.visible);
  const counts: Record<string, number> = { all: list.length };
  for (const p of list) counts[p.type] = (counts[p.type] ?? 0) + 1;

  return (
    <Section id="projects" index="01" eyebrow="Selected work" title="Projects" intensity={0.6} focus={[0.8, 0.2]}>
      <ProjectGrid counts={counts}>
        {list.map((p, i) => {
          const images = getProjectImages(p.slug, p.image);
          const study = caseStudies[p.slug];
          const number = String(i + 1).padStart(2, "0");
          return (
            <div key={p.slug} id={"project-" + p.slug} className="project-cell" data-type={p.type} data-shots={study?.gallery}>
              <Reveal delay={(i % 3) * motionConfig.stagger}>
                <article className="glass project">
                  <div className="project-media">
                    <span className="project-ph" aria-hidden="true">
                      {number}
                    </span>
                    <ProjectSlider images={images} title={p.title} />
                    {p.status === "in-progress" && <span className="badge">In Progress</span>}
                    {p.status === "completed" && <span className="badge done">{p.statusLabel ?? "Completed"}</span>}
                  </div>
                  <div className="project-body">
                    <h3>{p.title}</h3>
                    <p>{p.description || "Details coming soon."}</p>
                    {p.tech.length > 0 && (
                      <ul className="chips" aria-label="Technologies">
                        {p.tech.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                    {(p.repo || p.demo || study) && (
                      <div className="project-links">
                        {study && <CaseStudyButton project={p} study={study} images={images} number={number} />}
                        {p.repo && (
                          <a href={p.repo} target="_blank" rel="noopener noreferrer">
                            Source &#8599;
                          </a>
                        )}
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noopener noreferrer">
                            Live demo &#8599;
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            </div>
          );
        })}
      </ProjectGrid>
    </Section>
  );
}
