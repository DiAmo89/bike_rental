const developers = [
  { name: "Dumitru Gangan", role: "Fullstack Developer" },
  { name: "Vladyslav Kravchenko", role: "Fullstack Developer" },
  { name: "Dmitrii Evdokimov", role: "Fullstack Developer" },
  { name: "Kateryna Matvieieva", role: "Fullstack Developer" },
  { name: "Stepan Serbin", role: "Fullstack Developer" },
];

const qaTeam = [
  { name: "Dariia Boiko", role: "QA Engineer" },
  { name: "Daryna Suk", role: "QA Engineer" },
  { name: "Vladimir Dinu", role: "QA Engineer" },
  { name: "Hanna Kozlianska", role: "QA Engineer" },
];

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold">Meet the Team Behind BlablaBike</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We are a team of developers and QA engineers who built the BlablaBike
          platform. Our goal was to create a simple and user-friendly bike
          rental application.
        </p>
      </div>

      {/* Developers row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {developers.map((person, index) => (
          <div key={index} className="text-center transition transform hover:scale-105 hover:shadow-lg duration-300">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${person.name}`}
              className="w-40 h-40 mx-auto rounded-full bg-gray-100 p-4"
              alt={person.name}
            />
            <h3 className="mt-4 font-semibold">{person.name}</h3>
            <p className="text-gray-500 text-sm">{person.role}</p>
          </div>
        ))}
      </div>

      {/* QA row */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 lg:mx-32">
        {qaTeam.map((person, index) => (
          <div key={index} className="text-center transition transform hover:scale-105 hover:shadow-lg duration-300">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${person.name}`}
              className="w-40 h-40 mx-auto rounded-full bg-gray-100 p-4"
              alt={person.name}
            />
            <h3 className="mt-4 font-semibold">{person.name}</h3>
            <p className="text-gray-500 text-sm">{person.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
