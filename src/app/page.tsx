import Projects from '@/components/Projects';
import Head from 'next/head';
import {Timeline} from '@/components/Timeline'

import TypewriterText from '@/components/Typewriter';

export default function Home() {
  const SchoolEvents = [
    {
      id: 1,
      title: 'Event One',
      description: 'Something important happened here. Details about the first event.',
      date: '2025-01-15',
    },
    {
      id: 2,
      title: 'Event Two',
      description: 'Following the first event, this occurred. More details follow.',
      date: '2025-02-20',
    },
    {
      id: 3,
      title: 'A Third Milestone',
      description: 'Significant progress was made. Let us elaborate on this point.',
      date: '2025-03-10',
    }
  ];
  const WorkEvents = [
    {
      id: 4,
      title: 'Event One',
      description: 'Something important happened here. Details about the first event.',
      date: '2025-01-15',
    },
    {
      id: 5,
      title: 'Event Two',
      description: 'Following the first event, this occurred. More details follow.',
      date: '2025-02-20',
    },
    {
      id: 6,
      title: 'A Third Milestone',
      description: 'Significant progress was made. Let us elaborate on this point.',
      date: '2025-03-10',
    }
  ];
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>Quentin | Portfolio</title>
        <meta name="description" content="Quentin's personal portfolio" />
      </Head>

      <main className="">
        <section className="w-screen h-screen flex items-center justify-center space-y-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold">Hi, Im Quentin</h1>
            <TypewriterText texts={['Low-Level Engineer','Tech Manager','Problem Solver']}></TypewriterText>
          </div>
        </section>


        <section>
          <Projects></Projects>
        </section>
        <section>
          <Timeline schoolEvents={SchoolEvents} workEvents={WorkEvents} activationPoint={0.5} />
        </section>
        <section className="bg-gray-100 py-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p>I’m a low-level software engineer with strong experience in team and project management.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 py-10">Contact</h2>
          <p>
            Want to chat? <a href="mailto:quentin.rebergue@example.com" className="text-blue-600 underline">Send me an email</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
