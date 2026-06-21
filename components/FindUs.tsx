import { MapPin, Clock, Phone, Mail } from "lucide-react";

export function FindUs() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Location Card */}
      <div className="flex gap-5 border border-espresso/15 bg-white p-8 shadow-sm transition hover:border-brass">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-crema text-roast border border-espresso/5">
          <MapPin size={28} />
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase tracking-tight text-espresso">Factory Address</h4>
          <p className="mt-3 text-base text-espresso/80 leading-relaxed">
            Mugamba Coffee Factory<br />
            Kigali, Rwanda<br />
            KK 123 Street, Gikondo
          </p>
        </div>
      </div>

      {/* Opening Hours Card */}
      <div className="flex gap-5 border border-espresso/15 bg-white p-8 shadow-sm transition hover:border-brass">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-crema text-roast border border-espresso/5">
          <Clock size={28} />
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase tracking-tight text-espresso">Opening Hours</h4>
          <p className="mt-3 text-base text-espresso/80 leading-relaxed">
            Monday - Saturday<br />
            8:00 AM - 6:00 PM<br />
            <span className="text-roast font-bold">Sunday: Closed</span>
          </p>
        </div>
      </div>

      {/* Phone Card */}
      <div className="flex gap-5 border border-espresso/15 bg-white p-8 shadow-sm transition hover:border-brass">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-crema text-roast border border-espresso/5">
          <Phone size={28} />
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase tracking-tight text-espresso">Call Us</h4>
          <p className="mt-3 text-base text-espresso/80 leading-relaxed font-bold">
            <a href="tel:+250787793722" className="block hover:text-roast transition">+250 787 793 722</a>
          </p>
        </div>
      </div>

      {/* Email Card */}
      <div className="flex gap-5 border border-espresso/15 bg-white p-8 shadow-sm transition hover:border-brass">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-crema text-roast border border-espresso/5">
          <Mail size={28} />
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase tracking-tight text-espresso">Email Us</h4>
          <p className="mt-3 text-base text-espresso/80 leading-relaxed">
            <a href="mailto:mugambaco@gmail.com" className="block font-bold hover:text-roast transition">mugambaco@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}