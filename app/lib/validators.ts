import {z} from 'zod'

export const projectSchema = z.object({
    name:
    z.string()
    .min(1,'Project name is required')
    .max(100,'Projet name is must be 100 character or less'),

    key:z.string()
    .min(2,'Project Key must be at least 2 character')
    .max(10,'Project key must be 10 charcter or less'),
    description: z.string()
    .max(500,'Description must be 500 character or less')
    .optional(),        
})                          