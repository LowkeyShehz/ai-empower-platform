
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleUser, Code, Cpu, Lock, Shield, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">About AI Empower</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Empowering people through accessible, personalized artificial intelligence
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At AI Empower, we're on a mission to make advanced artificial intelligence accessible and 
            useful for everyone. We believe AI should be a personal tool that adapts to your needs, 
            helping you solve problems and achieve your goals.
          </p>
          <p className="text-muted-foreground">
            We're building a future where AI assistance is as personal and unique as the individuals 
            who use it—technology that understands your specific needs and helps you excel in your 
            personal and professional life.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-muted-foreground mb-4">
            We envision a world where everyone has their own personal AI assistant, tailored to their 
            specific needs, knowledge requirements, and communication preferences.
          </p>
          <p className="text-muted-foreground">
            By creating specialized AI agents for different domains and allowing users to customize their 
            own, we're working toward a future where AI enhances human potential rather than replacing it, 
            making specialized knowledge and assistance available to all.
          </p>
        </Card>
      </section>

      {/* Our Technology */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Technology</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Advanced Large Language Models</h3>
            <p className="text-muted-foreground">
              Our platform is built on state-of-the-art language models, fine-tuned for specific domains 
              to provide expert-level assistance.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CircleUser className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Personalization Engine</h3>
            <p className="text-muted-foreground">
              Our adaptive systems learn from your interactions and preferences to provide increasingly 
              personalized experiences over time.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Modular Architecture</h3>
            <p className="text-muted-foreground">
              Our flexible system allows for the creation of specialized agents with deep expertise 
              in specific domains and tasks.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-accent/10 p-8 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start space-x-4">
            <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                We design all our systems with privacy as a fundamental principle, ensuring your data 
                is always protected.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Lock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-2">Security</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security measures protect your information and conversations at all times.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-2">Empowerment</h3>
              <p className="text-sm text-muted-foreground">
                We build tools that empower people to achieve more, learn faster, and solve problems more effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team section could go here in future versions */}

      {/* Call to action */}
      <section className="text-center bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Experience the future of personalized AI assistance today. 
          Explore our specialized agents or create your own custom assistant.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg">Explore Agents</Button>
          <Button size="lg" variant="outline">Create Custom Agent</Button>
        </div>
      </section>
    </div>
  );
};

export default About;
