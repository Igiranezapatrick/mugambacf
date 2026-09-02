import { MapPin, Clock, Phone, Mail } from "lucide-react";

export function FindUs() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Location Card */}
      <div className="flex gap-4 border border-espresso/15 bg-white p-5 shadow-sm transition hover:border-brass">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-crema text-roast border border-espresso/5">
          <MapPin size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-espresso">Factory Address</h4>
          <p className="mt-1.5 text-xs sm:text-sm text-espresso/80 leading-relaxed">
            Mugamba Coffee Factory<br />
            Kigali, Rwanda<br />
            KK 123 Street, Gikondo
          </p>
        </div>
      </div>

      {/* Opening Hours Card */}
      <div className="flex gap-4 border border-espresso/15 bg-white p-5 shadow-sm transition hover:border-brass">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-crema text-roast border border-espresso/5">
          <Clock size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-espresso">Opening Hours</h4>
          <p className="mt-1.5 text-xs sm:text-sm text-espresso/80 leading-relaxed">
            Monday - Saturday<br />
            8:00 AM - 6:00 PM<br />
            <span className="text-roast font-bold">Sunday: Closed</span>
          </p>
        </div>
      </div>

      {/* Phone Card */}
      <div className="flex gap-4 border border-espresso/15 bg-white p-5 shadow-sm transition hover:border-brass">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-crema text-roast border border-espresso/5">
          <Phone size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-espresso">Call Us</h4>
          <p className="mt-1.5 text-xs sm:text-sm text-espresso/80 leading-relaxed font-bold">
            <a href="tel:+250787793722" className="block hover:text-roast transition">+250 787 793 722</a>
          </p>
        </div>
      </div>

      {/* Email Card */}
      <div className="flex gap-4 border border-espresso/15 bg-white p-5 shadow-sm transition hover:border-brass">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-crema text-roast border border-espresso/5">
          <Mail size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-espresso">Email Us</h4>
          <p className="mt-1.5 text-xs sm:text-sm text-espresso/80 leading-relaxed">
            <a href="mailto:mugambacoffe@gmail.com" className="block font-bold hover:text-roast transition">mugambacoffe@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}