
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface AgentCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  tags?: string[];
  className?: string;
  variant?: 'default' | 'featured';
}

const AgentCard = ({
  name,
  description,
  icon,
  tags = [],
  className,
  variant = 'default'
}: AgentCardProps) => {
  const isFeatured = variant === 'featured';
  const navigate = useNavigate();
  
  const handleStartConversation = () => {
    // Navigate to the chat page with the agent information
    navigate('/chat', { 
      state: { 
        agent: { name, description, icon, tags } 
      } 
    });
  };
  
  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-lg overflow-hidden',
      isFeatured ? 'border-primary/50' : '',
      className
    )}>
      <div className="relative">
        {isFeatured && (
          <div className="absolute top-0 right-0">
            <Badge className="m-3 bg-primary text-primary-foreground">Featured</Badge>
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-md",
              isFeatured ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
            )}>
              {icon}
            </div>
            <CardTitle>{name}</CardTitle>
          </div>
          <CardDescription className="pt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            variant={isFeatured ? "default" : "outline"} 
            size="sm"
            onClick={handleStartConversation}
          >
            Start Conversation
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AgentCard;
