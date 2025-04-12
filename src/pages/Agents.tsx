
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Calendar, Brain, Dumbbell, PenTool, Clock, BookOpen, MessageSquare, Briefcase, Heart, Rocket, Globe, Coffee } from "lucide-react";
import AgentCard, { AgentCardProps } from "@/components/AgentCard";
import { Badge } from "@/components/ui/badge";

const Agents = () => {
  // Agents data
  const allAgents: Omit<AgentCardProps, 'variant'>[] = [
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
    {
      name: "Productivity Assistant",
      description: "Help you manage time, tasks and increase productivity",
      icon: <Clock className="h-5 w-5" />,
      tags: ["Productivity", "Planning", "Management"]
    },
    {
      name: "Study Tutor",
      description: "One-on-one tutoring for various subjects and topics",
      icon: <BookOpen className="h-5 w-5" />,
      tags: ["Education", "Learning", "Tutoring"]
    },
    {
      name: "Language Coach",
      description: "Practice conversations and improve language skills",
      icon: <MessageSquare className="h-5 w-5" />,
      tags: ["Language", "Learning", "Communication"]
    },
    {
      name: "Career Advisor",
      description: "Get guidance on career paths, resumes, and interviews",
      icon: <Briefcase className="h-5 w-5" />,
      tags: ["Career", "Professional", "Advice"]
    },
    {
      name: "Mental Wellness",
      description: "Support for mindfulness, meditation and mental health",
      icon: <Heart className="h-5 w-5" />,
      tags: ["Wellness", "Mental Health", "Mindfulness"]
    },
    {
      name: "Innovation Spark",
      description: "Generate creative ideas and innovative solutions",
      icon: <Rocket className="h-5 w-5" />,
      tags: ["Creativity", "Innovation", "Brainstorming"]
    },
    {
      name: "Travel Planner",
      description: "Plan trips, itineraries and travel recommendations",
      icon: <Globe className="h-5 w-5" />,
      tags: ["Travel", "Planning", "Recommendations"]
    },
    {
      name: "Recipe Master",
      description: "Generate recipes based on ingredients and preferences",
      icon: <Coffee className="h-5 w-5" />,
      tags: ["Cooking", "Food", "Recipes"]
    },
    {
      name: "Learning Path",
      description: "Create personalized learning journeys for any skill",
      icon: <Brain className="h-5 w-5" />,
      tags: ["Education", "Skills", "Learning"]
    },
  ];

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags
  const allTags = Array.from(new Set(allAgents.flatMap(agent => agent.tags || [])));

  // Filter agents based on search term and selected tags
  const filteredAgents = allAgents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => agent.tags?.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Agents</h1>
        <p className="text-muted-foreground">Discover and use specialized AI agents for various tasks</p>
      </div>

      {/* Search and filters */}
      <div className="space-y-4">
        <Input
          placeholder="Search for an agent..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Badge 
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Agent cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.name}
            name={agent.name}
            description={agent.description}
            icon={agent.icon}
            tags={agent.tags}
          />
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No agents found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Agents;
