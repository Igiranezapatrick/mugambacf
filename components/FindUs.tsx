import { MapPin, Clock, Phone, Mail } from "lucide-react";

export function FindUs() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Location Card */}
      <div className="flex gap-4 rounded-xl border border-espresso/10 bg-white p-6 shadow-sm transition hover:border-brass/30">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-crema text-roast">
          <MapPin size={24} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-espresso">Factory Address</h4>
          <p className="mt-2 text-base text-espresso/80 leading-relaxed">
            Mugamba Coffee Factory<br />
            Kigali, Rwanda<br />
            KK 123 Street, Gikondo
          </p>
        </div>
      </div>

      {/* Opening Hours Card */}
      <div className="flex gap-4 rounded-xl border border-espresso/10 bg-white p-6 shadow-sm transition hover:border-brass/30">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-crema text-roast">
          <Clock size={24} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-espresso">Opening Hours</h4>
          <p className="mt-2 text-base text-espresso/80 leading-relaxed">
            Monday - Saturday<br />
            8:00 AM - 6:00 PM<br />
            <span className="text-roast font-medium">Sunday: Closed</span>
          </p>
        </div>
      </div>

      {/* Phone Card */}
      <div className="flex gap-4 rounded-xl border border-espresso/10 bg-white p-6 shadow-sm transition hover:border-brass/30">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-crema text-roast">
          <Phone size={24} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-espresso">Call Us</h4>
          <p className="mt-2 text-base text-espresso/80 leading-relaxed">
            <a href="tel:+250788123456" className="hover:text-roast transition">+250 788 123 456</a><br />
            <a href="tel:+250788654321" className="hover:text-roast transition">+250 788 654 321</a>
          </p>
        </div>
      </div>

      {/* Email Card */}
      <div className="flex gap-4 rounded-xl border border-espresso/10 bg-white p-6 shadow-sm transition hover:border-brass/30">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-crema text-roast">
          <Mail size={24} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-espresso">Email Us</h4>
          <p className="mt-2 text-base text-espresso/80 leading-relaxed">
            <a href="mailto:info@mugamba.rw" className="block hover:text-roast transition">info@mugamba.rw</a>
            <a href="mailto:sales@mugamba.rw" className="block hover:text-roast transition">sales@mugamba.rw</a>
          </p>
        </div>
      </div>
    </div>
  );
}