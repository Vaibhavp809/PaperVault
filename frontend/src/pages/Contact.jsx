import { ExternalLink, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { institution } from "../constants/institution.js";

const Contact = () => (
  <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">Contact</p>
      <h1 className="mt-3 text-4xl font-extrabold text-slate-950 dark:text-white">{institution.libraryName}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{institution.name}</p>
    </div>

    <div className="grid gap-5 md:grid-cols-2">
      {[
        { icon: UserRound, title: "Librarian", value: institution.librarian.displayName },
        { icon: Mail, title: "Email", value: institution.librarian.email, href: `mailto:${institution.librarian.email}` },
        { icon: Phone, title: "Phone", value: `+91 ${institution.librarian.phone}`, href: `tel:+91${institution.librarian.phone}` },
        { icon: MapPin, title: "Library", value: institution.name }
      ].map(({ icon: Icon, title, value, href }) => (
        <div key={title} className="glass rounded-lg p-6">
          <Icon className="h-6 w-6 text-teal-600 dark:text-teal-300" />
          <h2 className="mt-5 text-lg font-bold">{title}</h2>
          {href ? (
            <a className="mt-1 inline-block font-medium text-slate-600 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300" href={href}>
              {value}
            </a>
          ) : (
            <p className="mt-1 text-slate-600 dark:text-slate-300">{value}</p>
          )}
        </div>
      ))}
    </div>

    <a className="btn-primary mt-6" href={institution.website} target="_blank" rel="noreferrer">
      Official Library Page
      <ExternalLink className="h-4 w-4" />
    </a>
  </section>
);

export default Contact;
