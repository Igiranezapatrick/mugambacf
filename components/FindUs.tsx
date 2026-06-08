import { MapPin, Clock, Phone, Map } from "lucide-react";

export function FindUs() {
  // Encoded URL generated from the Google Maps location
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.774261763172!2d30.0573934!3d-1.9515904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca42afaa78f59%3A0x8bdcb9c37198d99f!2sMugamba%20Coffee%20Factory!5e0!3m2!1sen!2srw!4v1710000000000!5m2!1sen!2srw";

  return (
    <div className="grid gap-6">
      {/* Quick Location Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div className="flex gap-4 rounded-xl border border-espresso/5 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-crema text-roast">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-espresso">Factory Address</h4>
            <p className="mt-1 text-sm text-espresso/70 leading-relaxed">
              Mugamba Coffee Factory<br />
              Kigali, Rwanda
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-xl border border-espresso/5 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-crema text-roast">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-espresso">Opening Hours</h4>
            <p className="mt-1 text-sm text-espresso/70 leading-relaxed">
              Mon - Sat: 8:00 AM - 6:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      {/* Styled Interactive Map Container */}
      <div className="group relative h-[350px] w-full overflow-hidden rounded-2xl border border-espresso/10 bg-espresso/5 shadow-inner transition duration-300 hover:border-brass/30">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale transition duration-500 ease-in-out group-hover:grayscale-0"
          title="Mugamba Coffee Factory Location Map"
        />
        
        {/* Call to Action Badge on the Map */}
        <a 
          href="https://maps.app.goo.gl/ZRfySCjMZjzZ6nkR9"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl bg-espresso px-4 py-2.5 text-xs font-semibold text-crema shadow-lg transition hover:bg-brass hover:text-espresso"
        >
          <Map size={14} />
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}