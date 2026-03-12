export default function AboutUsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 space-y-12">
      <h1 className="text-4xl font-bold text-gray-900">About BlablaBike</h1>

      <section className="space-y-4">
        <p className="text-lg leading-8 text-gray-700">
          BlablaBike is a modern bike rental platform designed to make urban
          mobility simple, affordable, and eco-friendly. Our mission is to help
          people move around the city in a sustainable way while enjoying the
          freedom of cycling.
        </p>

        <p className="text-lg leading-8 text-gray-700">
          Whether you need a bike for a quick ride across town, a weekend trip,
          or exploring a new city, BlablaBike provides a convenient and
          user-friendly solution for finding and booking the perfect bike.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>

        <p className="text-lg leading-8 text-gray-700">
          Our mission is to promote sustainable transportation and make cycling
          accessible to everyone. By providing an easy-to-use platform for bike
          rentals, we aim to reduce traffic congestion, lower carbon emissions,
          and encourage healthier lifestyles.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Why Choose BlablaBike?
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
          <li>Simple and intuitive bike booking system</li>
          <li>Wide selection of bikes for different needs</li>
          <li>Affordable rental options</li>
          <li>Environmentally friendly transportation</li>
          <li>Reliable and secure platform</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Our Vision
        </h2>

        <p className="text-lg leading-8 text-gray-700">
          We believe that cities of the future will prioritize sustainable
          transportation. BlablaBike aims to be part of that future by providing
          an accessible platform that connects people with convenient bike
          rental options.
        </p>
      </section>
    </div>
  );
}
