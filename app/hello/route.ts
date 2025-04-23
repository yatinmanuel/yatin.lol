export async function GET() {
  const paragraphs = [
    "I'm one of the co-founders of Halvex, a startup that aims to provide revolutionary digital solutions to make a positive impact on the world.",
    "I'm working on a project called Canary, an innovative automotive solution developed with a few close collaborators. We can't reveal all the details yet, but I'm excited to show you what we're building soon!",
    "In my free time I like to learn and self-teach myself new things, listen to a lot of music (R&B, rap, pop, rock), experiment and test with new things, and maybe, just once in a while, edit what you're looking at right now."
  ];

  const text = paragraphs.join("\n\n");

  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
} 