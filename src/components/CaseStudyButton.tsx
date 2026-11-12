"use client";

import { useRef, useState } from "react";
import ProjectSlider from "./ProjectSlider";
import PhoneGallery from "./PhoneGallery";
import type { Project } from "../data/projects";
import type { CaseStudy } from "../data/caseStudies";

export default function CaseStudyButton({
  project,
  study,
  images,
  number,
}: {
  project: Project;
  study: CaseStudy;
  images: string[];
  number: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const show = () => {
    setOpen(true);
    ref.current?.showModal();
  };
  const close = () => ref.current?.close();
  const titleId = "cs-" + project.slug;
  const phone = study.gallery === "phone";
  const badge = project.statusLabel ?? (project.status === "in-progress" ? "In progress" : project.repo ? "Available on GitHub" : undefined);

  return (
    <>
      <button type="button" className="cs-open" onClick={show} aria-haspopup="dialog">
        View case study &#8594;
      </button>
      <dialog
        ref={ref}
        className="cs"
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {open && (
          <div className="cs-grid" data-gallery={study.gallery}>
            <div className="cs-media">
              {phone ? (
                <PhoneGallery images={images} captions={study.captions} title={project.title} />
              ) : (
                <>
                  <span className="project-ph" aria-hidden="true">
                    {number}
                  </span>
                  <ProjectSlider images={images} title={project.title} sizes="(max-width:820px) 100vw, 560px" />
                </>
              )}
            </div>
            <div className="cs-panel">
              <div className="cs-top">
                <p className="cs-cat">{study.category}</p>
                {badge && (
                  <span className="cs-badge">
                    <i /> {badge}
                  </span>
                )}
              </div>
              <h3 id={titleId} className="cs-title">
                {project.title}
              </h3>
              {study.tagline && <p className="cs-tag">{study.tagline}</p>}
              <p className="cs-desc">{project.description}</p>
              {study.sections.map((s) => (
                <section key={s.title} className="cs-sec">
                  <h4>{s.title}</h4>
                  {s.body && <p>{s.body}</p>}
                  {s.list && (
                    <ul className="cs-list">
                      {s.list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
              {project.tech.length > 0 && (
                <ul className="chips" aria-label="Technologies">
                  {project.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              <div className="cs-actions">
                {project.repo && (
                  <a className={"btn " + (project.demo ? "ghost" : "primary")} href={project.repo} target="_blank" rel="noopener noreferrer">
                    View repository &#8599;
                  </a>
                )}
                {project.demo && (
                  <a className="btn primary" href={project.demo} target="_blank" rel="noopener noreferrer">
                    Live demo &#8599;
                  </a>
                )}
              </div>
            </div>
            <button type="button" className="cs-close" aria-label="Close case study" onClick={close}>
              &times;
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
