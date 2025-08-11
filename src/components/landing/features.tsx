import { ShieldCheck, Lock, MapPin } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Hosts",
    description: "Every host is vetted for quality and reliability.",
  },
  {
    icon: Lock,
    title: "Secure Booking",
    description: "Your payment information is safe with SSL encryption.",
  },
  {
    icon: MapPin,
    title: "Beautiful Locations",
    description: "Stay in stunning destinations around the globe.",
  },
];

export function Features() {
  return (
    <section className="bg-orange-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why StayWise?
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center flex flex-col items-center"
            >
              <feature.icon
                className="h-12 w-12 text-orange-500 mb-4"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
