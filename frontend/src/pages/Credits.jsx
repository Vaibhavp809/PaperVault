import { ExternalLink, Mail, Phone, Sparkles } from "lucide-react";
import { useState } from "react";
import { institution } from "../constants/institution.js";

const Credits = () => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const { librarian } = institution;
  const photoUrl = librarian.photoUrls[photoIndex];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">Credits</p>
        <h1 className="mt-3 text-4xl font-extrabold text-slate-950 dark:text-white">Built for the MMEC Library.</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          PaperVault is shaped around the work of the library team at {institution.name}, helping students reach verified question papers with less friction.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="glass overflow-hidden rounded-lg">
          <div className="aspect-[4/5] bg-gradient-to-br from-teal-100 via-white to-indigo-100 dark:from-teal-950 dark:via-slate-900 dark:to-indigo-950">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={librarian.name}
                className="h-full w-full object-cover"
                onError={() => setPhotoIndex((index) => index + 1)}
              />
            ) : (
              <div className="grid h-full place-items-center">
                <div className="grid h-32 w-32 place-items-center rounded-full bg-teal-600 text-4xl font-extrabold text-white shadow-glow">
                  JG
                </div>
              </div>
            )}
          </div>
          <div className="p-6">
            <p className="text-xl font-extrabold text-slate-950 dark:text-white">{librarian.name}</p>
            <p className="mt-1 font-semibold text-teal-700 dark:text-teal-300">{librarian.role}</p>
          </div>
        </article>

        <div className="glass rounded-lg p-6 sm:p-8">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-teal-600 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="mt-6 text-2xl font-extrabold text-slate-950 dark:text-white">Acknowledgement</h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
            Credits to {librarian.displayName}, Librarian at {institution.name}, for guiding the library resources that make this portal useful for students.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a className="btn-secondary justify-start" href={`mailto:${librarian.email}`}>
              <Mail className="h-4 w-4" />
              {librarian.email}
            </a>
            <a className="btn-secondary justify-start" href={`tel:+91${librarian.phone}`}>
              <Phone className="h-4 w-4" />
              +91 {librarian.phone}
            </a>
          </div>

          <a className="btn-primary mt-5" href={institution.website} target="_blank" rel="noreferrer">
            Official Library Page
            <ExternalLink className="h-4 w-4" />
          </a>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {Object.entries(institution.highlights).map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                <dt className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</dt>
                <dd className="mt-2 text-lg font-bold text-slate-950 dark:text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Credits;
