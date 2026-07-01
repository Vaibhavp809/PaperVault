import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => (
  <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid gap-5 md:grid-cols-3">
      {[
        { icon: Mail, title: "Email", value: "library@example.edu" },
        { icon: Phone, title: "Phone", value: "+91 00000 00000" },
        { icon: MapPin, title: "Library", value: "Central Library Desk" }
      ].map(({ icon: Icon, title, value }) => (
        <div key={title} className="glass rounded-lg p-6">
          <Icon className="h-6 w-6 text-teal-600 dark:text-teal-300" />
          <h2 className="mt-5 text-lg font-bold">{title}</h2>
          <p className="mt-1 text-slate-600 dark:text-slate-300">{value}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Contact;

