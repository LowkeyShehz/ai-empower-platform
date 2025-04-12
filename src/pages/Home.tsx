
import { Button } from "@/components/ui/button";
import { Calendar, Brain, Dumbbell, PenTool, Clock } from "lucide-react";
import AgentCard from "@/components/AgentCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  const featuredAgents = [
    {
      name: "Study Planner",
      description: "Create personalized study schedules and learning plans",
      icon: <Calendar className="h-5 w-5" />,
      tags: ["Education", "Planning", "Productivity"]
    },
    {
      name: "Fitness Coach",
      description: "Personalized workout routines and nutrition advice",
      icon: <Dumbbell className="h-5 w-5" />,
      tags: ["Fitness", "Health", "Coaching"]
    },
    {
      name: "Script Writer",
      description: "Generate creative scripts for videos and presentations",
      icon: <PenTool className="h-5 w-5" />,
      tags: ["Creativity", "Writing", "Content"]
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero section */}
      <section className="text-center px-4 py-6 md:py-12 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Your Personal AI Assistants
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Discover AI agents tailored to solve your specific problems. From study planning to fitness coaching, we've got you covered.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/agents')}>
            Explore Agents
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/custom-agent')}>
            Create Custom Agent
          </Button>
        </div>
      </section>

      {/* Key features */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose Our AI Agents?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Personalized Experience</h3>
            <p className="text-muted-foreground">
              Each AI agent learns from your interactions to provide truly personalized assistance.
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Save Time</h3>
            <p className="text-muted-foreground">
              Get immediate answers and solutions without endless searching or trial and error.
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <PenTool className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Expert Knowledge</h3>
            <p className="text-muted-foreground">
              Access specialized knowledge across various domains from our purpose-built AI agents.
            </p>
          </div>
        </div>
      </section>

      {/* Featured agents */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Featured Agents</h2>
          <Button variant="ghost" onClick={() => navigate('/agents')}>
            View All
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredAgents.map((agent) => (
            <AgentCard
              key={agent.name}
              name={agent.name}
              description={agent.description}
              icon={agent.icon}
              tags={agent.tags}
              variant="featured"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
