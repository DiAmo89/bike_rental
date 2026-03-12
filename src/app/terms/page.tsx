export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 space-y-10">
      <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
        <p className="text-lg leading-8 text-gray-700">
          Welcome to BlablaBike. By using our platform, you agree to comply with
          and be bound by the following terms and conditions. Please read them
          carefully before using our services.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">
          Use of the Platform
        </h2>
        <p className="text-lg leading-8 text-gray-700">
          BlablaBike provides a platform for users to browse and rent bikes.
          Users agree to use the platform responsibly and in accordance with all
          applicable laws and regulations.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">
          User Accounts
        </h2>
        <p className="text-lg leading-8 text-gray-700">
          When creating an account on BlablaBike, you are responsible for
          maintaining the confidentiality of your login information and for all
          activities that occur under your account.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">
          Booking and Payments
        </h2>
        <p className="text-lg leading-8 text-gray-700">
          Users may book bikes through the platform. Payment terms, pricing, and
          availability are subject to change and may vary depending on the bike
          provider or location.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">
          Limitation of Liability
        </h2>
        <p className="text-lg leading-8 text-gray-700">
          BlablaBike is not responsible for damages or losses resulting from the
          misuse of the platform or issues related to third-party services used
          within the application.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">
          Changes to the Terms
        </h2>
        <p className="text-lg leading-8 text-gray-700">
          We may update these Terms of Service from time to time. Continued use
          of the platform after changes are made constitutes acceptance of the
          updated terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">Contact</h2>
        <p className="text-lg leading-8 text-gray-700">
          If you have any questions regarding these Terms of Service, please
          contact us at <span className="font-medium">info@blablabike.com</span>.
        </p>
      </section>
    </div>
  );
}
