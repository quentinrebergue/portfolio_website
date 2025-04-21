import Typewriter from 'typewriter-effect';

export default function TypewriterText() {
  return (
    <div className="text-xl font-semibold text-blue-600">
      <Typewriter
        options={{
          strings: [
            'Low-Level Engineer',
            'Tech Manager',
            'Problem Solver',
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
}