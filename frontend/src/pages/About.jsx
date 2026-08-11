import { BookOpen, Clock, ExternalLink, LibraryBig, Users } from "lucide-react";
import { institution } from "../constants/institution.js";

const aboutStats = [
  { icon: Clock, label: "Working Hours", value: institution.highlights.workingHours },
  { icon: LibraryBig, label: "Collection", value: institution.highlights.collection },
  { icon: Users, label: "Seating", value: institution.highlights.seating }
];

const About = () => (
  <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <div className="glass rounded-lg p-8 sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">About</p>
      <h1 className="mt-3 text-4xl font-extrabold text-slate-950 dark:text-white">A modern paper portal for {institution.shortName} students.</h1>
      <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
        PaperVault supports {institution.libraryName} at {institution.name} by keeping previous year question papers searchable, organized, and open to students without requiring student accounts.
      </p>
      <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
        The official library was established in {institution.highlights.established} and serves students, faculty, staff, and researchers with print, digital, and reference resources.
      </p>
      <a className="btn-primary mt-6" href={institution.website} target="_blank" rel="noreferrer">
        <BookOpen className="h-4 w-4" />
        Visit MMEC Library
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>

    <div className="mt-6 grid gap-5 md:grid-cols-3">
      {aboutStats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="glass rounded-lg p-6">
          <Icon className="h-6 w-6 text-teal-600 dark:text-teal-300" />
          <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-xl font-extrabold text-slate-950 dark:text-white">{value}</p>
        </div>
      ))}
    </div>
  </section>
);

export default About;
