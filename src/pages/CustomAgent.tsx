
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Agent name must be at least 2 characters.",
  }).max(50),
  purpose: z.string().min(20, {
    message: "Please provide a more detailed purpose (at least 20 characters).",
  }),
  primaryFunction: z.string({
    required_error: "Please select a primary function.",
  }),
  knowledge: z.array(z.string()).min(1, {
    message: "Please select at least one knowledge area.",
  }),
  communicationStyle: z.string({
    required_error: "Please select a communication style.",
  }),
  creativityLevel: z.number().min(0).max(100),
  detailLevel: z.number().min(0).max(100),
});

const CustomAgent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      purpose: "",
      primaryFunction: "",
      knowledge: [],
      communicationStyle: "",
      creativityLevel: 50,
      detailLevel: 50,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would connect to an API to create the agent
    console.log(values);
    toast.success("Custom agent created successfully!", {
      description: `${values.name} is ready to assist you.`,
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Custom Agent</h1>
        <p className="text-muted-foreground">
          Design an AI agent specifically tailored to your unique needs
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Configuration</CardTitle>
          <CardDescription>
            Define how your AI agent will think, respond, and assist you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Research Assistant" {...field} />
                    </FormControl>
                    <FormDescription>
                      Give your agent a name that reflects its purpose
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose & Goals</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe what you want this agent to help you accomplish..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Clearly define what problems this agent should solve for you
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="primaryFunction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Function</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a function" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="teacher">Teaching & Education</SelectItem>
                          <SelectItem value="coach">Coaching & Motivation</SelectItem>
                          <SelectItem value="analyst">Analysis & Research</SelectItem>
                          <SelectItem value="creative">Creative & Generative</SelectItem>
                          <SelectItem value="planner">Planning & Organization</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The main way this agent will assist you
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="communicationStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Communication Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="formal">Formal & Professional</SelectItem>
                          <SelectItem value="casual">Casual & Conversational</SelectItem>
                          <SelectItem value="direct">Direct & Concise</SelectItem>
                          <SelectItem value="supportive">Supportive & Encouraging</SelectItem>
                          <SelectItem value="socratic">Socratic & Questioning</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How your agent should communicate with you
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="creativityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Creativity Level: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      How creative vs. factual should this agent be?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="detailLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail Level: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      How detailed vs. concise should responses be?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Create Custom Agent</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-secondary/50 flex justify-center py-3">
          <p className="text-sm text-muted-foreground">
            You can further customize your agent after creation
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomAgent;
