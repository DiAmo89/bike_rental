export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 space-y-10">
      <h1 className="text-4xl font-bold text-gray-900">
        Frequently Asked Questions
      </h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          How do I rent a bike?
        </h2>
        <p className="text-lg leading-8 text-gray-700">
          To rent a bike, simply browse the catalog, choose a bike that suits
          your needs, and follow the booking process. Once the booking is
          confirmed, you can pick up the bike at the selected location.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Do I need an account to rent a bike?
        </h2>
        <p className="text-lg leading-8 text-gray-700">
          Yes, you need to create an account before renting a bike. This allows
          us to manage bookings, provide support, and ensure a secure rental
          experience.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          How can I cancel my booking?
        </h2>
        <p className="text-lg leading-8 text-gray-700">
          You can cancel your booking from your profile page. Navigate to your
          bookings section and choose the reservation you would like to cancel.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          What happens if a bike is damaged?
        </h2>
        <p className="text-lg leading-8 text-gray-700">
          If a bike is damaged during the rental period, please contact our
          support team immediately. Depending on the situation, additional fees
          may apply.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          How can I contact support?
        </h2>
        <p className="text-lg leading-8 text-gray-700">
          If you need assistance, you can contact our support team via email at
          <span className="font-medium"> info@blablabike.com</span>.
        </p>
      </section>
    </div>
  );
}
