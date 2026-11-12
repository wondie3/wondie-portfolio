import type { ReactNode } from "react";
import DotField from "./DotField";
import Reveal from "./Reveal";
import SectionFx from "./SectionFx";

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intensity?: number;
  focus?: [number, number];
  children: ReactNode;
};

/** Shared section wrapper: dotted background + pixel heading + scroll transition. */
export default function Section({ id, index, eyebrow, title, intensity = 0.55, focus, children }: Props) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <DotField intensity={intensity} focus={focus} />
      <SectionFx className="section-inner">
        <Reveal>
          <p className="eyebrow">
            {index} / {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="h2">
            {title}
          </h2>
        </Reveal>
        {children}
      </SectionFx>
    </section>
  );
}
