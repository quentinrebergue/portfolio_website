import Head from 'next/head';
import TypewriterText from '../components/Typewriter';

export default function Home() {
  return (
    <div className="min-h-screen px-8 py-10 bg-white text-gray-900">
      <Head>
        <title>Quentin | Portfolio</title>
        <meta name="description" content="Quentin's personal portfolio" />
      </Head>

      <main className="max-w-3xl mx-auto space-y-20">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Hi, I'm Quentin</h1>
          <TypewriterText />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p>I’m a low-level software engineer with strong experience in team and project management.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <ul className="space-y-4">
            <li className="p-4 border rounded shadow">
              <h3 className="font-semibold">Cool System Tool</h3>
              <p>Built with C++ and a passion for bits and bytes.</p>
            </li>
            <li className="p-4 border rounded shadow">
              <h3 className="font-semibold">Internal Management Dashboard</h3>
              <p>Led the team and built core logic in Python.</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p>
            Want to chat? <a href="mailto:quentin.rebergue@example.com" className="text-blue-600 underline">Send me an email</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
