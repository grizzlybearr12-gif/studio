'use server';
/**
 * @fileOverview An AI flow to generate a sample menu based on specialties.
 *
 * - generateMenu - A function that handles the menu generation process.
 * - GenerateMenuInput - The input type for the generateMenu function.
 * - GenerateMenuOutput - The return type for the generateMenu function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMenuInputSchema = z.object({
  specialties: z.array(z.string()).describe('A list of culinary specialties.'),
});
export type GenerateMenuInput = z.infer<typeof GenerateMenuInputSchema>;

const MenuItemSchema = z.object({
  name: z.string().describe('The name of the dish.'),
  description: z.string().describe('A brief description of the dish.'),
});

const MenuSectionSchema = z.object({
  specialty: z.string().describe('The specialty category for this menu section.'),
  items: z.array(MenuItemSchema).describe('A list of menu items for this specialty.'),
});

const GenerateMenuOutputSchema = z.object({
  menu: z.array(MenuSectionSchema).describe('The generated menu, organized by specialty.'),
});
export type GenerateMenuOutput = z.infer<typeof GenerateMenuOutputSchema>;

export async function generateMenu(input: GenerateMenuInput): Promise<GenerateMenuOutput> {
  return generateMenuFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMenuPrompt',
  input: { schema: GenerateMenuInputSchema },
  output: { schema: GenerateMenuOutputSchema },
  prompt: `You are a creative chef. Given a list of specialties, generate a sample menu.
For each specialty, create a few delicious-sounding dishes with a short, appealing description.

Specialties:
{{#each specialties}}
- {{{this}}}
{{/each}}
`,
});

const generateMenuFlow = ai.defineFlow(
  {
    name: 'generateMenuFlow',
    inputSchema: GenerateMenuInputSchema,
    outputSchema: GenerateMenuOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
